const activeLabelStyles = {
  transform: 'scale(0.85) translateY(-44px)',
};

export default {
  radii: {
    none: '0',
    sm: '0',
    base: '0',
    md: '0',
    lg: '0.2rem',
    xl: '0.3rem',
    '2xl': '0.4rem',
    '3xl': '0.5rem',
    full: '9999px',
  },
  colors: {
    transparent: 'transparent',
    black: '#140019',
    gray: {
      50: '#FBEBFF',
      100: '#F3C2FF',
      200: '#EB99FF',
      300: '#D633FF',
      400: '#C400F5',
      500: '#9300B8',
      600: '#62007A',
      700: '#410052',
      800: '#210029',
      900: '#100014',
    },
    blue: {
      50: '#EBFFFF',
      100: '#D6FFFF',
      200: '#ADFFFF',
      300: '#85FFFF',
      400: '#5CFFFF',
      500: '#1FFFFF',
      600: '#00E0E0',
      700: '#00A3A3',
      800: '#006666',
      900: '#002929',
    },
  },
  config: {
    useSystemColorMode: true,
  },
  components: {
    Form: {
      variants: {
        floating: {
          container: {
            _focusWithin: {
              label: {
                ...activeLabelStyles,
              },
            },
            'input:not(:placeholder-shown) + label, .chakra-select__wrapper + label': {
              ...activeLabelStyles,
            },
            label: {
              top: 0,
              left: 0,
              zIndex: 2,
              position: 'absolute',
              pointerEvents: 'none',
              mx: 3,
              px: 2,
              my: 2,
              transformOrigin: 'left top',
              borderRadius: '50%',
            },
          },
        },
      },
    },
  },
};
