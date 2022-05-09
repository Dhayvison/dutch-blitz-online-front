import * as React from 'react';
import { Button, Center, Text, useColorMode } from '@chakra-ui/react';
import socketIOClient from 'socket.io-client';

function App() {
  const { colorMode, toggleColorMode } = useColorMode();

  React.useEffect(() => {
    const socket = socketIOClient('http://localhost:3333/');
  }, []);

  return (
    <Center h='100vh' color='white'>
      <Button onClick={toggleColorMode}>{colorMode === 'light' ? '🌙' : '☀'}</Button>
    </Center>
  );
}

export default App;
