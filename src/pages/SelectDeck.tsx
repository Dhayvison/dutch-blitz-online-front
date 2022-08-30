import * as React from 'react';
import { Box, Center, HStack, RadioProps, useRadio, useRadioGroup } from '@chakra-ui/react';
import Timer from '../components/Timer';

type DeckRadioCardProps = {
  color: string;
  symbol: string;
  radioProps: RadioProps;
};

function DeckRadioCard({ color, symbol, radioProps }: DeckRadioCardProps) {
  const { getInputProps, getCheckboxProps } = useRadio(radioProps);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Center
      className='animate__animated animate__flipInY'
      style={{
        aspectRatio: '1 / 1.618',
      }}
      w='16vw'
      px={5}
    >
      <Box
        as='label'
        cursor='pointer'
        w='100%'
        bg={color}
        style={{
          clipPath: 'polygon(5% 0%, 95% 0%, 100% 5%, 100% 95%, 95% 100%, 5% 100%, 0% 95%, 0% 5%)',
          transition: 'transform 0.18s ease-in-out',
        }}
        {...checkbox}
        _checked={{
          transform: 'scale(1.3)',
        }}
      >
        <input {...input} />
        <Box fontSize={300}>{symbol}</Box>
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
    { symbol: '🦈', value: 'shark', color: 'teal.400', isInvalid: true },
    { symbol: '🐆', value: 'cheetah', color: 'yellow.400', isInvalid: true },
    { symbol: '🐺', value: 'wolf', color: 'pink.600', isInvalid: true },
    { symbol: '🦅', value: 'hawk', color: 'red.600', isInvalid: true },
  ];

  const handleSelectDeck = (deckName: string) => {
    console.log(deckName);
  };

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'deck',
    onChange: handleSelectDeck,
  });

  const group = getRootProps();

  return (
    <Center h='100vh'>
      <Box
        boxShadow='base'
        className='animate__animated animate__slideInDown'
        position='fixed'
        top={0}
        px={40}
        py={5}
        bg='purple.600'
        style={{
          textAlign: 'center',
          clipPath: 'polygon(29% 100%, 75% 100%, 100% 0, 0 0)',
        }}
      >
        <Timer title='Aguardando jogadores...'></Timer>
      </Box>
      <HStack {...group} gap={10}>
        {options.map(({ symbol, value, color }) => {
          const radio = getRadioProps({ value });
          return <DeckRadioCard key={value} color={color} symbol={symbol} radioProps={radio} />;
        })}
      </HStack>
      <Box
        className='animate__animated animate__fadeInUpBig'
        w='75%'
        h='100px'
        position='fixed'
        bottom={0}
        bg='purple.700'
        style={{
          clipPath: 'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)',
        }}
      ></Box>
    </Center>
  );
}
