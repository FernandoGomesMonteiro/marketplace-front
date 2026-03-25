/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // <-- GARANTA QUE ESTA LINHA ESTÁ EXATAMENTE ASSIM
  ],
  theme: {
    extend: {
      // Vamos pré-configurar suas cores aqui para facilitar
      colors: {
        brand: {
          blue: '#1D4ED8', // Azul Corporativo
          orange: '#F97316', // Laranja Ação
        }
      }
    },
  },
  plugins: [],
}