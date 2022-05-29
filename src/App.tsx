import * as React from 'react';
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
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
