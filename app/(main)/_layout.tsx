import { Stack } from "expo-router";
import React from "react";

export default function MainLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // Ocultamos la barra superior nativa (tu diseño tiene headers propios)
        contentStyle: { backgroundColor: "#f4f4e4" }, // Fondo crema base para toda la app
        animation: "slide_from_right", // Transición estándar tipo iOS/Android
      }}
    >
      {/* 1. Carpeta Home: Contiene la pantalla de búsqueda y listado (index.tsx)
       */}
      <Stack.Screen name="home" />

      {/* 2. Carpeta Profile: Contiene 'index' (mi perfil), '[id]' (otros), y los modales.
           Este tiene su propio _layout.tsx anidado que ya creamos.
      */}
      <Stack.Screen name="profile" />
    </Stack>
  );
}
