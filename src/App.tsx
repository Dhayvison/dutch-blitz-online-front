import * as React from 'react';
import {
  Center,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  Heading,
  IconButton,
  Image,
  Input,
  Progress,
  Spinner,
  useDisclosure,
} from '@chakra-ui/react';
import { ChatIcon } from '@chakra-ui/icons';
import './App.css';
import { SocketContext, socket } from './context/socket-context';
import { ChatMessagesList } from './components/Chat/ChatMessagesList';
import { ChatForm } from './components/Chat/ChatForm';
import VanillaTilt from 'vanilla-tilt';
import { useDebouncedCallback } from 'use-debounce';

function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  // eslint-disable-next-line
  const imageLogo = React.useRef<any>();

  React.useEffect(() => {
    VanillaTilt.init(imageLogo.current, {
      max: 10,
      perspective: 1000,
      scale: 1,
      speed: 300,
      transition: true,
      reset: false,
      easing: 'cubic-bezier(.03,.98,.52,.99)',
      glare: true,
      gyroscope: true,
    });
  }, []);

  const [nickname, setNickname] = React.useState('');
  const [showChat, setShowChat] = React.useState(false);

  const setSocketUsername = useDebouncedCallback(() => {
    socket?.emit('user_name', nickname);
    localStorage.setItem('nickname', nickname);
    setShowChat(true);
  }, 1000);

  React.useEffect(() => {
    const storageNickname = localStorage.getItem('nickname');
    setNickname(storageNickname ?? '');
    setSocketUsername();
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      <Heading position='absolute' className='glitch' as='h1' size='xs' noOfLines={1} m={5}>
        <span aria-hidden='true'>Dutch Blitz</span>
        Dutch Blitz.io
        <span aria-hidden='true'>Dutch Blitz</span>
      </Heading>
      <Center h='100vh' p={100} overflow='hidden' flexDirection='column' bg='black'>
        <Image
          src='/assets/images/logo_db.png'
          alt='Dutch Blitz logo'
          h='100%'
          fit='contain'
          ref={imageLogo}
          data-tilt-full-page-listening
          data-tilt-glare
          data-tilt-max-glare='0.8'
        />
        <FormControl variant='floating' id='nickname' mb={10} w='75%' maxW={500}>
          <Input
            isRequired
            placeholder='Nickname'
            colorScheme='blue'
            value={nickname}
            onChange={(event) => {
              setNickname(event.target.value);
              setSocketUsername();
            }}
            variant='flushed'
            size='lg'
            spellCheck='false'
            fontWeight='bold'
            fontSize='2xl'
          />
          {nickname && showChat && <Progress size='xs' isIndeterminate />}
        </FormControl>
      </Center>

      {nickname && showChat && (
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
      )}

      <Drawer isOpen={isOpen} placement='right' onClose={onClose} size='lg'>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Chat</DrawerHeader>

          <DrawerBody overflow='overlay'>
            <ChatMessagesList />
          </DrawerBody>

          <DrawerFooter mt={4}>
            <ChatForm />
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </SocketContext.Provider>
  );
}

export default App;
