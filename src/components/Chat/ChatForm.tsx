import * as React from 'react';
import { Button, FormControl, FormLabel, Input, InputRightElement } from '@chakra-ui/react';
import { SocketContext } from '../../context/socket-context';

export function ChatForm() {
  const [message, setMessage] = React.useState('');
  const socket = React.useContext(SocketContext);

  return (
    <form
      style={{
        width: '100%',
      }}
      onSubmit={(event) => {
        event.preventDefault();
        socket?.emit('message', message);
        setMessage('');
      }}
    >
      <FormControl variant='floating' id='message'>
        <Input
          autoFocus
          placeholder=' '
          isRequired
          autoComplete='off'
          colorScheme='blue'
          value={message}
          onChange={(event) => {
            setMessage(event.target.value);
          }}
        />
        <FormLabel>Escreva sua mensagem</FormLabel>
        <InputRightElement>
          <Button type='submit' colorScheme='blue'>
            Enviar
          </Button>
        </InputRightElement>
      </FormControl>
    </form>
  );
}
