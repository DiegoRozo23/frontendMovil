import { FontAwesome } from "@expo/vector-icons"; // Ícono de estrella
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface ServiceCardProps {
  name: string;
  role: string;
  location: string;
  rating: number;
  onPress?: () => void;
}

export default function ServiceCard({
  name,
  role,
  location,
  rating,
  onPress,
}: ServiceCardProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      // Contenedor gris claro con bordes redondeados (CSS: fill:#ececec, radius: 15px)
      className="w-full bg-gray-200 rounded-[15px] p-4 mb-4 border border-gray-300 shadow-sm"
    >
      <View className="flex-row justify-between items-start mb-2">
        {/* Nombre (CSS: Juan Perez, Manrope 800) */}
        <Text className="text-secondary text-2xl font-extra">{name}</Text>
        {/* Ubicación (CSS: ciudad/ubicación, Manrope 500, size 16) */}
        <Text className="text-secondary text-base font-manrope opacity-70">
          {location}
        </Text>
      </View>

      <View className="flex-row justify-between items-center mt-2">
        {/* Rol (CSS: Mecanico, Manrope 500, size 24) */}
        <Text className="text-secondary text-xl font-manrope-medium">
          {role}
        </Text>

        {/* Rating con Estrella */}
        <View className="flex-row items-center gap-1">
          <Text className="text-secondary text-lg font-extra">{rating}</Text>
          <FontAwesome name="star" size={20} color="#f6b53e" />
        </View>
      </View>
    </TouchableOpacity>
  );
}
