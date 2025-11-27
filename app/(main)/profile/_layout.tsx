import { Stack } from "expo-router";

export default function ProfileLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="[id]" />

      {/* Modales Flotantes */}
      <Stack.Screen
        name="edit"
        options={{
          presentation: "transparentModal",
          animation: "fade",
          contentStyle: { backgroundColor: "rgba(0,0,0,0.5)" },
        }}
      />

      <Stack.Screen
        name="review/[id]"
        options={{
          presentation: "transparentModal",
          animation: "fade",
          contentStyle: { backgroundColor: "rgba(0,0,0,0.5)" },
        }}
      />

      {/* NUEVO: Modal de Reporte */}
      <Stack.Screen
        name="report/[id]"
        options={{
          presentation: "transparentModal",
          animation: "fade",
          contentStyle: { backgroundColor: "rgba(0,0,0,0.5)" },
        }}
      />
    </Stack>
  );
}
