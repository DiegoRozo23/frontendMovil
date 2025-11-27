import NetInfo from '@react-native-community/netinfo';
import { QueryClient, focusManager, onlineManager } from '@tanstack/react-query';
import { useEffect } from 'react';
import { AppState, AppStateStatus, Platform } from 'react-native';

// 1. Configuración de reconexión a internet
onlineManager.setEventListener((setOnline) => {
  return NetInfo.addEventListener((state) => {
    setOnline(!!state.isConnected);
  });
});

// 2. Configuración de foco (cuando la app pasa de segundo plano a primer plano)
function onAppStateChange(status: AppStateStatus) {
  if (Platform.OS !== 'web') {
    focusManager.setFocused(status === 'active');
  }
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2, // Reintentar 2 veces si falla
      refetchOnWindowFocus: true, // Refrescar al volver a la app
    },
  },
});

// Hook para activar los listeners en el layout
export function useReactQueryDevTools() {
  useEffect(() => {
    const subscription = AppState.addEventListener('change', onAppStateChange);
    return () => subscription.remove();
  }, []);
}