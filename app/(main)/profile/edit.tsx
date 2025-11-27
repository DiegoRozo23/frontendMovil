import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function EditProfileModal() {
  // Función para cerrar el modal si tocas fuera de la tarjeta (opcional pero recomendado)
  const handleDismiss = () => {
    router.back();
  };

  return (
    // Pressable externo para cerrar al tocar el fondo oscuro
    <Pressable
      className="flex-1 justify-center items-center px-6"
      onPress={handleDismiss}
    >
      {/* Tarjeta del Modal (Evita que el click se propague al fondo) */}
      <Pressable
        className="w-full bg-[#f4f4e4] rounded-[15px] p-6 shadow-lg border border-secondary relative"
        onPress={(e) => e.stopPropagation()}
      >
        {/* Botón Cerrar (X) o Flecha pequeño */}
        <TouchableOpacity
          onPress={handleDismiss}
          className="absolute top-4 left-4 w-[30px] h-[30px] bg-secondary rounded-full justify-center items-center z-10"
        >
          <FontAwesome name="angle-left" size={20} color="#f4f4e4" />
        </TouchableOpacity>

        {/* Título */}
        <Text className="text-secondary text-2xl font-extra text-center mb-4">
          Modificando Perfil
        </Text>

        {/* Imagen de Perfil */}
        <Text className="text-secondary text-lg font-extra mb-2 text-center">
          Imagen de perfil:
        </Text>
        <View className="self-center w-[134px] h-[103px] bg-[#d9d9d9] rounded-[15px] border-2 border-secondary mb-6" />

        {/* Campos de Formulario */}
        <View className="gap-3 mb-4">
          {/* Lugar de trabajo */}
          <View className="flex-row items-center justify-between">
            <Text className="text-secondary font-extra text-base w-[40%]">
              Lugar de trabajo:
            </Text>
            <TextInput className="flex-1 h-[50px] bg-[#d9d9d9] border border-secondary rounded-[5px] px-2" />
          </View>

          {/* Categoría */}
          <View className="flex-row items-center justify-between">
            <Text className="text-secondary font-extra text-base w-[40%]">
              Categoria:
            </Text>
            <TextInput className="flex-1 h-[50px] bg-[#d9d9d9] border border-secondary rounded-[5px] px-2" />
          </View>

          {/* Whatsapp */}
          <View className="flex-row items-center justify-between">
            <Text className="text-secondary font-extra text-base w-[40%]">
              Número de Whatsapp:
            </Text>
            <TextInput
              className="flex-1 h-[50px] bg-[#d9d9d9] border border-secondary rounded-[5px] px-2"
              keyboardType="phone-pad"
            />
          </View>

          {/* Titulo del trabajo */}
          <View className="flex-row items-center justify-between">
            <Text className="text-secondary font-extra text-base w-[40%]">
              Titulo del trabajo:
            </Text>
            <TextInput className="flex-1 h-[50px] bg-[#d9d9d9] border border-secondary rounded-[5px] px-2" />
          </View>
        </View>

        {/* Descripción (Area de texto grande) */}
        <Text className="text-secondary text-lg font-extra mb-2 text-center">
          Descripción:
        </Text>
        <TextInput
          className="w-full h-[84px] bg-[#d9d9d9] border border-secondary rounded-[15px] p-3 mb-6 text-secondary"
          multiline
          textAlignVertical="top"
        />

        {/* Botón Actualizar (Dorado) */}
        <TouchableOpacity
          onPress={() => {
            console.log("Actualizando datos...");
            router.back(); // Cerrar modal tras guardar
          }}
          className="bg-[#dcac54] py-2 px-8 rounded-[10px] self-end"
        >
          <Text className="text-secondary font-extra text-sm">Actualizar</Text>
        </TouchableOpacity>
      </Pressable>
    </Pressable>
  );
}
