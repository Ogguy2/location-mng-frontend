import z from "zod";
import axios from "axios";
import { redirect } from "next/navigation";
import { createSession } from "../libs/session";
import {
  API_BASE_URL,
  UNAUTHENTICATED,
  UNAUTHORIRED_CODE,
} from "../constants/httpCode";
import { route } from "@/lib/route";
import { authStore } from "../store/auth.store";
// import { createSession } from "@/app/libs/session";
// import { UNAUTHORIRED_CODE, VALIDATION_CODE } from "@/libs/contants";
// import { emitServerErrorEvent } from "../libs/dd";
export const signUp = async (state, formData) => {
  // 1 - Validation du formulaire
  const SignupFormSchema = z.object({
    email: z.email().max(100),
    password: z
      .string()
      .min(8, {
        message: "Le mot de passe doit contenir au moins 8 caractères",
      })
      .max(100, {
        message: "Le mot de passe doit contenir au maximum 100 caractères",
      }),
  });

  const validatedFields = SignupFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return z.treeifyError(validatedFields.error);
  }
  // 2 - Preparationd des données
  const { email, password } = validatedFields.data;
  interface ApiResponse {
    data?: {
      access_token: string;
      fullName: string;
      email: string;
      id: string;
    };
    status: number;
    message?: string;
  }
  let data: ApiResponse | undefined;

  await axios
    .post(process.env.NEXT_PUBLIC_API_URL + "/auth/login", {
      email,
      password,
    })
    .then((response) => {
      console.log("response login:", response.data);
      data = {
        status: 200,
        data: response.data,
      };
      console.log("data login:", data);
    })
    .catch((error) => {
      // Aucune réponse du server
      if (!error.response) {
        data = {
          status: 504,
          message:
            "Aucune réponse du serveur, veuilez contacter l'administrateur",
        };
        return;
      }
      //  Acces incorrect ou Utilisateur non connu
      if (error.response.status == UNAUTHENTICATED) {
        data = {
          status: error.response.status,
          message: "Les identificant de connexion sont incorrects",
        };
        return;
      } else {
        console.log(error.response);
        data = {
          status: error.response.status,
          message:
            "Une erreur est survement veillez contacter l'administrateur",
        };
      }
      return;
    });
  // 4 - Redirectiond de l'utilisateur
  if (data?.status !== 200) {
    return data;
  } else {
    console.log("data to create session:", data);
    const user = {
      id: data.data?.id,
      email: data.data?.email,
      fullName: data.data?.fullName,
      access_token: data.data?.access_token,
    };
    await createSession(user);
    // authStore.setState({ user });
    redirect(route("locataire"));
  }
};
