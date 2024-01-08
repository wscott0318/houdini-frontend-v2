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
            '0px 22px 34px 0px #555, 0px 5px 22px 0px rgba(255, 255, 255, 0.25) inset, 22px 11px 57px 0px rgba(255, 255, 255, 0.70) inset, 20px 20px 50px 0px #000',
          backdropFilter: 'blur(28px)',
        },
        '.custom-modal-step2-drop-shadow': {
          boxShadow: '0px 19px 28px 0px #000, 16px 16px 41px 0px #000', //0px 4px 19px 0px rgba(255, 255, 255, 0.25) inset, 19px 9px 47px 0px rgba(255, 255, 255, 0.70) inset,
        },
        '.custom-modal-step2-inner-shadow': {
          boxShadow: '0px 0px 10px 0px rgba(255, 255, 255, 0.7) inset, 19px 9px 4px 0px rgba(255, 255, 255, 0.1) inset',
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
          boxShadow: '4px 3px 20px 0px rgba(255, 255, 255, 0.40) inset, 8px 8px 40px 0px rgba(0, 0, 0, 0.50)',
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
          boxShadow: '4px 3px 20px 0px rgba(255, 255, 255, 0.40) inset, 8px 8px 40px 0px rgba(0, 0, 0, 0.50)',
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
          boxShadow: '0px 1px 28px 0px #555, 0px 4px 19px 0px rgba(255, 255, 255, 0.25) inset, 19px 9px 47px 0px rgba(255, 255, 255, 0.70) inset, 16px 16px 41px 0px #000',
          backdropFilter: 'blur(23px)',
        },
        '.custom-industrial-counter-lockup-gradient1': {
          background: 'linear-gradient(0deg, #262D33 0%, #41454B 2%, #737176 5%, #979195 8%, #ADA4A8 11%, #B6ACB0 12%, #DFDADA 25%, #D7D2D2 27%, #C1BEBE 29%, #9F9C9C 32%, #6F6E6E 35%, #505050 36%, #535353 42%, #5E5D5D 48%, #716E6E 53%, #7C7878 55%, #8A8686 56%, #AFADAC 59%, #EAEBEA 62%, #F3F4F3 63%, #E6E4E3 72%, #DFDADA 77%, #DAD4D4 80%, #CBC4C5 83%, #B4ABAD 87%, #94878B 91%, #8A7C80 92%, #5A5356 96%, #2B2B2E 100%)',
          backgroundBlendMode: 'multiply',
        },
        '.custom-industrial-background-img': {
          background: "url(../assets/Industiral_Background.png)",
          backgroundSize: "20%",
        },
        '.custom-swapbox-background-img': {
          background: 'url(../assets/Industiral_Background.png)',
          backgroundSize: '60%',
        },
        '.custom-top-background-img': {
          background: "url(../assets/background.png)",
          backgroundSize: 'cover',
        },
        '.custom-bottom-background-img': {
          background: "url(../assets/bottomBack.png)"
        },
        
        '.custom-swap-wheel-outlinear-gradient': {
          background: 'radial-gradient(#457BBA, #AEC6C8, #8F8F8F)',
          boxShadow: '0px 17px 25px 0px #555, 0px 4px 17px 0px rgba(255, 255, 255, 0.25) inset, 10px 8px 30px 0px rgba(255, 255, 255, 0.70) inset, 8px 8px 10px 0px rgba(0, 0, 0, 0.50)',
          backdropFilter: 'blur(21px)',
        },
        '.custom-swap-wheel-inner-background-gradient': {
          background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.20) 0%, rgba(66, 89, 113, 0.18) 56.25%, rgba(28, 14, 68, 0.20) 100%)',
        },
        '.custom-swap-wheel-number-pane-outborder': {
          background: 'linear-gradient(#808183, #276992, #000000)'
        },
        '.custom-swap-wheel-number-pane-innerborder': {
          background: 'linear-gradient(#94959f, #176181, #000000)'
        },
        '.custom-swap-wheel-number-pane-background': {
          background: 'linear-gradient(180deg, #060608, #4f4d71, #060608)',
          backgroundBlendMode: 'multiply'
        },
        '.custom-swap-wheel-number-pane-metalbar': {
          background: 'radial-gradient(84.41% 424.03% at 16.71% 23.08%, #FFFFFF 0%, rgba(112, 110, 110, 0) 19.79%, #FFFFFF 42.19%, #706E6E 66.67%, #000000 100%)',
        },
        '.custom-swap-modal-border1': {
          background: 'linear-gradient(157.15deg, rgba(69, 123, 186, 0.4) -36.07%, rgba(174, 198, 200, 0.4) 50.21%, rgba(143, 143, 143, 0.4) 123.22%)'
        },
        '.custom-swap-modal-border2': {
          background: 'linear-gradient(151.95deg, rgba(255, 255, 255, 0.4) -21.83%, rgba(251, 182, 47, 0.4) 20.48%, rgba(0, 0, 0, 0.4) 83.65%)'
        },
        '.custom-swap-modal-border3': {
          background: 'radial-gradient(76.28% 126.52% at -1.52% -10.89%, rgba(69, 123, 186, 0.4) 0%, rgba(174, 198, 200, 0.4) 54.17%, rgba(143, 143, 143, 0.4) 100%)'
        },
        '.custom-swap-wheel-number-metalbar-gradient1':{
          background: 'linear-gradient(0deg, #484F54 0%, #595E63 1%, #8B898D 5%, #AFA8AC 8%, #C5BBBF 11%, #CEC2C6 12%, #EEE9E7 25%, #E6E1DF 27%, #D1CCCB 29%, #AEABAA 32%, #717070 36%, #747373 42%, #7F7C7C 48%, #928D8D 53%, #9B9595 55%, #A8A3A3 56%, #CDCACA 59%, #FFF 63%, #F3F0EF 73%, #EEE9E7 77%, #E9E3E2 80%, #DCD3D4 84%, #C7BABD 88%, #AA979E 92%, #7A7076 96%, #49494F 100%)'
        },
        '.custom-swap-wheel-number-metalbar-gradient2':{
          background: 'linear-gradient(0deg, #262D33 0%, #41454B 2%, #737176 5%, #979195 8%, #ADA4A8 11%, #B6ACB0 12%, #DFDADA 25%, #D7D2D2 27%, #C1BEBE 29%, #9F9C9C 32%, #6F6E6E 35%, #505050 36%, #535353 42%, #5E5D5D 48%, #716E6E 53%, #7C7878 55%, #8A8686 56%, #AFADAC 59%, #EAEBEA 62%, #F3F4F3 63%, #E6E4E3 72%, #DFDADA 77%, #DAD4D4 80%, #CBC4C5 83%, #B4ABAD 87%, #94878B 91%, #8A7C80 92%, #5A5356 96%, #2B2B2E 100%)'
        },
        '.custom-swap-wheel-number-metalbar-gradient3':{
          background: 'linear-gradient(0deg, #262728 0%, #585557 4%, #7C7779 8%, #928B8E 10%, #9B9396 12%, #CEC5C1 25%, #C6BDB9 27%, #B0A9A6 29%, #8E8886 31%, #5D5A59 34%, #262626 36%, #262323 55%, #343131 56%, #5A5858 57%, #989696 60%, #F1F1F1 63%, #E5E2E1 68%, #CEC5C1 77%, #C8BFBB 79%, #BAAFAD 82%, #A29695 84%, #817273 87%, #574449 90%, #432E34 92%, #131013 99%, #0A0B0D 100%)'
        },
        '.custom-swap-wheel-background1': {
          background: 'var(--Recess-2, linear-gradient(180deg, rgba(0, 0, 0, 0.20) 0%, rgba(66, 89, 113, 0.18) 56.25%, rgba(28, 14, 68, 0.20) 100%))'
        },
        '.custom-sidebar-background': {
          background: 'radial-gradient(201.34% 243.13% at -147.2% -31.5%, #111010 19.27%, #2c3243 63.54%, #090808 100%)'
        },
        '.custom-sidebar-link': {
          background: 'linear-gradient(180deg, #6C5DD3 0%, #4154C9 100%)'
        },
        '.custom-QTY-button-shadow': {
          boxShadow: '0px 30px 40px 0px rgba(0, 0, 0, 0.20), 2px 4px 10px 0px rgba(0, 0, 0, 0.50)'
        },
        '.custom-QTY-button-outline': {
          background: 'linear-gradient(180deg, #FFF -2.42%, rgba(1, 240, 255, 0.20) 52.36%, rgba(255, 255, 255, 0.00) 98.71%)'
        },
        '.custom-QTA-button-hover-background': {
          background: 'var(--Proceed-button-semi-private, linear-gradient(180deg, #BCAAFF 0%, #B364D1 100%))'
        },
        '.custom-QTA-button-clicked-background': {
          background: 'linear-gradient(111deg, #CAB4FF 10.37%, #D377FF 80.96%)'
        },
        '.custom-xBlock-gold-gradient-text': {
          background:
            'linear-gradient(106deg, #FB792F 23.3%, #F3C755 97.04%, #F5C341 164.88%)',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
        },
        '.custom-xBlock-blue-gradient-text': {
          background:
            'linear-gradient(180deg, #9687FF 0%, #334AD3 100%)',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
        },
        '.custom-xBlock-purple-gradient-text': {
          background:
          'linear-gradient(180deg, #BCAAFF 0%, #B364D1 100%)',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
        },
      }
      addUtilities(newUtilities, ['responsive', 'hover'])
    },
  ],
}
export default config
