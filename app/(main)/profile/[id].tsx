import { getWhatsappAction } from "@/core/actions/communication/get.whatsapp.action";
import { FontAwesome } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import {
  Alert,
  Linking,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Datos Mock
const REVIEWS = [
  { id: "1", name: "Maria Lopez", rating: 5 },
  { id: "2", name: "Maria Lopez", rating: 5 },
];

export default function PublicProfileScreen() {
  const { id } = useLocalSearchParams();

  const safeArea = useSafeAreaInsets();

  const handleWhatsappPress = async () => {
    try {
      // ID hardcodeado temporalmente ya que no se puede obtener el ID del usuario porque falta implementacion 
      const targetUserId = "d1418225-083a-44f0-98b6-98deef58d6b0";
      const url = await getWhatsappAction(targetUserId);

      if (url) {
        await Linking.openURL(url);
      } else {
        Alert.alert("Aviso", "Este usuario no tiene un número de WhatsApp registrado.");
      }
    } catch (error) {
      console.error("Error opening WhatsApp:", error);
      Alert.alert("Error", "No se pudo abrir WhatsApp.");
    }
  };

  return (
    <View className="flex-1 bg-primary" style={{ paddingTop: safeArea.top }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        {/* --- HEADER --- */}
        <View className="px-6 pt-6 flex-row items-center">
          <TouchableOpacity onPress={() => router.back()} className="mr-4">
            <View className="w-[30px] h-[30px] bg-secondary rounded-full justify-center items-center">
              <FontAwesome name="angle-left" size={20} color="#f4f4e4" />
            </View>
          </TouchableOpacity>

          {/* Foto */}
          <View className="w-[80px] h-[80px] bg-[#d9d9d9] rounded-full justify-center items-center mr-4">
            <Text className="text-secondary text-xs">Foto</Text>
          </View>

          <View className="flex-1">
            <Text className="text-secondary text-2xl font-extra leading-tight">
              Perfil de Juan Perez
            </Text>
            {/* Estrellas + Botón Reportar alineados */}
            <View className="flex-row items-center justify-between mt-1">
              <View className="flex-row items-center">
                <Text className="text-secondary text-lg font-extra mr-1">
                  5
                </Text>
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
              {/* Botón Reportar (Rojo) */}
              {/* En app/(main)/profile/[id].tsx */}
              <TouchableOpacity
                // CAMBIO: Ahora apunta a /profile/report/[id]
                onPress={() => router.push(`./report/${id}`)}
                className="bg-[#c44036] py-1 px-4 rounded-full"
              >
                <Text className="text-[#f4f4e4] text-xs font-extra">
                  Reportar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* --- DESCRIPCIÓN & WHATSAPP --- */}
        <View className="px-6 mt-4 relative">
          <Text className="text-secondary text-lg font-extra mt-2">
            Descripción:
          </Text>
          <Text className="text-secondary text-base font-manrope opacity-80">
            -----{"\n"}------
          </Text>

          {/* Botón Whatsapp (Verde) */}
          <TouchableOpacity
            className="bg-[#25d366] py-2 px-6 rounded-full absolute right-6 top-2"
            activeOpacity={0.8}
            onPress={handleWhatsappPress}
          >
            <Text className="text-[#f4f4e4] text-sm font-extra">Whatsapp</Text>
          </TouchableOpacity>
        </View>

        {/* --- GALERÍA --- */}
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
          </View>

          {/* Botón Añadir Reseña (Dorado) */}
          <TouchableOpacity
            className="bg-[#dcac54] py-2 px-6 rounded-full self-start mb-4"
            // CONECTADO: Redirige a la ruta del modal de reseña
            onPress={() => router.push(`/(main)/profile/review/${id}`)}
          >
            <Text className="text-[#f4f4e4] text-sm font-extra">
              Añadir reseña
            </Text>
          </TouchableOpacity>

          {/* Lista de Reseñas */}
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
