import * as React from 'react';
import { Avatar, Box, Tag, TagLabel, Text } from '@chakra-ui/react';
import { ChatMessage as ChatMessageType } from '../../types/Chat';

export function ChatMessage({ message }: { message: ChatMessageType }) {
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, []);

  return (
    <Box borderRadius='base' boxShadow='base' ref={messagesEndRef}>
      <Tag>
        <Avatar size='xs' name={message.user.name} mr={2} />
        <TagLabel>{message.user.name}</TagLabel>
      </Tag>
      <Text m={3}>{message.text}</Text>
    </Box>
  );
}
