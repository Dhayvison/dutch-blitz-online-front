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
  useDisclosure,
} from '@chakra-ui/react';
import { ChatMessagesList } from './Chat/ChatMessagesList';
import { ChatForm } from './Chat/ChatForm';
import { ChatIcon } from '@chakra-ui/icons';

export default function ChatDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <IconButton
        className='animate__animated animate__bounceInRight'
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
      <Drawer isOpen={isOpen} placement='right' onClose={onClose} size='lg'>
        <DrawerOverlay />
        <DrawerContent bg='rgba(0, 0, 0, 0.61)' backdropFilter='blur(10px)'>
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
    </>
  );
}
