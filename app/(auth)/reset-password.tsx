import { router } from "expo-router";
import { Formik } from "formik";
import React from "react";
import { Alert, ScrollView, Text, View } from "react-native";
import * as Yup from "yup";

import CustomButton from "../../components/ui/CustomButton";
import CustomInput from "../../components/ui/CustomInput";

// 1. Esquema de Validación
const ResetPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .required("La contraseña es obligatoria"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), undefined], "Las contraseñas no coinciden")
    .required("Debes confirmar la contraseña"),
});

export default function ResetPasswordScreen() {
  const handleResetPassword = (values: any) => {
    console.log("Restableciendo contraseña:", values.password);

    // Simulamos cambio exitoso
    Alert.alert(
      "¡Contraseña Restablecida!",
      "Ahora puedes iniciar sesión con tu nueva contraseña.",
      [
        {
          text: "Ir al Login",
          // Al dar OK, limpiamos el historial y mandamos al usuario al login
          onPress: () => router.replace("/(auth)/login"),
        },
      ]
    );
  };

  return (
    <View className="flex-1 bg-primary">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
      >
        <View className="px-6 py-10">
          {/* Tarjeta Azul */}
          <View className="bg-accent rounded-[30px] p-8 shadow-lg justify-center">
            {/* Título */}
            <Text className="text-primary text-4xl font-extra text-center mb-6 leading-tight">
              Crea una nueva{"\n"}contraseña
            </Text>

            {/* Descripción */}
            <Text className="text-primary text-lg font-manrope text-left mb-8 leading-6">
              Crea una nueva contraseña, asegurate que sea diferente a la
              anterior.
            </Text>

            {/* Formulario */}
            <Formik
              initialValues={{ password: "", confirmPassword: "" }}
              validationSchema={ResetPasswordSchema}
              onSubmit={handleResetPassword}
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
                  {/* Nueva Contraseña */}
                  <CustomInput
                    placeholder="Contraseña"
                    value={values.password}
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    error={errors.password}
                    touched={touched.password}
                    secureTextEntry
                  />

                  {/* Confirmar Contraseña */}
                  <CustomInput
                    placeholder="Confirmar contraseña"
                    value={values.confirmPassword}
                    onChangeText={handleChange("confirmPassword")}
                    onBlur={handleBlur("confirmPassword")}
                    error={errors.confirmPassword}
                    touched={touched.confirmPassword}
                    secureTextEntry
                  />

                  {/* Botón Dorado */}
                  <CustomButton
                    title="Reestablecer contraseña" // Texto exacto del diseño
                    variant="gold"
                    onPress={handleSubmit}
                    className="mt-6"
                    // Si quieres ajustar el tamaño de fuente del botón para que quepa todo el texto:
                    // Puedes modificar CustomButton para aceptar una prop textClassName o similar
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
