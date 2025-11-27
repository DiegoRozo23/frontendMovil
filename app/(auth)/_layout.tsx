import { Stack } from "expo-router";
import React from "react";

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // Ocultamos la barra superior nativa en todas las pantallas de auth
        animation: "slide_from_right", // Animación estándar de transición
        contentStyle: { backgroundColor: "#f4f4e4" }, // Fondo base (crema) para evitar parpadeos blancos
      }}
    >
      {/* Pantalla de Login (Pág 2) */}
      <Stack.Screen name="login" />

      {/* Pantalla de Registro (Pág 3) */}
      <Stack.Screen name="register" />

      {/* Pantalla Olvidé Contraseña (Pág 4) */}
      <Stack.Screen name="forgot-password" />

      {/* Pantalla Verificar Código (Pág 6) */}
      <Stack.Screen name="verify-code" />

      {/* Pantalla Nueva Contraseña (Pág 5) */}
      <Stack.Screen name="reset-password" />
    </Stack>
  );
}
