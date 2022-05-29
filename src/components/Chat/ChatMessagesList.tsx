import * as React from 'react';
import { Stack } from '@chakra-ui/react';
import { ChatMessage } from './ChatMessage';
import { ChatMessage as ChatMessageType } from '../../types/Chat';
import { SocketContext } from '../../context/socket-context';

export function ChatMessagesList() {
  const [messages, setMessages] = React.useState<Array<ChatMessageType>>([]);

  const socket = React.useContext(SocketContext);

  const handleReceptMessage = (message: ChatMessageType) => {
    setMessages((prevMessages) => {
      const newMessages = [...prevMessages, message];
      return newMessages;
    });
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
    socket.on('message', handleReceptMessage);
    socket.on('delete_message', handleDeleteMessage);
    socket.emit('get_messages');

    return () => {
      socket.off('message', handleReceptMessage);
      socket.off('delete_message', handleDeleteMessage);
      socket.off('get_messages');
    };
  }, [socket]);

  return (
    <Stack spacing={4}>
      {messages.map((itemMessage) => {
        return <ChatMessage key={itemMessage.id} message={itemMessage}></ChatMessage>;
      })}
    </Stack>
  );
}
