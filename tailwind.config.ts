import { url } from 'inspector'
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
        '.custom-next-step-component-gradient': {
          background: 'linear-gradient(0deg, #2E2D3E, #2E2D3E), linear-gradient(0deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1))',
        },

        '.custom-shadow': {
          boxShadow:
            '0px 22.93361px 34.40042px 0px #555, 0px 5.7334px 22.93361px 0px rgba(255, 255, 255, 0.25) inset, 22.93361px 11.46681px 57.33402px 0px rgba(255, 255, 255, 0.70) inset, 20px 20px 50px 0px #000',
          backdropFilter: 'blur(28.667011260986328px)',
        },
        '.custom-modal-step2-drop-shadow': {
          boxShadow: '0px 19.04445px 28.56668px 0px #000, 16.60834px 16.60834px 41.52084px 0px #000', //0px 4.76111px 19.04445px 0px rgba(255, 255, 255, 0.25) inset, 19.04445px 9.52223px 47.61113px 0px rgba(255, 255, 255, 0.70) inset,
        },
        '.custom-modal-step2-inner-shadow': {
          boxShadow: '0px 0px 10.04445px 0px rgba(255, 255, 255, 0.7) inset, 19.04445px 9.52223px 4.61113px 0px rgba(255, 255, 255, 0.1) inset',
        },
        '.custom-modal-step2-gradient': {
          backgroundBlendMode: 'color-dodge',
          background: 'radial-gradient(76.28% 126.52% at -1.52% -10.89%, rgba(69, 123, 186, 0.4) 0%, rgba(174, 198, 200, 0.4) 54.17%, rgba(143, 143, 143, 0.4) 100%)',
        },
        '.custom-modal-step2-gradient1': {
          backgroundBlendMode: 'color-dodge',
          background: 'radial-gradient(76.28% 126.52% at -1.52% -10.89%, rgba(69, 123, 186, 0.4) 0%, rgba(174, 198, 200, 0.4) 54.17%, rgba(143, 143, 143, 0.4) 100%)',

        },
        '.custom-wallet-shadow': {
          boxShadow: '4.34689px 3.17345px 20px 0px rgba(255, 255, 255, 0.40) inset, 8px 8px 40px 0px rgba(0, 0, 0, 0.50)',
        },
        '.custom-wallet-gradient': {
          background: 'linear-gradient(234deg, rgba(163, 166, 255, 0.20) 4.47%, rgba(40, 75, 101, 0.20) 78.7%)',
        },
        '.custom-wallet-QR-gradient': {
          background:
            'linear-gradient(234.09deg, rgba(163, 166, 255, 0.2) 4.47%, rgba(40, 75, 101, 0.2) 78.7%), radial-gradient(57.51% 124.19% at 95.84% -18.51%, rgba(255, 255, 255, 0.4) 0%, rgba(1, 240, 255, 0.4) 54.17%, rgba(0, 0, 0, 0.4) 100%)',
        },

        '.custom-step-gradient1': {
          background: 'linear-gradient(0deg, #262D33 0%, #41454B 2%, #737176 5%, #979195 8%, #ADA4A8 11%, #B6ACB0 12%, #DFDADA 25%, #D7D2D2 27%, #C1BEBE 29%, #9F9C9C 32%, #6F6E6E 35%, #505050 36%, #535353 42%, #5E5D5D 48%, #716E6E 53%, #7C7878 55%, #8A8686 56%, #AFADAC 59%, #EAEBEA 62%, #F3F4F3 63%, #E6E4E3 72%, #DFDADA 77%, #DAD4D4 80%, #CBC4C5 83%, #B4ABAD 87%, #94878B 91%, #8A7C80 92%, #5A5356 96%, #2B2B2E 100%)',
          backgroundBlendMode: 'lighten',
        },
        '.custom-step-gradient': {
          background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.50) 0%, rgba(0, 0, 0, 0.50) 100%), #404040',
        },
        '.custom-step-shadow': {
          boxShadow: '4px 6px 2px 0px rgba(0, 0, 0, 0.30) inset',
        },
        '.custom-need-help-gradient1': {
          background: 'linear-gradient(234.09deg, rgba(163, 166, 255, 0.2) 4.47%, rgba(40, 75, 101, 0.2) 78.7%),radial-gradient(57.51% 124.19% at 95.84% -18.51%, rgba(255, 255, 255, 0.4) 0%, rgba(1, 240, 255, 0.4) 54.17%, rgba(0, 0, 0, 0.4) 100%)',
          
        },
        '.custom-need-help-gradient': {
          background: 'linear-gradient(234deg, rgba(163, 166, 255, 0.20) 4.47%, rgba(40, 75, 101, 0.20) 78.7%)',
        },
        '.custom-need-help-shadow': {
          boxShadow: '4.34689px 3.17345px 20px 0px rgba(255, 255, 255, 0.40) inset, 8px 8px 40px 0px rgba(0, 0, 0, 0.50)',
        },
        '.custom-houdini-id-gradient1': {
          backgroundBlendMode: 'lighten',
          background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.4) 0%, rgba(0, 194, 255, 0.4) 37.5%, rgba(54, 68, 191, 0.4) 100%)',
        },
        '.custom-houdini-id-gradient': {
          background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.50) 0%, rgba(0, 0, 0, 0.50) 100%), #404040',
        },
        '.custom-houdini-id-shadow': {
          boxShadow: '6px 8px 2px 0px rgba(0, 0, 0, 0.30) inset',
        },
        '.custom-industrial-counter-lockup-shadow': {
          boxShadow: '0px 1px 28.56668px 0px #555, 0px 4.76111px 19.04445px 0px rgba(255, 255, 255, 0.25) inset, 19.04445px 9.52223px 47.61113px 0px rgba(255, 255, 255, 0.70) inset, 16.60834px 16.60834px 41.52084px 0px #000',
          backdropFilter: 'blur(23.805566787719727px)',
        },
        '.custom-industrial-counter-lockup-gradient1': {
          background: 'linear-gradient(0deg, #262D33 0%, #41454B 2%, #737176 5%, #979195 8%, #ADA4A8 11%, #B6ACB0 12%, #DFDADA 25%, #D7D2D2 27%, #C1BEBE 29%, #9F9C9C 32%, #6F6E6E 35%, #505050 36%, #535353 42%, #5E5D5D 48%, #716E6E 53%, #7C7878 55%, #8A8686 56%, #AFADAC 59%, #EAEBEA 62%, #F3F4F3 63%, #E6E4E3 72%, #DFDADA 77%, #DAD4D4 80%, #CBC4C5 83%, #B4ABAD 87%, #94878B 91%, #8A7C80 92%, #5A5356 96%, #2B2B2E 100%)',
          backgroundBlendMode: 'multiply',
        },
        '.custom-industrial-background-img': {
          background: "url(../assets/Industiral_Background.png)",
          backgroundSize: "20%",
        },
        '.custom-top-background-img': {
          background: "url(../assets/background.png)",
          backgroundSize: 'cover',
        },
        '.custom-bottom-background-img': {
          background: "url(../assets/bottomBack.png)"
        },
      }
      addUtilities(newUtilities, ['responsive', 'hover'])
    },
  ],
}
export default config
