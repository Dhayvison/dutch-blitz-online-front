import { Stat, StatHelpText, StatLabel, StatNumber } from '@chakra-ui/react';
import * as React from 'react';

type TimerProps = {
  title: string;
  text?: string;
};

export default function Timer({ title, text }: TimerProps) {
  const [seconds, setSeconds] = React.useState(0);
  
  const minutes = Math.floor(seconds / 60);
  const minutesText = minutes > 9 ? minutes.toString() : `0${minutes}`;
  const timerSeconds = seconds - minutes * 60;
  const secondsText = timerSeconds > 9 ? timerSeconds.toString() : `0${timerSeconds}`

  React.useEffect(() => {
    setInterval(() => {
      setSeconds((current) => current + 1);
    }, 1000);
  }, []);

  return (
    <Stat>
      <StatLabel>{title}</StatLabel>
      <StatNumber>{`${minutesText}:${secondsText}`}</StatNumber>
      {text && <StatHelpText>{text}</StatHelpText>} 
    </Stat>
  );
}
