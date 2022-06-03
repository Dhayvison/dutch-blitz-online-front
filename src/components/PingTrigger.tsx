import * as React from 'react';
import {
  Box,
  Button,
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  Stat,
  StatArrow,
  StatHelpText,
  StatLabel,
  StatNumber,
  useDisclosure,
} from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { SocketContext } from '../context/socket-context';

export function PingTrigger() {
  const socket = React.useContext(SocketContext);

  const { isOpen, onToggle, onClose } = useDisclosure();

  const pingInterval = React.useRef<NodeJS.Timer>();
  const lastPing = React.useRef(0);
  const [ping, setPing] = React.useState(0);

  const handlePingResponse = ({ date }: { date: string }) => {
    const nowDate = new Date().getTime();
    const pingDate = new Date(date).getTime();
    lastPing.current = ping;
    setPing(nowDate - pingDate);
  };

  React.useEffect(() => {
    socket.on('pong', handlePingResponse);

    pingInterval.current = setInterval(() => {
      socket.emit('ping', { date: new Date() });
    }, 3000);

    return () => {
      socket.off('pong', handlePingResponse);
      clearInterval(pingInterval.current);
    };
  }, []);

  return (
    <Box position='relative'>
      <Button mr={5} onClick={onToggle}>
        Ping
        <ExternalLinkIcon ml={2}></ExternalLinkIcon>
      </Button>
      <Popover
        returnFocusOnClose={false}
        isOpen={isOpen}
        onClose={onClose}
        placement='right'
        closeOnBlur={true}
      >
        <PopoverContent>
          <PopoverBody>
            <Stat>
              <StatLabel>Enviando...</StatLabel>
              <StatNumber>{ping} ms</StatNumber>
              <StatHelpText>
                <StatArrow type={ping > lastPing.current ? 'increase' : 'decrease'} />
                {ping > 0 ? ((lastPing.current / ping) * 100).toFixed(2) : 0} %
              </StatHelpText>
            </Stat>
          </PopoverBody>
          <PopoverCloseButton />
        </PopoverContent>
      </Popover>
    </Box>
  );
}
