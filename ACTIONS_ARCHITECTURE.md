# Architecture des Actions - Guide d'utilisation

## 🎯 Vue d'ensemble

La nouvelle architecture d'actions permet de gérer les boutons d'action dans `ContentPage.Header` de manière flexible et réutilisable. Chaque composant générique (`GenericEditPage`, `GenericCreatePage`, `GenericViewPage`) peut maintenant recevoir des actions personnalisées via des props.

## 🏗️ Structure

### Fichiers principaux

- `src/lib/actions.utils.ts` - Utilitaires et types pour les actions (sans React)
- `src/hooks/useEntityActions.ts` - Hook React pour gérer les actions avec icônes
- `src/components/pages/Generic*.tsx` - Composants génériques mis à jour

## 📝 Utilisation

### 1. Actions par défaut (Recommandé)

```tsx
// Utilise les actions standards (Save/Cancel, Edit/Delete/Back, etc.)
<GenericEditPage 
  entityName="locataire" 
  entityId={locataireId}
  useDefaultActions={true} // Par défaut
/>
```

**Actions par défaut :**
- **Create mode** : Enregistrer, Annuler
- **Edit mode** : Sauvegarder, Annuler  
- **View mode** : Modifier, Supprimer, Retour à la liste

### 2. Actions additionnelles

```tsx
<GenericEditPage 
  entityName="locataire" 
  entityId={locataireId}
  additionalActions={[
    {
      title: "Générer Contrat",
      icon: <FileText />,
      type: "custom",
      action: () => generateContract(locataireId)
    },
    {
      title: "Envoyer Email",
      icon: <Send />,
      type: "custom", 
      action: () => sendEmail(locataireId)
    }
  ]}
/>
```

### 3. Actions personnalisées complètes (Override)

```tsx
<GenericViewPage 
  entityName="locataire" 
  entityId={locataireId}
  customActions={[
    {
      title: "Action Spéciale 1",
      icon: <Star />,
      type: "custom",
      action: () => doSomething()
    },
    {
      title: "Action Spéciale 2", 
      icon: <Heart />,
      type: "url",
      href: "/special-page"
    }
  ]}
/>
```

### 4. Callback personnalisé (Avancé)

```tsx
<GenericCreatePage 
  entityName="locataire"
  actionReady={(defaultActions, form) => {
    // Modifier les actions par défaut
    const customizedActions = defaultActions.map(action => {
      if (action.title === "Enregistrer") {
        return {
          ...action,
          title: "Créer Locataire",
          icon: <UserPlus />
        };
      }
      return action;
    });

    // Ajouter des actions spécifiques
    customizedActions.push({
      title: "Configuration Avancée",
      icon: <Settings />,
      type: "custom",
      action: () => openAdvancedSettings()
    });

    return customizedActions;
  }}
/>
```

### 5. Désactiver les actions par défaut

```tsx
<GenericEditPage 
  entityName="locataire" 
  entityId={locataireId}
  useDefaultActions={false}
  additionalActions={[
    // Seulement ces actions seront affichées
    {
      title: "Mon Action",
      icon: <CustomIcon />,
      type: "custom",
      action: () => myCustomAction()
    }
  ]}
/>
```

## 🎨 Types d'actions disponibles

```typescript
interface Action {
  title: string;
  icon?: React.ReactNode;
  type: "saveAction" | "url" | "dialog" | "confirm" | "custom";
  href?: string; // pour type "url"
  action?: () => void | Promise<void>; // pour types "custom", "confirm", "saveAction"
  requiresConfirmation?: boolean;
  dialogContent?: React.ReactNode;
}
```

### Types expliqués :

- **`saveAction`** : Déclenche la soumission du formulaire
- **`url`** : Navigation vers une URL
- **`custom`** : Action personnalisée avec callback
- **`confirm`** : Action avec confirmation (ex: suppression)
- **`dialog`** : Action qui ouvre une modal

## 🚀 Exemples concrets

### Page d'édition avec actions spécialisées

```tsx
// src/app/(app)/locataire/[idlocataire]/custom/page.tsx
<GenericEditPage 
  entityName="locataire" 
  entityId={idlocataire}
  additionalActions={[
    {
      title: "Générer Contrat",
      icon: <FileText />,
      type: "custom",
      action: () => generateContract(idlocataire)
    },
    {
      title: "Historique Paiements",
      icon: <History />,
      type: "url",
      href: `/locataire/${idlocataire}/paiements`
    }
  ]}
/>
```

### Page de vue avec suppression personnalisée

```tsx
<GenericViewPage 
  entityName="logement" 
  entityId={logementId}
  onDelete={async () => {
    // Logique de suppression personnalisée
    const confirmed = await showCustomConfirmation();
    if (confirmed) {
      await deleteLogement(logementId);
      redirectToList();
    }
  }}
/>
```

### Page de création avec workflow spécial

```tsx
<GenericCreatePage 
  entityName="paiement"
  customActions={[
    {
      title: "Enregistrer et Continuer",
      icon: <ArrowRight />,
      type: "custom",
      action: async () => {
        await saveAndRedirectToNext();
      }
    },
    {
      title: "Enregistrer et Nouveau",
      icon: <Plus />,
      type: "custom", 
      action: async () => {
        await saveAndCreateNew();
      }
    },
    {
      title: "Annuler",
      icon: <X />,
      type: "url",
      href: "/paiements"
    }
  ]}
/>
```

## 💡 Bonnes pratiques

1. **Préférer les actions par défaut** quand c'est suffisant
2. **Utiliser `additionalActions`** pour ajouter des fonctionnalités spécifiques
3. **Réserver `customActions`** pour des cas très spéciaux nécessitant un contrôle total
4. **Utiliser `actionReady`** pour des modifications dynamiques complexes
5. **Garder les actions cohérentes** visuellement avec le design system

## 🔧 Extension

Pour ajouter de nouveaux types d'actions ou modifier les actions par défaut :

1. Modifier `src/lib/actions.utils.ts` pour les nouvelles configurations
2. Mettre à jour `src/hooks/useEntityActions.ts` pour la logique React
3. Étendre l'interface `ActionProps` si nécessaire

Cette architecture offre une flexibilité maximale tout en maintenant la simplicité d'utilisation pour les cas standards.