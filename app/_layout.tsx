import { queryClient } from "@/config/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font"; // <--- Importamos el hook para fuentes
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "../global.css";

// Evita que la pantalla de carga se oculte automáticamente antes de cargar fuentes
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // Cargamos las fuentes y asignamos nombres clave a cada archivo
  // Los nombres a la izquierda (ej: 'Manrope-Bold') son los que usaremos luego
  const [loaded, error] = useFonts({
    "Manrope-Regular": require("../assets/fonts/Manrope-Regular.ttf"),
    "Manrope-Bold": require("../assets/fonts/Manrope-Bold.ttf"),
    "Manrope-ExtraBold": require("../assets/fonts/Manrope-ExtraBold.ttf"),
    "Manrope-Medium": require("../assets/fonts/Manrope-Medium.ttf"),
    "Manrope-SemiBold": require("../assets/fonts/Manrope-SemiBold.ttf"),
    "Manrope-Light": require("../assets/fonts/Manrope-Light.ttf"),
    "Manrope-ExtraLight": require("../assets/fonts/Manrope-ExtraLight.ttf"),
  });

  // Este efecto maneja el ocultamiento del Splash Screen
  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  // Si no han cargado y no hay error, no renderizamos nada todavía
  if (!loaded && !error) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(main)" />
        <Stack.Screen name="(admin)" />
      </Stack>
    </QueryClientProvider>
  );
}
