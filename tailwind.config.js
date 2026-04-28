/** @type {import('tailwindcss').Config} */
export default {
  content:[
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#A3E635', // 연두색
        secondary: '#22C55E', // 초록색
        'secondary-dark': '#166534', // 짙은 초록
        bglight: '#FAFAFA', // 하얀색 배경
      },
      fontFamily: {
        sans: ['Pretendard', 'sans-serif'], // 폰트는 프리텐다드 추천
      }
    },
  },
  plugins:[],
}