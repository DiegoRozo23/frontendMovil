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
import ServiceCard from "../../../components/service/ServiceCard";

// Datos de prueba ... estos datos en realidad tienen que provenir del backend
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
  {
    id: "4",
    name: "Ana Diaz",
    role: "Mecanico",
    location: "Comayagua",
    rating: 4.5,
  },
];

export default function HomeScreen() {
  const [search, setSearch] = useState("");

  const safeArea = useSafeAreaInsets();

  // Función para filtrar la lista (básica)
  const filteredServices = MOCK_SERVICES.filter(
    (service) =>
      service.name.toLowerCase().includes(search.toLowerCase()) ||
      service.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View className="flex-1 bg-primary" style={{ paddingTop: safeArea.top }}>
      <View className="flex-1 px-6 pt-4">
        {/* Header con Logo */}
        <View className="flex-row justify-between items-center mb-6">
          {/* Logo Placeholder Izquierdo */}
          <View className="w-[50px] h-[50px] bg-gray-300 rounded-full justify-center items-center">
            <Text className="text-xs font-bold text-secondary">Logo</Text>
          </View>

          {/* Logo Placeholder Derecho (Perfil?) */}
          <TouchableOpacity
            onPress={() => router.push("../(main)/profile")} // Navega al perfil
            className="w-[50px] h-[50px] bg-gray-300 rounded-full justify-center items-center"
          >
            <Text className="text-xs font-bold text-secondary">Perfil</Text>
          </TouchableOpacity>
        </View>

        {/* Buscador */}
        <View className="mb-6">
          <Text className="text-secondary text-2xl font-extra mb-2">
            Buscar Servicios :
          </Text>
          <View className="flex-row gap-2">
            {/* Input de búsqueda (CSS: fill:#ddddc7) */}
            <View className="flex-1 h-[50px] bg-[#ddddc7] rounded-[15px] justify-center px-4">
              <TextInput
                placeholder="Ingrese el servicio que desee buscar..."
                value={search}
                onChangeText={setSearch}
                placeholderTextColor="#97773d"
                className="text-secondary font-manrope text-base"
              />
            </View>
            {/* Botón de búsqueda azul */}
            <TouchableOpacity className="w-[50px] h-[50px] bg-accent rounded-[10px] justify-center items-center">
              <FontAwesome name="search" size={20} color="#f4f4e3" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Filtros (Placeholders visuales por ahora) */}
        <View className="mb-6">
          <Text className="text-secondary text-2xl font-extra mb-3">
            Filtros :
          </Text>

          {/* Renderizamos los filtros como filas */}
          {["Categoría", "Ubicación", "Por estrellas"].map((label) => (
            <View key={label} className="flex-row items-center mb-3">
              <Text className="text-secondary text-lg font-extra w-[120px]">
                {label}:
              </Text>
              {/* Barra de filtro (CSS: fill:#ddddc7) */}
              <View className="flex-1 h-[30px] bg-[#ddddc7] rounded-[5px]" />
            </View>
          ))}
        </View>

        {/* Lista de Resultados */}
        <FlatList
          data={filteredServices}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            //  Componente exclusivo para realizar la lista de los usuarios en carpeta componentes/service
            <ServiceCard
              name={item.name}
              role={item.role}
              location={item.location}
              rating={item.rating}
              onPress={() => router.push(`./profile/${item.id}`)} // Ir al detalle del usuario
            />
          )}
          contentContainerStyle={{ paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
          // Mensaje si no hay resultados
          ListEmptyComponent={
            <Text className="text-center text-secondary font-manrope mt-10">
              No se encontraron servicios.
            </Text>
          }
        />
      </View>
    </View>
  );
}
