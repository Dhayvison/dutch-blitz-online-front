import * as React from 'react';
import {
  Box,
  Button,
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  Stat,
  StatLabel,
  StatNumber,
  useDisclosure,
} from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { SocketContext } from '../context/socket-context';

export function PingTrigger() {
  const socket = React.useContext(SocketContext);
  const [ping, setPing] = React.useState(0);
  const pingInterval = React.useRef<NodeJS.Timer>();
  const { isOpen, onToggle, onClose } = useDisclosure();

  const handlePingResponse = ({ date }: { date: string }) => {
    const nowDate = new Date().getTime();
    const pingDate = new Date(date).getTime();
    setPing(nowDate - pingDate);
  };

  React.useEffect(() => {
    socket.on('pong', handlePingResponse);
  }, []);

  React.useEffect(() => {
    if (isOpen) {
      pingInterval.current = setInterval(() => {
        socket.emit('ping', { date: new Date() });
      }, 1000);
    }

    return () => {
      clearInterval(pingInterval.current);
    };
  }, [isOpen]);

  return (
    <Box position='relative'>
      <Button mr={5} onClick={onToggle}>
        Ping
        <ExternalLinkIcon ml={2} />
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
            </Stat>
          </PopoverBody>
          <PopoverCloseButton />
        </PopoverContent>
      </Popover>
    </Box>
  );
}
