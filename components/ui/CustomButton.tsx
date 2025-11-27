import React from "react";
import { Pressable, Text } from "react-native";

interface CustomButtonProps {
  title: string;
  onPress?: () => void;
  variant?: "blue" | "gold";
  className?: string; // <--- Agregamos esto para aceptar clases extra (márgenes, anchos, etc.)
}

export default function CustomButton({
  title,
  onPress,
  variant = "blue",
  className = "", // Valor por defecto vacío para que no falle si no lo envías
}: CustomButtonProps) {
  const btnColor = {
    blue: "bg-accent",
    gold: "bg-highlight",
  }[variant];

  const textColor = {
    blue: "text-text-light",
    gold: "text-primary",
  }[variant];

  return (
    <Pressable
      onPress={onPress}
      // Agregamos ${className} al final de la cadena para que tus estilos extra se apliquen
      className={`w-full h-[60px] rounded-2xl justify-center items-center ${btnColor} my-2 active:opacity-90 ${className}`}
    >
      <Text className={`text-2xl font-extra ${textColor}`}>{title}</Text>
    </Pressable>
  );
}
