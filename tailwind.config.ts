import type { Config } from 'tailwindcss'

const config: Config = {
  mode: 'jit',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        outfit: ['var(--font-outfit)'],
        poppins: ['var(--font-poppins)'],
      },
    },
  },
  plugins: [
    function ({ addUtilities }: { addUtilities: any }) {
      const newUtilities = {
        '.gradient-text': {
          background:
            'linear-gradient(112deg, #FB792F -67.32%, #F3C755 17.72%, #F5C341 82.48%)',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
        },
        '.rainbow-text': {
          background:
            'linear-gradient(273deg, #C868A1 2.71%, #90A2FF 57.97%, #FFAD4D 115.58%)',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
        },
        '.custom-gradient': {
          background:
            'linear-gradient(180deg, rgba(163, 166, 255, 0.20) 0%, rgba(41, 152, 255, 0.20) 42.71%, rgba(40, 75, 101, 0.20) 100%)',
        },
        '.custom-shadow': {
          boxShadow:
            '0px 22.93361px 34.40042px 0px #555, 0px 5.7334px 22.93361px 0px rgba(255, 255, 255, 0.25) inset, 22.93361px 11.46681px 57.33402px 0px rgba(255, 255, 255, 0.70) inset, 20px 20px 50px 0px #000',
          backdropFilter: 'blur(28.667011260986328px)',
        },
      }
      addUtilities(newUtilities, ['responsive', 'hover'])
    },
  ],
}
export default config
