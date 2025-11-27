import { FontAwesome } from "@expo/vector-icons"; // Para la flecha
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  isOpen?: boolean; // Prop opcional para forzar estado inicial
}

export default function AccordionItem({
  title,
  children,
  isOpen = false,
}: AccordionItemProps) {
  const [expanded, setExpanded] = useState(isOpen);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <View className="mb-6">
      {/* Encabezado del Acordeón (Título y Flecha) */}
      <TouchableOpacity
        onPress={toggleExpand}
        activeOpacity={0.7}
        className="flex-row justify-between items-center mb-4"
      >
        {/* Título (CSS: Manrope 800, 24px, color oscuro) */}
        <Text className="text-secondary text-2xl font-extra">{title}</Text>

        {/* Botón Flecha (Azul oscuro) */}
        <View className="w-[30px] h-[30px] bg-secondary rounded-full justify-center items-center">
          <FontAwesome
            name={expanded ? "angle-up" : "angle-down"}
            size={20}
            color="#f4f4e4" // Color crema
          />
        </View>
      </TouchableOpacity>

      {/* Contenido Desplegable */}
      {/* Solo se muestra si 'expanded' es true */}
      {expanded && (
        <View>
          {/* Línea separadora opcional si se desea */}
          <View className="h-[1px] bg-secondary opacity-20 mb-4" />
          {children}
        </View>
      )}

      {/* Línea separadora final del item (como en la imagen colapsada) */}
      {!expanded && <View className="h-[1px] bg-secondary w-full mt-2" />}
    </View>
  );
}
