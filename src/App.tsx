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
  Heading,
  IconButton,
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
      <Center h='100vh' w='100%'>
        <Heading className='glitch' textAlign='center' as='h1' size='4xl' noOfLines={2}>
          <span aria-hidden='true'>Dutch Blitz</span>
          Dutch Blitz.io
          <span aria-hidden='true'>Dutch Blitz</span>
        </Heading>
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

      <Drawer isOpen={isOpen} placement='right' onClose={onClose} size='md'>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Chat</DrawerHeader>

          <DrawerBody overflow='overlay'>
            <ChatMessagesList />
          </DrawerBody>

          <DrawerFooter>
            <ChatForm />
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </SocketContext.Provider>
  );
}

export default App;
