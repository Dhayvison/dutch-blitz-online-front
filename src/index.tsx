import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import themeConfig from './theme-config';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

const theme = extendTheme(themeConfig);

root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
