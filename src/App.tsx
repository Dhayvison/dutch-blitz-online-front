import * as React from 'react';
import {
  Box,
  Center,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Heading,
  IconButton,
  Image,
  Spinner,
  useDisclosure,
} from '@chakra-ui/react';
import { ChatIcon } from '@chakra-ui/icons';
import './App.css';
import { SocketContext, socket } from './context/socket-context';
import { ChatMessagesList } from './components/Chat/ChatMessagesList';
import { ChatForm } from './components/Chat/ChatForm';

function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <SocketContext.Provider value={socket}>
      <Heading position='absolute' className='glitch' as='h1' size='xs' noOfLines={1} m={5}>
        <span aria-hidden='true'>Dutch Blitz</span>
        Dutch Blitz.io
        <span aria-hidden='true'>Dutch Blitz</span>
      </Heading>
      <Center h='100vh' p={100}>
        <Image src='/assets/images/logo_db.png' alt='Dutch Blitz logo' h='100%' fit='contain' />
      </Center>
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
