import { Stat, StatHelpText, StatLabel, StatNumber } from '@chakra-ui/react';
import * as React from 'react';

type TimerProps = {
  title: string;
  text: string;
};

export default function Timer({ title, text }: TimerProps) {
  const [seconds, setSeconds] = React.useState(0);

  React.useEffect(() => {
    setInterval(() => {
      setSeconds((current) => current + 1);
    }, 1000);
  }, []);

  return (
    <Stat
      className='animate__animated animate__fadeIn'
      maxW='25%'
      position='fixed'
      bottom={30}
      left={30}
    >
      <StatLabel>{title}</StatLabel>
      <StatNumber>{seconds} s</StatNumber>
      <StatHelpText>{text}</StatHelpText>
    </Stat>
  );
}
