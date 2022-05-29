import * as React from 'react';
import { Avatar, Box, Tag, TagLabel, Text } from '@chakra-ui/react';
import { ChatMessage as ChatMessageType } from '../../types/Chat';

export function ChatMessage({ message }: { message: ChatMessageType }) {
  return (
    <Box borderRadius='base' boxShadow='base'>
      <Tag>
        <Avatar size='xs' name={message.user.name} mr={2} />
        <TagLabel>{message.user.name}</TagLabel>
      </Tag>
      <Text m={3}>{message.text}</Text>
    </Box>
  );
}
