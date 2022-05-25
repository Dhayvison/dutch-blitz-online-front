import * as React from 'react';
import {
  Alert,
  Badge,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  InputRightElement,
  Stack,
  Text,
  useDisclosure,
  Wrap,
} from '@chakra-ui/react';
import socketIOClient from 'socket.io-client';
import { ChatIcon } from '@chakra-ui/icons';

function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  function onSubmitMessage(event: any) {
    event.preventDefault();
  }

  React.useEffect(() => {
    const socket = socketIOClient(process.env.REACT_APP_API_URL as string);
  }, []);

  return (
    <>
      <IconButton
        position='fixed'
        bottom={30}
        right={30}
        boxShadow='md'
        colorScheme='blue'
        size='lg'
        aria-label='Search database'
        icon={<ChatIcon />}
        onClick={onOpen}
      />
      <Drawer isOpen={isOpen} placement='right' onClose={onClose} size='md'>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Chat</DrawerHeader>

          <DrawerBody>
            <Stack spacing={4}>
              <Alert
                status='info'
                variant='left-accent'
                borderRadius='base'
                boxShadow='base'
                bg='transparent'
              >
                <Wrap>
                  <Badge>John Doe</Badge>
                  <Text>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus illo perspiciatis
                    voluptatibus iure fugiat debitis praesentium fuga eligendi, et dignissimos id
                    error iusto, explicabo sequi eaque earum qui assumenda doloremque?
                  </Text>
                </Wrap>
              </Alert>
            </Stack>
          </DrawerBody>

          <DrawerFooter>
            <Box as='form' w='100%' onSubmit={onSubmitMessage}>
              <FormControl variant='floating' id='message'>
                <Input placeholder=' ' isRequired autoComplete='off' />
                <FormLabel>Escreva sua mensagem</FormLabel>
                <InputRightElement width='4.5rem'>
                  <Button type='submit'>Enviar</Button>
                </InputRightElement>
              </FormControl>
            </Box>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default App;
