import * as React from 'react';
import {
  Alert,
  Badge,
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
  Spinner,
  Stack,
  Text,
  useDisclosure,
  useToast,
  Wrap,
} from '@chakra-ui/react';
import io, { Socket } from 'socket.io-client';
import { ChatIcon } from '@chakra-ui/icons';
import './App.css';

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

function ChatMessage({ message }: { message: ChatMessage }) {
  return (
    <Alert status='info' variant='left-accent' borderRadius='base' boxShadow='base' bg='white'>
      <Wrap direction='column'>
        <Badge w='min-content'>{message.user.name}</Badge>
        <Text>{message.text}</Text>
      </Wrap>
    </Alert>
  );
}

function App() {
  const toast = useToast({ position: 'bottom-left' });
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [message, setMessage] = React.useState('');
  const [socket, setSocket] = React.useState<Socket>();
  const [messages, setMessages] = React.useState<Array<ChatMessage>>([]);

  const handleReceptMessage = (message: ChatMessage) => {
    setMessages((prevMessages) => {
      const newMessages = [...prevMessages, message];
      return newMessages;
    });

    if (!isOpen) {
      toast({
        title: message.user.name,
        render: () => <ChatMessage key={message.id} message={message}></ChatMessage>,
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleDeleteMessage = (messageID: string) => {
    setMessages((prevMessages) => {
      const newMessages = prevMessages.filter((message) => {
        return message.id !== messageID;
      });

      return newMessages;
    });
  };

  React.useEffect(() => {
    const newSocket = io(process.env.REACT_APP_API_URL as string);
    setSocket(newSocket);
    return () => {
      newSocket.close();
    };
  }, []);

  React.useEffect(() => {
    socket?.on('message', handleReceptMessage);
    socket?.on('delete_message', handleDeleteMessage);
    socket?.emit('get_messages');

    return () => {
      socket?.off('message', handleReceptMessage);
      socket?.off('delete_message', handleDeleteMessage);
    };
  }, [socket]);

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
        icon={!socket ? <Spinner /> : <ChatIcon />}
        onClick={onOpen}
        disabled={!socket}
      />

      <Drawer isOpen={isOpen} placement='right' onClose={onClose} size='md'>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Chat</DrawerHeader>

          <DrawerBody overflow='overlay'>
            <Stack spacing={4}>
              {messages.map((itemMessage) => {
                return <ChatMessage key={itemMessage.id} message={itemMessage}></ChatMessage>;
              })}
            </Stack>
          </DrawerBody>

          <DrawerFooter>
            <form
              style={{
                width: '100%',
              }}
              onSubmit={(event) => {
                event.preventDefault();
                socket?.emit('message', message);
                setMessage('');
              }}
            >
              <FormControl variant='floating' id='message'>
                <Input
                  placeholder=' '
                  isRequired
                  autoComplete='off'
                  colorScheme='blue'
                  value={message}
                  onChange={(event) => {
                    setMessage(event.target.value);
                  }}
                />
                <FormLabel>Escreva sua mensagem</FormLabel>
                <InputRightElement>
                  <Button type='submit' colorScheme='blue'>
                    Enviar
                  </Button>
                </InputRightElement>
              </FormControl>
            </form>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default App;
