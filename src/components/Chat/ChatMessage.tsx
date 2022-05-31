import * as React from 'react';
import { Avatar, Box, Tag, TagLabel, Text, useColorMode, useTheme } from '@chakra-ui/react';
import { ChatMessage as ChatMessageType } from '../../types/Chat';

function MessageCaret() {
  const { colorMode } = useColorMode();
  const theme = useTheme();
  console.log();

  return (
    <Box
      style={{
        position: 'absolute',
        top: '4px',
        right: '100%',
        left: '-8px',
        display: 'block',
        width: '8px',
        height: '16px',
        pointerEvents: 'none',
        content: ' ',
        clipPath: 'polygon(0 50%, 100% 0, 100% 100%)',
        background: colorMode === 'light' ? theme.colors.gray['100'] : theme.colors.gray['600'],
      }}
    ></Box>
  );
}

export function ChatMessage({ message }: { message: ChatMessageType }) {
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, []);

  return (
    <Box position='relative' borderRadius='base' boxShadow='base' ref={messagesEndRef}>
      <MessageCaret />
      <Tag>
        <Avatar size='xs' name={message.user.name} mr={2} />
        <TagLabel>{message.user.name}</TagLabel>
      </Tag>
      <Text m={3}>{message.text}</Text>
    </Box>
  );
}
