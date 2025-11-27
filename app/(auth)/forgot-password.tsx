import { router } from "expo-router";
import { Formik } from "formik";
import React from "react";
import { Alert, ScrollView, Text, View } from "react-native";
import * as Yup from "yup";

import CustomButton from "../../components/ui/CustomButton";
import CustomInput from "../../components/ui/CustomInput";

// 1. Esquema de Validación
const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email("Ingresa un correo válido")
    .required("El correo es obligatorio"),
});

export default function ForgotPasswordScreen() {
  const handleSendCode = (values: any) => {
    console.log("Enviando código a:", values.email); // CAMBIAR A LA RUTA DE (AUTH)/verifycode

    // Simulamos el envío del correo
    Alert.alert("Código Enviado", "Revisa tu bandeja de entrada.", [
      {
        text: "OK",
        // Al dar OK, navegamos a la pantalla de verificar código (Página 6 del PDF original)
        onPress: () => router.push("/(auth)/verify-code"),
      },
    ]);
  };

  return (
    // Fondo crema (CSS: .basebackg... { fill:#f4f4e4 })
    <View className="flex-1 bg-primary">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
      >
        <View className="px-6 py-10">
          {/* Tarjeta Azul (CSS: .svgrect... { fill:#24548c; border-radius: 30px }) */}
          <View className="bg-accent rounded-[30px] p-8 shadow-lg min-h-[400px] justify-center">
            {/* Título: Ingrese su correo */}
            {/* CSS: font-weight: 800, size: 36px */}
            <Text className="text-primary text-4xl font-extra text-center mb-6">
              Ingrese su correo
            </Text>

            {/* Descripción */}
            {/* CSS: font-weight: 500, size: 24px */}
            <Text className="text-primary text-lg font-manrope text-center mb-10 leading-6">
              Se enviara un codigo a tu correo electronico para reestablecer la
              contraseña
            </Text>

            {/* Formulario */}
            <Formik
              initialValues={{ email: "" }}
              validationSchema={ForgotPasswordSchema}
              onSubmit={handleSendCode}
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
                    // keyboardType="email-address" ayuda al usuario mostrando @
                  />

                  {/* Botón Dorado */}
                  <CustomButton
                    title="Enviar Código"
                    variant="gold"
                    onPress={handleSubmit}
                    className="mt-4"
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
