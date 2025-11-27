import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import Constants from "expo-constants";

// 1. Lógica para detectar la IP de tu PC automáticamente
const getBaseUrl = () => {
  // Leemos la variable de entorno o usamos localhost por defecto
  let url = process.env.EXPO_PUBLIC_API_URL || "http://localhost:5000/api";
  
  if (__DEV__) {
    const debuggerHost = Constants.expoConfig?.hostUri;
    
    if (debuggerHost) {
      // Obtiene la IP real de tu máquina (ej: 192.168.1.11)
      const realIp = debuggerHost.split(":")[0];
      
      // Reemplaza 'localhost' o '0.0.0.0' en la URL por la IP real
      return url.replace("localhost", realIp).replace("0.0.0.0", realIp);
    }
  }

  // Fallback para producción
  return url;
};

console.log("API Configurada en:", getBaseUrl());

// 2. Crear la instancia de Axios
export const projectApi = axios.create({
  baseURL: getBaseUrl(),
  headers: {
    "Content-Type": "application/json",
    "X-Client-Type": "mobile", // Header clave para que tu backend identifique al móvil
  },
});

// 3. INTERCEPTOR: Se ejecuta antes de que salga la petición
projectApi.interceptors.request.use(
  async (config) => {
    try {
      // Leemos directamente la clave 'token' de AsyncStorage
      // (Coincide con el 'await AsyncStorage.setItem('token', ...)' del login)
      const token = await AsyncStorage.getItem('token');
      
      // Si existe, lo pegamos en el header Authorization
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error("Error inyectando token:", error);
    }
    return config;
  },
  (error) => Promise.reject(error)
);