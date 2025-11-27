import { loginAction } from "@/core/actions/auth/login.action";
import { parseJwt } from "@/core/helpers/jwt-parse";
import { LoginRequest } from "@/infraestructure/interfaces/auth/login.request";
import { LoginResponse } from "@/infraestructure/interfaces/auth/login.response";
import { APIResponse } from "@/infraestructure/interfaces/common/api.reponse";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Importación directa
import { useMutation } from "@tanstack/react-query";

export const useLogin = () => {
  const mutation = useMutation<APIResponse<LoginResponse>, Error, LoginRequest>(
    {
      mutationFn: loginAction,
      onSuccess: async (response) => {
        // Verificamos que la data exista
        if (response.data) {
          try {
            // Guardamos UNO POR UNO (sin JSON.stringify porque ya son strings)
            await AsyncStorage.setItem("token", response.data.token);
            await AsyncStorage.setItem(
              "refreshToken",
              response.data.refreshToken
            );
            await AsyncStorage.setItem("email", response.data.email);

            const payload = parseJwt(response.data.token);
            const userIdFromToken =
              payload?.UserId || payload?.userId || payload?.sub || null;

            if (userIdFromToken) {
              await AsyncStorage.setItem("userId", String(userIdFromToken));
            }

            console.log("Datos guardados individualmente en AsyncStorage");
          } catch (e) {
            console.error("Error guardando credenciales", e);
          }
        }
      },
      onError: (error) => {
        console.log("Error en login:", error.message);
      },
    }
  );

  return {
    login: mutation.mutate,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
  };
};
