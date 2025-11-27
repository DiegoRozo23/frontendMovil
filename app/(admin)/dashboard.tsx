import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import ServiceCard from "../../components/service/ServiceCard";

// Datos de prueba (Mismos que el home, o podrían ser diferentes para admin)
const MOCK_SERVICES = [
  { id: "1", name: "Juan Perez", role: "Mecanico", location: "SPS", rating: 5 },
  {
    id: "2",
    name: "Maria Lopez",
    role: "Fontanero",
    location: "Tegucigalpa",
    rating: 4.8,
  },
  {
    id: "3",
    name: "Carlos Ruiz",
    role: "Electricista",
    location: "La Ceiba",
    rating: 5,
  },
];

export default function AdminDashboard() {
  const [search, setSearch] = useState("");

  const safeArea = useSafeAreaInsets();

  // Lógica de filtrado
  const filteredServices = MOCK_SERVICES.filter(
    (service) =>
      service.name.toLowerCase().includes(search.toLowerCase()) ||
      service.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View className="flex-1 bg-primary" style={{ paddingTop: safeArea.top }}>
      <View className="flex-1 px-6 pt-4">
        {/* --- HEADER ADMINISTRADOR --- */}
        <View className="flex-row justify-between items-center mb-6">
          {/* Logo Izquierdo */}
          <View className="w-[60px] h-[60px] bg-gray-300 rounded-full justify-center items-center">
            <Text className="text-xs font-bold text-secondary">Logo</Text>
          </View>

          {/* Botón Central: Panel de Administrador */}
          {/* CSS: fill:#ddddc7 (beige oscuro), rounded-10px, text-18px extra bold */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => router.push("/(admin)/reports")} // Ejemplo: Navegar a reportes
            className="bg-[#ddddc7] px-4 py-3 rounded-[10px] shadow-sm"
          >
            <Text className="text-secondary text-center font-extra text-sm leading-4">
              Panel de{"\n"}Administrador
            </Text>
          </TouchableOpacity>

          {/* Perfil Derecho */}
          <TouchableOpacity
            onPress={() => router.push("../(main)/profile")} // Navega al perfil
            className="w-[50px] h-[50px] bg-gray-300 rounded-full justify-center items-center"
          >
            <Text className="text-xs font-bold text-secondary">Perfil</Text>
          </TouchableOpacity>
        </View>

        {/* --- CONTENIDO PRINCIPAL (Igual al Home) --- */}

        {/* Buscador */}
        <View className="mb-6">
          <Text className="text-secondary text-2xl font-extra mb-2">
            Buscar Servicios :
          </Text>
          <View className="flex-row gap-2">
            <View className="flex-1 h-[50px] bg-[#ddddc7] rounded-[15px] justify-center px-4">
              <TextInput
                placeholder="Ingrese el servicio que desee buscar..."
                value={search}
                onChangeText={setSearch}
                placeholderTextColor="#97773d"
                className="text-secondary font-manrope text-base"
              />
            </View>
            <TouchableOpacity className="w-[50px] h-[50px] bg-accent rounded-[10px] justify-center items-center">
              <FontAwesome name="search" size={20} color="#f4f4e3" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Filtros Visuales */}
        <View className="mb-6">
          <Text className="text-secondary text-2xl font-extra mb-3">
            Filtros :
          </Text>
          {["Categoría", "Ubicación", "Por estrellas"].map((label) => (
            <View key={label} className="flex-row items-center mb-3">
              <Text className="text-secondary text-lg font-extra w-[120px]">
                {label}:
              </Text>
              <View className="flex-1 h-[30px] bg-[#ddddc7] rounded-[5px]" />
            </View>
          ))}
        </View>

        {/* Lista de Servicios */}
        <FlatList
          data={filteredServices}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ServiceCard
              name={item.name}
              role={item.role}
              location={item.location}
              rating={item.rating}
              // Como admin, quizás al hacer click vas a una vista de edición o detalle especial
              onPress={() => router.push(`../(main)/profile/${item.id}`)}
            />
          )}
          contentContainerStyle={{ paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <Text className="text-center text-secondary font-manrope mt-10">
              No se encontraron resultados.
            </Text>
          }
        />
      </View>
    </View>
  );
}
