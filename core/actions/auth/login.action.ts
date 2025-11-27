import { projectApi } from "@/core/api/project.api";
import { LoginRequest } from "@/infraestructure/interfaces/auth/login.request";
import { LoginResponse } from "@/infraestructure/interfaces/auth/login.response";
import { APIResponse } from "@/infraestructure/interfaces/common/api.reponse";
import { AxiosError } from "axios"; // Importa esto

export const loginAction = async (
  credentials: LoginRequest
): Promise<APIResponse<LoginResponse>> => {
  try {
    const { data } = await projectApi.post<APIResponse<LoginResponse>>(
      "/auth/login",
      credentials
    );
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      // ESTO ES LO IMPORTANTE: Imprime lo que dijo el backend
      console.log(JSON.stringify(error.response?.data, null, 2));
      
      // Si el backend devuelve un mensaje específico, úsalo:
      // @ts-ignore
      const serverMessage = error.response?.data?.message || error.response?.data?.title || "Error de validación";
      throw new Error(serverMessage);
    }
    
    console.error("Error desconocido:", error);
    throw new Error("Error inesperado al iniciar sesión");
  }
};