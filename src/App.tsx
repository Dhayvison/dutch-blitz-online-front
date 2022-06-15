import * as React from 'react';
import {
  Box,
  Button,
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
  Tag,
  useDisclosure,
} from '@chakra-ui/react';
import { ChatIcon, CheckIcon, CloseIcon } from '@chakra-ui/icons';
import { SocketContext, socket } from './context/socket-context';
import { ChatMessagesList } from './components/Chat/ChatMessagesList';
import { ChatForm } from './components/Chat/ChatForm';
import VanillaTilt from 'vanilla-tilt';
import { useDebouncedCallback } from 'use-debounce';
import { PingTrigger } from './components/PingTrigger';
import Timer from './components/Timer';

import './App.css';
import 'animate.css';

function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  // eslint-disable-next-line
  const imageLogo = React.useRef<any>();

  React.useEffect(() => {
    VanillaTilt.init(imageLogo.current, {
      perspective: 1000,
      scale: 1,
      speed: 3000,
      transition: true,
      reset: false,
      easing: 'cubic-bezier(.03,.98,.52,.99)',
      glare: true,
      gyroscope: true,
      gyroscopeMinAngleX: -45,
      gyroscopeMaxAngleX: 45,
      gyroscopeMinAngleY: -45,
      gyroscopeMaxAngleY: 45,
    });
  }, []);

  const [nickname, setNickname] = React.useState('');
  const [showChat, setShowChat] = React.useState(false);
  const [userIsReady, setUserIsReady] = React.useState(false);
  const [readyPlayers, setReadyPlayer] = React.useState(0);

  const setSocketUsername = useDebouncedCallback(() => {
    socket?.emit('user_name', nickname);
    localStorage.setItem('nickname', nickname);
    setShowChat(true);
  }, 1000);

  const handleSetUserReady = () => {
    socket?.emit('user_ready', !userIsReady);
    setUserIsReady((current) => !current);
  };

  const handleReadyPlayers = (players: number) => {
    setReadyPlayer(players);
  };

  React.useEffect(() => {
    const storageNickname = localStorage.getItem('nickname');
    setNickname(storageNickname ?? '');
    setSocketUsername();
    socket.on('ready_players', handleReadyPlayers);
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      <Box position='absolute' m={5}>
        <Heading className='glitch' as='h1' size='xs' noOfLines={1} mb={4}>
          <span aria-hidden='true'>Dutch Blitz</span>
          Dutch Blitz.io
          <span aria-hidden='true'>Dutch Blitz</span>
        </Heading>
        <PingTrigger></PingTrigger>
      </Box>
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
        {nickname && showChat && (
          <>
            <Button
              className='animate__animated animate__backInUp'
              rightIcon={userIsReady ? <CloseIcon /> : <CheckIcon />}
              size='lg'
              variant={userIsReady ? 'outline' : 'solid'}
              colorScheme={userIsReady ? 'pink' : 'teal'}
              px='10'
              py='4'
              onClick={handleSetUserReady}
            >
              {userIsReady ? 'Cancelar' : 'Começar'}
            </Button>
            <Tag variant='solid' colorScheme='teal'>
              {readyPlayers} {readyPlayers === 1 ? 'jogador pronto': 'jogadores prontos'}
            </Tag>
          </>
        )}
        {userIsReady && (
          <Timer
            title='Aguardando jogadores...'
            text='A partida iniciará automaticamente quando todos estiverem prontos'
          ></Timer>
        )}
      </Center>

      {nickname && showChat && (
        <IconButton
          className='animate__animated animate__bounceInRight'
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
