import { FontAwesome } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function ReportUserModal() {
  const { id } = useLocalSearchParams();
  const [reportText, setReportText] = useState("");

  const handleDismiss = () => {
    router.back();
  };

  const handleSend = () => {
    console.log(`Reportando usuario ${id}: ${reportText}`);
    router.back();
  };

  return (
    // 1. Contenedor Principal:
    // - flex-1 justify-center: Centra el contenido verticalmente.
    // - NO tiene color de fondo aquí (se maneja en el _layout o es transparente).
    // - onPress={handleDismiss}: Si tocas la zona vacía, se cierra.
    <Pressable
      className="flex-1 justify-center items-center px-6"
      onPress={handleDismiss}
    >
      {/* 2. Tarjeta del Modal: */}
      {/* - bg-primary: El color crema de fondo SOLO en la tarjeta. */}
      {/* - e.stopPropagation(): Evita que al tocar la tarjeta se cierre el modal. */}
      <Pressable
        className="w-full bg-primary rounded-[15px] p-6 shadow-lg relative border border-secondary/10"
        onPress={(e) => e.stopPropagation()}
      >
        {/* Encabezado de la tarjeta */}
        <View className="flex-row items-center mb-2">
          {/* Botón Atrás (Azul) */}
          <TouchableOpacity onPress={handleDismiss} className="mr-3">
            <View className="w-[30px] h-[30px] bg-secondary rounded-full justify-center items-center">
              <FontAwesome name="angle-left" size={20} color="#f4f4e4" />
            </View>
          </TouchableOpacity>
        </View>

        {/* Título */}
        <Text className="text-secondary text-lg font-extra mb-2 ml-10">
          Creando un reporte:
        </Text>

        {/* Área de Texto (Input Grande) */}
        {/* CSS Ref: bg-[#ddddc7] que es el beige oscuro de tus inputs */}
        <TextInput
          className="w-full h-[150px] bg-[#ddddc7] border border-secondary rounded-[15px] p-4 text-secondary font-manrope text-base mb-6"
          placeholder="Texto Reporte"
          placeholderTextColor="#f4f4e4"
          multiline
          textAlignVertical="top"
          value={reportText}
          onChangeText={setReportText}
        />

        {/* Botón Enviar (Dorado) */}
        <View className="items-end">
          <TouchableOpacity
            onPress={handleSend}
            className="bg-[#dcac54] py-3 px-10 rounded-[10px]"
          >
            <Text className="text-[#f4f4e4] font-extra text-sm">Enviar</Text>
          </TouchableOpacity>
        </View>
      </Pressable>
    </Pressable>
  );
}
