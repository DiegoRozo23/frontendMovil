import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import AccordionItem from "../../components/ui/AccordionItem";

export default function AdminReportsScreen() {
  const safeArea = useSafeAreaInsets();
  return (
    <View className="flex-1 bg-primary" style={{ paddingTop: safeArea.top }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }}>
        <View className="px-6 py-8">
          {/* --- HEADER --- */}
          <View className="flex-row items-center mb-8">
            {/* Botón Atrás */}
            <TouchableOpacity onPress={() => router.back()} className="mr-4">
              <View className="w-[30px] h-[30px] bg-secondary rounded-full justify-center items-center">
                <FontAwesome name="angle-left" size={20} color="#f4f4e4" />
              </View>
            </TouchableOpacity>

            {/* Título */}
            <Text className="text-secondary text-2xl font-extra flex-1 leading-8">
              Configuraciones de{"\n"}administrador
            </Text>
          </View>

          {/* --- ACORDEÓN 1: VER REPORTES --- */}
          <AccordionItem title="Ver reportes" isOpen={true}>
            {/* Tarjeta de Reporte (Fondo beige oscuro) */}
            <View className="bg-[#ddddc7] p-4 rounded-[10px] mb-4">
              {/* ID y Fecha */}
              <View className="flex-row justify-between mb-2">
                <Text className="text-secondary font-extra text-base">
                  ID Reporte: F9999
                </Text>
                <Text className="text-secondary font-extra text-base">
                  Fecha reporte
                </Text>
              </View>

              {/* Info Reporte */}
              <Text className="text-secondary font-extra text-base">
                Reporte de Maria
              </Text>
              <Text className="text-secondary font-extra text-base mb-4">
                Reporte para ...
              </Text>

              {/* Comentario */}
              <Text className="text-secondary font-extra text-base mb-6">
                Comentario del reporte...
              </Text>

              {/* Botones de Acción */}
              <View className="flex-row justify-between gap-2">
                {/* Advertir (Amarillo) */}
                <TouchableOpacity className="flex-1 bg-[#ffe244] py-2 rounded-[10px] items-center">
                  <Text className="text-secondary font-extra text-sm">
                    Advertir usuario
                  </Text>
                </TouchableOpacity>

                {/* Inhabilitar (Rojo) */}
                <TouchableOpacity className="flex-1 bg-[#c44036] py-2 rounded-[10px] items-center">
                  <Text className="text-primary font-extra text-sm">
                    Inhabilitar usuario
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Paginación */}
            <View className="flex-row justify-between items-center px-2">
              <View>
                <Text className="text-secondary font-extra text-base">
                  Pagina 1 de 10
                </Text>
                <View className="flex-row gap-4 mt-1">
                  <Text className="text-secondary font-extra text-base underline">
                    Anterior
                  </Text>
                  <Text className="text-secondary font-extra text-base underline">
                    Siguiente
                  </Text>
                </View>
              </View>
              <Text className="text-secondary font-extra text-base text-right">
                10 reportes{"\n"}por página
              </Text>
            </View>
          </AccordionItem>

          {/* --- ACORDEÓN 2: CREAR CATEGORÍAS --- */}
          <AccordionItem title="Crear Categorias">
            {/* Formulario dentro del acordeón */}
            <View className="bg-[#ddddc7] p-6 rounded-[10px]">
              {/* Input Nombre */}
              <TextInput
                placeholder="Nombre"
                placeholderTextColor="#b6b6a5"
                className="bg-[#f4f4e4] rounded-[5px] p-3 mb-4 text-secondary font-manrope font-bold text-base"
              />

              {/* Input Descripción */}
              <TextInput
                placeholder="Descripción"
                placeholderTextColor="#b6b6a5"
                className="bg-[#f4f4e4] rounded-[5px] p-3 mb-4 text-secondary font-manrope font-bold text-base"
              />

              {/* Botón Añadir (+) */}
              <TouchableOpacity className="w-[42px] h-[42px] bg-[#b6b6a5] rounded-full justify-center items-center mb-6">
                <Text className="text-[#97773d] text-2xl font-extra pb-1">
                  +
                </Text>
              </TouchableOpacity>

              {/* Botón Crear Lista (Verde) */}
              <TouchableOpacity className="w-full bg-[#2fc16a] py-3 rounded-[10px] items-center">
                <Text className="text-primary font-extra text-lg">
                  Crear Lista
                </Text>
              </TouchableOpacity>
            </View>
          </AccordionItem>
        </View>
      </ScrollView>
    </View>
  );
}
