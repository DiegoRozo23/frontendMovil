import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Datos de prueba (Mock Data)
const REVIEWS = [
  { id: "1", name: "Maria Lopez", rating: 5 },
  { id: "2", name: "Maria Lopez", rating: 5 },
];

export default function MyProfileScreen() {
  const safeArea = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-primary" style={{ paddingTop: safeArea.top }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        {/* --- HEADER --- */}
        <View className="px-6 pt-6 flex-row items-center">
          {/* Botón Atrás (Icono < azul oscuro) */}
          <TouchableOpacity onPress={() => router.back()} className="mr-4">
            <View className="w-[30px] h-[30px] bg-secondary rounded-full justify-center items-center">
              <FontAwesome name="angle-left" size={20} color="#f4f4e4" />
            </View>
          </TouchableOpacity>

          {/* Foto de Perfil */}
          <View className="w-[80px] h-[80px] bg-[#d9d9d9] rounded-full justify-center items-center mr-4">
            <Text className="text-secondary text-xs font-bold">
              Imagen Perfil
            </Text>
          </View>

          {/* Info Usuario */}
          <View className="flex-1">
            <Text className="text-secondary text-2xl font-extra leading-tight">
              Perfil de Juan Perez
            </Text>
            {/* Estrellas */}
            <View className="flex-row items-center mt-1">
              <Text className="text-secondary text-lg font-extra mr-1">5</Text>
              <View className="flex-row">
                {[1, 2, 3, 4, 5].map((i) => (
                  <FontAwesome
                    key={i}
                    name="star"
                    size={14}
                    color="#f6b53e"
                    style={{ marginRight: 2 }}
                  />
                ))}
              </View>
            </View>
          </View>
        </View>

        {/* --- SECCIÓN DE EDICIÓN Y DESCRIPCIÓN --- */}
        <View className="px-6 mt-4 relative">
          {/* Botón Modificar (Dorado) */}
          <TouchableOpacity
            className="bg-[#dcac54] py-2 px-4 rounded-full self-start mb-2"
            activeOpacity={0.8}
            // Navegamos a la pantalla de edición (Página 10)
            onPress={() => router.push("/(main)/profile/edit")}
          >
            <Text className="text-secondary text-xs font-extra">Modificar</Text>
          </TouchableOpacity>

          {/* Descripción */}
          <Text className="text-secondary text-lg font-extra mt-2">
            Descripción:
          </Text>
          <Text className="text-secondary text-base font-manrope opacity-80">
            -----{"\n"}------
          </Text>

          {/* Botón Whatsapp (Verde) */}
          {/* Posicionado a la derecha, alineado con la descripción */}
          <TouchableOpacity
            className="bg-[#25d366] py-2 px-6 rounded-full absolute right-6 top-10"
            activeOpacity={0.8}
          >
            <Text className="text-[#f4f4e4] text-sm font-extra">Whatsapp</Text>
          </TouchableOpacity>
        </View>

        {/* --- GALERÍA (3 Bloques Grises) --- */}
        <View className="flex-row justify-between px-6 mt-8">
          {[1, 2, 3].map((item) => (
            <View
              key={item}
              className="w-[30%] h-[120px] bg-[#d9d9d9] rounded-[15px] justify-center items-center"
            >
              <Text className="text-white font-manrope text-sm font-bold">
                Imagen
              </Text>
            </View>
          ))}
        </View>

        {/* --- RESEÑAS --- */}
        <View className="px-6 mt-8">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-secondary text-xl font-extra">Reseñas:</Text>

            {/* Botón Añadir (Dorado) */}
            <TouchableOpacity className="bg-[#dcac54] py-2 px-4 rounded-full">
              <Text className="text-secondary text-xs font-extra">Añadir</Text>
            </TouchableOpacity>
          </View>

          {/* Lista de reseñas */}
          {REVIEWS.map((review) => (
            <View
              key={review.id}
              className="bg-[#ececec] rounded-[15px] p-4 mb-4 flex-row justify-between items-center"
            >
              <Text className="text-secondary text-base font-extra">
                {review.name}
              </Text>
              <View className="flex-row items-center">
                <Text className="text-secondary text-base font-extra mr-1">
                  {review.rating}
                </Text>
                <View className="flex-row">
                  {/* Estrellas grises oscuras (#484646) para las reseñas */}
                  {[...Array(review.rating)].map((_, i) => (
                    <FontAwesome
                      key={i}
                      name="star"
                      size={12}
                      color="#484646"
                      style={{ marginRight: 1 }}
                    />
                  ))}
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
