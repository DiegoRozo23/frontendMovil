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

export default function AddReviewScreen() {
  const { id } = useLocalSearchParams();
  const [rating, setRating] = useState(0); // Estado para las estrellas
  const [reviewText, setReviewText] = useState("");

  const handleDismiss = () => {
    router.back();
  };

  const handleSubmit = () => {
    console.log(
      `Enviando reseña para ${id}: ${rating} estrellas, texto: ${reviewText}`
    );
    router.back();
  };

  return (
    // Pressable externo para cerrar al tocar fuera
    <Pressable
      className="flex-1 justify-center items-center px-6"
      onPress={handleDismiss}
    >
      {/* Tarjeta Modal (Evita propagación del click) */}
      <Pressable
        className="w-full bg-primary rounded-[15px] p-6 shadow-lg border border-gray-200"
        onPress={(e) => e.stopPropagation()}
      >
        {/* Botón Atrás (Círculo Azul con Flecha) */}
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={handleDismiss} className="mr-3">
            <View className="w-[30px] h-[30px] bg-secondary rounded-full justify-center items-center">
              <FontAwesome name="angle-left" size={20} color="#f4f4e4" />
            </View>
          </TouchableOpacity>

          <Text className="text-secondary text-lg font-extra">
            Añadiendo Reseña:
          </Text>
        </View>

        {/* Área de Texto con Estrellas Integradas */}
        <View className="w-full h-[150px] bg-[#ddddc7] rounded-[15px] p-4 relative mb-4 border border-secondary">
          {/* Selector de Estrellas (Flotante arriba a la derecha) */}
          <View className="absolute top-4 right-4 flex-row z-10">
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity key={star} onPress={() => setRating(star)}>
                <FontAwesome
                  name={star <= rating ? "star" : "star-o"}
                  size={20}
                  color="#484646" // Color gris oscuro según diseño
                  style={{ marginLeft: 2 }}
                />
              </TouchableOpacity>
            ))}
          </View>

          {/* Input de Texto */}
          <TextInput
            className="flex-1 text-secondary font-manrope text-base pt-6" // pt-6 para no tapar las estrellas
            placeholder="Escribe tu reseña aquí..."
            placeholderTextColor="rgba(20, 60, 76, 0.5)"
            multiline
            textAlignVertical="top"
            value={reviewText}
            onChangeText={setReviewText}
          />
        </View>

        {/* Botón Enviar (Dorado) */}
        <View className="items-end">
          <TouchableOpacity
            onPress={handleSubmit}
            className="bg-[#dcac54] py-3 px-10 rounded-[10px]"
          >
            <Text className="text-[#f4f4e4] font-extra text-sm">Enviar</Text>
          </TouchableOpacity>
        </View>
      </Pressable>
    </Pressable>
  );
}
