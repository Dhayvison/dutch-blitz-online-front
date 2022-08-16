import * as React from 'react';
import { Heading } from '@chakra-ui/react';

export default function LogoTextGlitch() {
  return (
    <Heading className='glitch' as='h1' size='xs' noOfLines={1} mb={4}>
      <span aria-hidden='true'>Dutch Blitz</span>
      Dutch Blitz.io
      <span aria-hidden='true'>Dutch Blitz</span>
    </Heading>
  );
}
