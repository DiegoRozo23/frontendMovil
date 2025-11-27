/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",,
    "./components/**/*.{js,jsx,ts,tsx}",
    "./share/components/**/*.{js,jsx,ts,tsx}",
    "./presentation/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: { 
        // Nombres semánticos basados en tu diseño
        primary: '#f4f4e4',   // Fondo crema
        secondary: '#143c4c', // Texto azul oscuro/petróleo
        accent: '#24548c',    // Botón azul (Registrarse)
        highlight: '#dcac54', // Botón dorado (Iniciar Sesión)
        'text-light': '#f4f4e3' // Texto sobre botón azul
      },
      fontFamily: {
        manrope: ['Manrope-Regular'],
        bold: ['Manrope-Bold'],       // Usaremos clase 'font-bold' personalizada
        extra: ['Manrope-ExtraBold'], // Usaremos clase 'font-extra'
       }
    },
  },
  plugins: [],
}

