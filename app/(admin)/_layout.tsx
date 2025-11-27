import { Stack } from "expo-router";
import React from "react";

export default function AdminLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // Ocultamos la cabecera nativa
        contentStyle: { backgroundColor: "#f4f4e4" }, // Fondo crema base
        animation: "slide_from_right", // Transición estándar
      }}
    >
      {/* Panel Principal del Administrador (Pág 8) */}
      <Stack.Screen name="dashboard" />

      {/* Pantalla de Gestión de Reportes y Categorías (Págs 14-15) */}
      <Stack.Screen name="reports" />

      {/* Si decidieras tener una pantalla separada para categorías en el futuro: */}
      <Stack.Screen name="categories" />
    </Stack>
  );
}
