import * as React from 'react';
import { Center, Image, Text } from '@chakra-ui/react';

export default function Table() {
  return (
    <Center h='100vh' flexDirection='column' gap='10'>
      <Text>
        3, 2, 1, <strong>Começou!</strong>
      </Text>
      <Image src='/assets/images/bmo-dancing.gif' alt='BMO Dancing' h='16' fit='contain' />
    </Center>
  );
}
