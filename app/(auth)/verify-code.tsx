import { router } from "expo-router";
import { Formik } from "formik";
import React, { useRef, useState } from "react";
import { SafeAreaView, ScrollView, Text, TextInput, View } from "react-native";
import * as Yup from "yup";

import CustomButton from "../../components/ui/CustomButton";

// 1. Esquema de Validación: El código debe tener exactamente 5 caracteres
const VerifyCodeSchema = Yup.object().shape({
  code: Yup.string()
    .length(5, "El código debe tener 5 dígitos")
    .required("El código es obligatorio"),
});

export default function VerifyCodeScreen() {
  // Usamos un array local para manejar visualmente las 5 cajas
  const [otp, setOtp] = useState(["", "", "", "", ""]);

  // Creamos referencias para poder mover el foco del cursor automáticamente
  const inputRefs = useRef<Array<TextInput | null>>([]);

  const handleVerify = (values: any) => {
    console.log("Verificando código:", values.code);

    // Simulamos verificación exitosa
    router.push("/(auth)/reset-password");
  };

  // Función para manejar el cambio de texto en cada cajita
  const handleOtpChange = (text: string, index: number, setFieldValue: any) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Actualizamos el valor en Formik (unimos el array en un string "12345")
    const codeString = newOtp.join("");
    setFieldValue("code", codeString);

    // Si el usuario escribió un número y no es la última caja, saltamos a la siguiente
    if (text && index < 4) {
      inputRefs.current[index + 1]?.focus();
    }

    // Lógica opcional: Si el usuario borra, podríamos regresar el foco (se maneja mejor con onKeyPress)
  };

  // Manejar la tecla de borrar (Backspace) para regresar a la caja anterior
  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-primary">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
      >
        <View className="px-6 py-10">
          {/* Tarjeta Azul */}
          <View className="bg-accent rounded-[30px] p-8 shadow-lg min-h-[400px] items-center justify-center">
            {/* Título */}
            <Text className="text-primary text-4xl font-extra text-center mb-6 leading-tight">
              Verifica tu{"\n"}correo electrónico
            </Text>

            {/* Descripción con Email resaltado */}
            <Text className="text-primary text-lg font-manrope text-center mb-10 leading-6">
              Hemos enviado el codigo de verificación al correo{" "}
              {/* Usamos text-highlight para el color dorado del email */}
              <Text className="text-highlight font-extra">examemple@me.hn</Text>
              {"\n"}Ingrese el código de 5 digitos para continuar.
            </Text>

            <Formik
              initialValues={{ code: "" }}
              validationSchema={VerifyCodeSchema}
              onSubmit={handleVerify}
            >
              {({ handleSubmit, setFieldValue, errors, touched }) => (
                <View className="w-full items-center">
                  {/* Contenedor de las 5 cajitas */}
                  <View className="flex-row justify-between w-full max-w-[300px] mb-4">
                    {otp.map((digit, index) => (
                      <TextInput
                        key={index}
                        ref={(ref: TextInput | null) => {
                          inputRefs.current[index] = ref;
                        }}
                        value={digit}
                        onChangeText={(text) =>
                          handleOtpChange(text, index, setFieldValue)
                        }
                        onKeyPress={(e) => handleKeyPress(e, index)}
                        keyboardType="number-pad"
                        maxLength={1}
                        // Estilos de las cajitas (Crema, borde redondeado, texto oscuro)
                        className="w-[50px] h-[60px] bg-primary rounded-[10px] text-secondary text-3xl font-extra text-center"
                        // Un pequeño hack para que el cursor no tape el número
                        caretHidden={false}
                        selectionColor="#143c4c"
                      />
                    ))}
                  </View>

                  {/* Mensaje de error si el código no está completo */}
                  {errors.code && touched.code && (
                    <Text className="text-red-400 font-bold mb-4 text-center">
                      {errors.code}
                    </Text>
                  )}

                  {/* Botón Dorado */}
                  <CustomButton
                    title="Verificar código"
                    variant="gold"
                    onPress={handleSubmit}
                    className="mt-6 w-full"
                  />
                </View>
              )}
            </Formik>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
