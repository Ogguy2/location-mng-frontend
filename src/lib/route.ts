import { useMemo } from "react";
// 1. Type utilitaire
type Join<K, P> = K extends string | number
  ? P extends string | number
    ? `${K}.${P}`
    : never
  : never;

type RouteKeys<T> = {
  [K in keyof T]: T[K] extends { children: infer C }
    ? K | Join<K, RouteKeys<C>>
    : K;
}[keyof T];

type AllRoutes = RouteKeys<typeof routeTree>;

type RouteParams = Record<string, string | number>;

type RouteEntry =
  | string
  | { prefix: string; children: Record<string, RouteEntry> };

// 2. Structure imbriquée des routes
const routeTree = {
  home: "/",
  logements: {
    prefix: "/logements",
    children: {
      children: {
        new: "/new",
        custom: "/:logementId/custom",
        view: "/:logementId/view",
      },
    },
  },
  // Locataire
  locataire: {
    prefix: "/locataire",
    children: {
      new: "/new",
      custom: "/:locataireId/custom",
      view: "/:locataireId/view",
    },
  },
  estimates: {
    prefix: "/estimates",
    children: {
      new: "/new",
      custom: "/:estimateuuid/custom",
      view: "/:estimateuuid/view",
    },
  },
  interventions: {
    prefix: "/interventions",
    children: {
      maintenances: {
        prefix: "/maintenances",
        children: {
          new: "/new",
          edit: "/:maintenanceuuid/edit",
          view: "/:maintenanceuuid/view",
        },
      },
      visites: {
        prefix: "/visites",
        children: {
          new: "/new",
          edit: "/:visiteuuid/edit",
          view: "/:visiteuuid/view",
        },
      },
      demands: {
        prefix: "/demands",
        children: {
          new: "/new",
          edit: "/:id/edit",
        },
      },
    },
  },
  equipements: {
    prefix: "/equipements",
    children: {
      new: "/new",
      edit: "/:equipmentuuid/custom",
      view: "/:equipmentuuid/view",
    },
  },
  usersmanage: {
    prefix: "/usersmanage",
    children: {
      users: {
        prefix: "/users",
        children: {
          new: "/new",
          edit: "/:useruuid/edit",
          view: "/:useruuid/view",
        },
      },
      roles: {
        prefix: "/roles",
        children: {
          new: "/new",
          edit: "/:id/edit",
          view: "/:id/view",
        },
      },
    },
  },
  // Equipes et techniciens
  teams: {
    prefix: "/teams",
    children: {
      teams: {
        prefix: "/teams",
        children: {
          new: "/new",
          edit: "/:id/edit",
          view: "/:id/view",
        },
      },
      techniciens: {
        prefix: "/teams",
        children: {
          new: "/new",
          edit: "/:id/edit",
          view: "/:id/view",
        },
      },
    },
  },
  // Intervenant, Prestataire
  intervenants: {
    prefix: "/teams",
    children: {
      prestataires: {
        prefix: "/teams",
        children: {
          new: "/new",
          edit: "/:id/edit",
          view: "/:id/view",
        },
      },
    },
  },
} as const;

// 3. Fonction pour aplatir les routes imbriquées
function flattenRoutes(
  tree: Record<string, RouteEntry>,
  accumulatedPath = "",
  accumulatedName = ""
): Record<string, string> {
  const flat: Record<string, string> = {};

  for (const [key, value] of Object.entries(tree)) {
    const currentName = accumulatedName ? `${accumulatedName}.${key}` : key;

    if (typeof value === "string") {
      // Cas simple : route directe
      flat[currentName] = accumulatedPath + value;
    } else if ("prefix" in value && "children" in value) {
      // On génère le chemin du groupe
      const newPrefix = accumulatedPath + value.prefix;

      // 🔥 Ici on ajoute une route pour le groupe lui-même
      flat[currentName] = newPrefix;

      // Ensuite, on aplatit ses enfants
      Object.assign(
        flat,
        flattenRoutes(value.children, newPrefix, currentName)
      );
    }
  }

  return flat;
}

// 4. Routes nommées générées automatiquement
const routes = flattenRoutes(routeTree);

// 5. Fonction `route()`
export function route(name: AllRoutes, params: RouteParams = {}): string {
  let path = routes[name];
  if (!path) throw new Error(`La route "${name}" n'existe pas.`);

  const usedKeys = [...path.matchAll(/:([a-zA-Z0-9_]+)/g)].map((m) => m[1]);

  for (const key of usedKeys) {
    if (!(key in params)) {
      throw new Error(
        `Le paramètre "${key}" est requis pour la route "${name}"`
      );
    }
    path = path.replace(`:${key}`, encodeURIComponent(String(params[key])));
  }

  const queryParams = Object.entries(params)
    .filter(([key]) => !usedKeys.includes(key))
    .map(
      ([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`
    )
    .join("&");

  return queryParams ? `${path}?${queryParams}` : path;
}

export function useRoute(
  name: keyof typeof routes,
  params: RouteParams = {}
): string {
  return useMemo(() => route(name, params), [name, JSON.stringify(params)]);
}
