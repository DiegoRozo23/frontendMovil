import { useRoles } from "@/hooks/roles/useRoles";
import { router } from "expo-router";
import React from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CustomButton from "../components/ui/CustomButton";

export default function LandingPage() {
  const safeArea = useSafeAreaInsets();

  // 1. Extraemos todo el objeto para ver el estado real
  const { rolesPaginationQuery } = useRoles();
  const { data, isLoading, isError, error, refetch } = rolesPaginationQuery;

  const handleLogin = () => {
    router.push("/(auth)/login");
  };

  const handleRegister = () => {
    router.push("/(auth)/register");
  };

  // 2. Función de prueba mejorada
  const handleTest = () => {
    console.log("--- DIAGNÓSTICO DE CONEXIÓN ---");
    console.log("1. Estado:", rolesPaginationQuery.status);
    console.log("2. ¿Cargando?:", isLoading);
    console.log("3. ¿Error?:", isError);

    if (isError) {
      console.log("4. DETALLE DEL ERROR:", error);
      // @ts-ignore
      console.log("5. Mensaje:", error?.message);
    }

    console.log("6. Datos:", data);

    // Forzamos una recarga para ver el intento en la red
    refetch();
  };

  return (
    <View className="flex-1 bg-primary" style={{ paddingTop: safeArea.top }}>
      <View className="flex-1 items-center justify-between py-12 px-8">
        <View className="w-full items-center mt-10">
          <Text className="text-secondary text-4xl font-extra text-center mb-8">
            Mi trabajo APP
          </Text>

          <View className="w-[150px] h-[150px] bg-[#d9d9d9] rounded-full justify-center items-center mb-4">
            <Text className="text-secondary text-xl font-bold">Logo</Text>
          </View>

          {/* --- ZONA DE DIAGNÓSTICO VISUAL --- */}
          <View className="bg-white p-2 rounded-lg mt-2 w-full items-center">
            <Text className="font-bold mb-1">Estado del Backend:</Text>

            {isLoading && (
              <View className="flex-row items-center">
                <ActivityIndicator size="small" color="#24548c" />
                <Text className="ml-2 text-gray-500">
                  Intentando conectar...
                </Text>
              </View>
            )}

            {isError && (
              <Text className="text-red-600 text-center text-xs">
                Error: {error?.message}
              </Text>
            )}

            {data && (
              <Text className="text-green-600 font-bold">
                ¡Conectado! Roles cargados: {data.data?.totalItems}
              </Text>
            )}
          </View>
          {/* ---------------------------------- */}
        </View>

        <View className="items-center w-4/5 max-w-[300px]">
          <CustomButton
            title="Registrarse"
            variant="blue"
            onPress={handleRegister}
          />

          <Text className="text-secondary text-2xl font-extra my-2">o</Text>

          <CustomButton
            title="Iniciar Sesión"
            variant="gold"
            onPress={handleLogin}
          />
        </View>

        <Pressable
          className={`rounded-full px-5 py-3 ${isLoading ? "bg-gray-400" : "bg-red-700"}`}
          onPress={handleTest}
        >
          <Text className="text-white font-bold">
            {isLoading ? "Conectando..." : "Reintentar Conexión"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
