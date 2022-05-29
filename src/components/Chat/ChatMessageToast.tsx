import * as React from 'react';
import { useToast } from '@chakra-ui/react';
import { SocketContext } from '../../context/socket-context';
import { ChatMessage as ChatMessageType } from '../../types/Chat';
import { ChatMessage } from './ChatMessage';

export function ChatMessageToast() {
  const toast = useToast({ position: 'bottom-left' });
  const socket = React.useContext(SocketContext);

  const handleReceptMessage = (message: ChatMessageType) => {
    toast({
      title: message.user.name,
      render: () => <ChatMessage key={message.id} message={message}></ChatMessage>,
      duration: 3000,
      isClosable: true,
    });
  };

  React.useEffect(() => {
    socket.on('message', handleReceptMessage);

    return () => {
      socket.off('message', handleReceptMessage);
    };
  }, [socket]);
}
