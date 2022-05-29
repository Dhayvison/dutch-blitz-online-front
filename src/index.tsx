import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

const activeLabelStyles = {
  transform: 'scale(0.85) translateY(-44px)',
};

const theme = extendTheme({
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
});

root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
