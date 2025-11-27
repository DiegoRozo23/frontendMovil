import React from "react";
import { Text, TextInput, View } from "react-native";

interface CustomInputProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  onBlur?: (e: any) => void; // Necesario para Formik (saber si se "tocó")
  secureTextEntry?: boolean;
  error?: string; // El mensaje de error de Yup
  touched?: boolean; // Para saber si el usuario ya tocó este campo
}

export default function CustomInput({
  placeholder,
  value,
  onChangeText,
  onBlur,
  secureTextEntry = false,
  error,
  touched,
}: CustomInputProps) {
  // Si el campo fue "tocado" y tiene un error, mostramos un borde rojo
  const borderColor = touched && error ? "border-red-500" : "border-gray-200";
  const textColor = touched && error ? "text-red-500" : "text-secondary";

  return (
    <View className="w-full mb-4">
      {/* 
        Contenedor del Input:
        - Traducimos el CSS: `fill:#f4f4e4` (o blanco como en la imagen) y `border-radius: 10px` 
        - Usaremos bg-white que se ve mejor que el crema del CSS.
      */}
      <View
        className={`w-full h-[60px] bg-white rounded-[5px] justify-center px-4 border ${borderColor}`}
      >
        <TextInput
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          onBlur={onBlur} // Importante para que Formik sepa que se salió del campo
          secureTextEntry={secureTextEntry}
          placeholderTextColor="#9ca3af" // Placeholder gris (CSS: #ddddc7)
          className={`flex-1 text-lg font-manrope ${textColor}`} // Texto oscuro (CSS: #24548c)
        />
      </View>

      {/* Mostrar el mensaje de error solo si fue tocado y hay un error */}
      {touched && error && (
        <Text className="text-red-500 text-sm mt-1 ml-1">{error}</Text>
      )}
    </View>
  );
}
