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
import io, { Socket } from 'socket.io-client';
import { ChatIcon } from '@chakra-ui/icons';

type ChatMessageProps = {
  userName: string;
  message: string;
};

type ChatMessage = {
  id: string;
  user: ChatUser;
  text: string;
  time: number;
};

type ChatUser = {
  id: string;
  name: string;
};

function ChatMessage({ userName, message }: ChatMessageProps) {
  return (
    <Alert
      status='info'
      variant='left-accent'
      borderRadius='base'
      boxShadow='base'
      bg='transparent'
    >
      <Wrap direction='column'>
        <Badge w='min-content'>{userName}</Badge>
        <Text>{message}</Text>
      </Wrap>
    </Alert>
  );
}

function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [message, setMessage] = React.useState('');
  const [socket, setSocket] = React.useState<Socket>();
  const [messages, setMessages] = React.useState<Array<ChatMessageProps>>([]);

  function onSubmitMessage(event: any) {
    event.preventDefault();
    socket?.emit('chat message', { message });
  }

  function handleChangeMessage(event: any) {
    setMessage(event.target.value);
  }

  function handleReceptMessage(message: ChatMessageProps) {
    setMessages((currentMessages) => {
      console.log([...currentMessages, message]);
      return [...currentMessages, message];
    });
  }

  React.useEffect(() => {
    const newSocket = io(process.env.REACT_APP_API_URL as string);
    setSocket(newSocket);
    return () => {
      newSocket.close();
    };
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
              {messages.map((itemMessage) => {
                return (
                  <ChatMessage
                    key={itemMessage.message}
                    userName={itemMessage.userName}
                    message={itemMessage.message}
                  ></ChatMessage>
                );
              })}
            </Stack>
          </DrawerBody>

          <DrawerFooter>
            <Box as='form' w='100%' onSubmit={onSubmitMessage}>
              <FormControl variant='floating' id='message'>
                <Input
                  placeholder=' '
                  isRequired
                  autoComplete='off'
                  colorScheme='blue'
                  value={message}
                  onChange={(event) => handleChangeMessage(event)}
                />
                <FormLabel>Escreva sua mensagem</FormLabel>
                <InputRightElement>
                  <Button type='submit' colorScheme='blue'>
                    Enviar
                  </Button>
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
