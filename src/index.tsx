import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  Button,
  Center,
  ChakraProvider,
  Code,
  extendTheme,
  Heading,
  Link,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react';
import themeConfig from './theme-config';
import App from './App';
import { ErrorBoundary } from 'react-error-boundary';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

const theme = extendTheme(themeConfig);

type ErrorF = {
  message: string;
};

function ErrorFallback({
  error,
  resetErrorBoundary,
}: {
  error: ErrorF;
  resetErrorBoundary: () => void;
}) {
  const toast = useToast({ position: 'bottom-left', isClosable: true });
  const handleClearPageData = () => {
    localStorage.clear();
    toast({
      title: 'Feito',
      description: 'Os dados da página foram redefinidos.',
      status: 'success',
    });
    resetErrorBoundary();
  };
  return (
    <Center bg='black' h='100vh'>
      <Stack spacing={6}>
        <Heading className='glitch' as='h1' size='4xl' noOfLines={1}>
          <span aria-hidden='true'>500</span>
          500
          <span aria-hidden='true'>500</span>
        </Heading>
        <Text fontSize='6xl' noOfLines={1}>
          Oh não! Tivemos um erro inesperado
        </Text>
        <Code colorScheme='red'>{error.message}</Code>
        <Text> Aqui estão algumas ações que podem ajudá-lo:</Text>
        <Stack direction='row' spacing={4} align='center'>
          <Button onClick={resetErrorBoundary} variant='solid'>
            Tentar novamente
          </Button>
          <Button onClick={handleClearPageData} variant='ghost'>
            Limpar dados de navegação
          </Button>
          <Link href='/' variant='outline'>
            Ir para o início
          </Link>
        </Stack>
      </Stack>
    </Center>
  );
}

root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <App />
      </ErrorBoundary>
    </ChakraProvider>
  </React.StrictMode>
);
