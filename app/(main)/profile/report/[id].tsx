import { createReportAction } from "@/core/actions/reports/create.report.action";
import { FontAwesome } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function ReportUserModal() {
  const { id } = useLocalSearchParams();
  const [reportText, setReportText] = useState("");
  const [reason, setReason] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDismiss = () => {
    router.back();
  };

  const handleSend = async () => {
    if (!reason.trim()) {
      Alert.alert("Error", "Por favor escribe una razón para el reporte.");
      return;
    }

    if (!description.trim()) {
      Alert.alert("Error", "Por favor escribe una descripción.");
      return;
    }

    setIsSubmitting(true);
    try {
      await createReportAction({
        reason,
        description,
      });
      Alert.alert("Éxito", "Reporte enviado correctamente", [
        { text: "OK", onPress: () => router.back() },
      ]);
    } catch (error: any) {
      console.error("Error creating report:", error);
      Alert.alert(
        "Error",
        error.response?.data?.message || "No se pudo enviar el reporte."
      );
    } finally {
      setIsSubmitting(false);
    }
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
        {/* Input Razón */}
        <TextInput
          className="w-full h-[50px] bg-[#ddddc7] border border-secondary rounded-[15px] px-4 text-secondary font-manrope text-base mb-4"
          placeholder="Razón del reporte"
          placeholderTextColor="#f4f4e4"
          value={reason}
          onChangeText={setReason}
          editable={!isSubmitting}
        />

        {/* Área de Texto (Input Grande) - Descripción */}
        <TextInput
          className="w-full h-[150px] bg-[#ddddc7] border border-secondary rounded-[15px] p-4 text-secondary font-manrope text-base mb-6"
          placeholder="Descripción detallada"
          placeholderTextColor="#f4f4e4"
          multiline
          textAlignVertical="top"
          value={description}
          onChangeText={setDescription}
          editable={!isSubmitting}
        />

        {/* Botón Enviar (Dorado) */}
        <View className="items-end">
          <TouchableOpacity
            onPress={handleSend}
            className="bg-[#dcac54] py-3 px-10 rounded-[10px]"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <ActivityIndicator color="#f4f4e4" size="small" />
            ) : (
              <Text className="text-[#f4f4e4] font-extra text-sm">Enviar</Text>
            )}
          </TouchableOpacity>
        </View>
      </Pressable>
    </Pressable>
  );
}
