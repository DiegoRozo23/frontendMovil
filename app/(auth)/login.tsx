import { Ionicons } from "@expo/vector-icons"; // <--- 2. Importar íconos
import { router } from "expo-router";
import { Formik } from "formik";
import React, { useState } from "react"; // <--- 1. Importar useState
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import * as Yup from "yup";

import { useLogin } from "@/hooks/auth/useAuth";
import CustomButton from "../../components/ui/CustomButton";
import CustomInput from "../../components/ui/CustomInput";

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Ingresa un correo válido")
    .required("El correo es obligatorio"),
  password: Yup.string().required("La contraseña es obligatoria"),
});

export default function LoginScreen() {
  const { login, isLoading, isError, error } = useLogin();

  // 3. Estado para controlar la visibilidad de la contraseña
  const [showPassword, setShowPassword] = useState(false);

  const handleLoginSubmit = (values: any) => {
    login(
      { email: values.email, password: values.password },
      {
        onSuccess: (data) => {
          console.log("Token recibido en UI:", data.data?.token);
          router.replace("/(main)/home");
        },
        onError: (err) => {
          Alert.alert(
            "Error de inicio de sesión",
            err.message || "Verifica tus credenciales"
          );
        },
      }
    );
  };

  const handleForgotPassword = () => {
    router.push("/(auth)/forgot-password");
  };

  return (
    <View className="flex-1 bg-primary">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
      >
        <View className="px-6 py-10">
          <View className="bg-accent rounded-[30px] p-8 shadow-lg">
            <View className="mb-8">
              <Text className="text-primary text-4xl font-extra text-left mb-2">
                Bienvenido de nuevo
              </Text>
              <Text className="text-primary text-xl font-manrope text-left opacity-90">
                Inicia sesión con tu cuenta
              </Text>
            </View>

            {isError && (
              <Text className="text-red-400 mb-4 font-bold text-center">
                {error?.message}
              </Text>
            )}

            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={LoginSchema}
              onSubmit={handleLoginSubmit}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
              }) => (
                <>
                  <CustomInput
                    placeholder="Correo Electrónico"
                    value={values.email}
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    error={errors.email}
                    touched={touched.email}
                    // keyboardType="email-address"
                    // autoCapitalize="none"
                  />

                  {/* --- CAMBIO AQUÍ: Contenedor relativo para el botón de ojo --- */}
                  <View className="relative">
                    <CustomInput
                      placeholder="Contraseña"
                      value={values.password}
                      onChangeText={handleChange("password")}
                      onBlur={handleBlur("password")}
                      error={errors.password}
                      touched={touched.password}
                      // 4. Usamos el estado para controlar secureTextEntry
                      secureTextEntry={!showPassword}
                    />

                    {/* 5. Botón de Ojo superpuesto (Absolute) */}
                    <TouchableOpacity
                      onPress={() => setShowPassword(!showPassword)}
                      // Posicionamos el botón a la derecha, centrado verticalmente.
                      // Ajusta 'top-4' o 'right-4' según el padding de tu CustomInput.
                      className="absolute right-4 top-4 z-10"
                    >
                      <Ionicons
                        name={showPassword ? "eye-off" : "eye"}
                        size={24}
                        color="#6b7280" // Gris
                      />
                    </TouchableOpacity>
                  </View>
                  {/* --------------------------------------------------------- */}

                  <TouchableOpacity
                    onPress={handleForgotPassword}
                    className="w-full items-end mb-6 mt-1"
                  >
                    <Text className="text-primary font-extra text-sm">
                      ¿Olvidaste la contraseña?
                    </Text>
                  </TouchableOpacity>

                  <CustomButton
                    title={isLoading ? "Cargando..." : "Iniciar Sesión"}
                    variant="gold"
                    onPress={() => handleSubmit()}
                    className="mt-2"
                  />
                </>
              )}
            </Formik>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
