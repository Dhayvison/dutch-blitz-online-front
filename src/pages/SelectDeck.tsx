import * as React from 'react';
import { Box, Center, HStack, useRadio, useRadioGroup } from '@chakra-ui/react';

function RadioCard(props: any) {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Center
      style={{
        aspectRatio: '1 / 1.618',
      }}
      maxW='16vw'
      overflow='hidden'
      position='relative'
      px={5}
    >
      <Box
        as='label'
        cursor='pointer'
        width='100%'
        background={props.color}
        style={{
          clipPath: 'polygon(5% 0%, 95% 0%, 100% 5%, 100% 95%, 95% 100%, 5% 100%, 0% 95%, 0% 5%)',
          transition: 'transform 0.18s ease-in-out',
        }}
        {...checkbox}
        _checked={{
          transform: 'scale(1.3)',
        }}
        _focus={{
          boxShadow: 'outline',
        }}
      >
        <input {...input} />
        <Box fontSize={300}>{props.symbol}</Box>
      </Box>
      <svg
        style={{ position: 'absolute', pointerEvents: 'none' }}
        height='100%'
        width='100%'
        viewBox='0 0 100 100'
        preserveAspectRatio='none'
      >
        <polygon
          points='0,25 25,0 75,0 100,25 100,75 75,100 25,100 0,75'
          fill='none'
          stroke='url(#paint0_linear_5_394)'
        />
        <defs>
          <linearGradient
            id='paint0_linear_5_394'
            x1='247'
            y1='300'
            x2='66'
            y2='20'
            gradientUnits='userSpaceOnUse'
          >
            <stop stopColor='#ffffff' />
            <stop offset='1' stopColor='#f5f5f5' stopOpacity='.5' />
          </linearGradient>
        </defs>
      </svg>
    </Center>
  );
}

export default function SelectDeck() {
  const options = [
    { symbol: '🦈', value: 'shark', color: 'teal.400' },
    { symbol: '🐆', value: 'cheetah', color: 'yellow.400' },
    { symbol: '🐺', value: 'wolf', color: 'pink.600' },
    { symbol: '🦅', value: 'hawk', color: 'red.600' },
  ];

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'deck',
    onChange: console.log,
  });

  const group = getRootProps();
  return (
    <Center h='100vh'>
      <HStack {...group} gap={10}>
        {options.map(({ symbol, value, color }) => {
          const radio = getRadioProps({ value });
          return <RadioCard key={value} color={color} symbol={symbol} {...radio} />;
        })}
      </HStack>
    </Center>
  );
}
