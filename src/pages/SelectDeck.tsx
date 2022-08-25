import * as React from 'react';
import { Box, Center, HStack, useRadio, useRadioGroup } from '@chakra-ui/react';

function RadioCard(props: any) {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as='label'>
      <input {...input} />
      <Box
        {...checkbox}
        cursor='pointer'
        borderWidth='1px'
        borderRadius='md'
        boxShadow='md'
        _checked={{
          bg: 'teal.600',
          color: 'white',
          borderColor: 'teal.600',
        }}
        _focus={{
          boxShadow: 'outline',
        }}
        px={5}
        py={3}
      >
        {props.children}
      </Box>
    </Box>
  );
}

export default function SelectDeck() {
  const options = [
    {symbol: '🦈', value: 'shark'},
    {symbol: '🐆', value: 'cheetah'},
    {symbol: '🐺', value: 'wolf'},
    {symbol: '🦅', value: 'hawk'},
  ];

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'deck',
    onChange: console.log,
  });

  const group = getRootProps();
  return (
    <Center h='100vh'>
      <HStack {...group}>
        {options.map(({symbol,value}) => {
          const radio = getRadioProps({ value });
          return (
            <RadioCard key={value} {...radio}>
              {symbol}
            </RadioCard>
          );
        })}
      </HStack>
    </Center>
  );
}
