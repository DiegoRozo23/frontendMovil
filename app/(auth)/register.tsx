import { router } from "expo-router";
import { Formik } from "formik";
import React from "react";
import { Alert, ScrollView, Text, View } from "react-native";
import * as Yup from "yup";

import CustomButton from "../../components/ui/CustomButton";
import CustomInput from "../../components/ui/CustomInput";

// 1. Esquema de Validación con YUP
const RegisterSchema = Yup.object().shape({
  nombre: Yup.string()
    .min(3, "El nombre es muy corto")
    .required("El nombre es obligatorio"),
  email: Yup.string()
    .email("Correo no válido")
    .required("El correo es obligatorio"),
  password: Yup.string()
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .required("La contraseña es obligatoria"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), undefined], "Las contraseñas no coinciden")
    .required("Debes confirmar la contraseña"),
});

export default function RegisterScreen() {
  const handleRegister = (values: any) => {
    // Aquí irá tu lógica para registrar al usuario en tu backend
    console.log(
      "Datos del formulario:",
      values.nombre,
      values.email,
      values.password
    );

    // Simulamos un registro exitoso
    Alert.alert("¡Registro Exitoso!", "Tu cuenta ha sido creada.");

    // Navegamos al verify-code
    router.replace("/(auth)/verify-code");
  };

  return (
    // Fondo de la pantalla (CSS: .svgrect-1e2ac4698141 { fill:#f4f4e4 })
    <View className="flex-1 bg-primary">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
      >
        <View className="px-6 py-10">
          {/* El contenedor azul (CSS: .svgrect-1e2ac469ef64 { fill:#24548c; border-radius: 30px }) */}
          <View className="bg-accent rounded-[30px] p-8">
            {/* Título (CSS: .ingresa-tu-1ecc359dfe91 { color: #f4f4e3; font-size: 36px; font-weight: 800 }) */}
            <Text className="text-primary text-4xl font-extra text-left mb-8">
              Ingresa tus datos
            </Text>

            {/* 2. Integración de Formik */}
            <Formik
              initialValues={{
                nombre: "",
                email: "",
                password: "",
                confirmPassword: "",
              }}
              validationSchema={RegisterSchema}
              onSubmit={handleRegister}
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
                  {/* Campos de Texto (Inputs) */}
                  {/* CSS: .svgrect-1e2ac46ef7b1 (Nombre) */}
                  <CustomInput
                    placeholder="Nombre"
                    value={values.nombre}
                    onChangeText={handleChange("nombre")}
                    onBlur={handleBlur("nombre")}
                    error={errors.nombre}
                    touched={touched.nombre}
                  />

                  {/* CSS: .svgrect-1e2ac470d5ce (Correo) */}
                  <CustomInput
                    placeholder="Correo Electrónico"
                    value={values.email}
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    error={errors.email}
                    touched={touched.email}
                  />

                  {/* CSS: .svgrect-1e2ac474966a (Contraseña) */}
                  <CustomInput
                    placeholder="Contraseña"
                    value={values.password}
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    error={errors.password}
                    touched={touched.password}
                    secureTextEntry
                  />

                  {/* CSS: .svgrect-1e2ac47db440 (Confirmar) */}
                  <CustomInput
                    placeholder="Confirmar contraseña"
                    value={values.confirmPassword}
                    onChangeText={handleChange("confirmPassword")}
                    onBlur={handleBlur("confirmPassword")}
                    error={errors.confirmPassword}
                    touched={touched.confirmPassword}
                    secureTextEntry
                  />

                  {/* Botón de Registro (CSS: .svgrect-1ecbf24a1099 { fill:#dcac54 }) */}
                  <CustomButton
                    title="Registrarse"
                    variant="gold"
                    onPress={handleSubmit}
                    className="mt-6" // clase especial para el boton
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
