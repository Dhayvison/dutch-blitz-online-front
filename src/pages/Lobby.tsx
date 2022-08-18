import * as React from 'react';
import { Box, Button, Center, FormControl, Input, Progress, Tag } from '@chakra-ui/react';
import { CheckIcon, CloseIcon } from '@chakra-ui/icons';
import { useDebouncedCallback } from 'use-debounce';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from 'react-use-storage';
import { SocketContext, socket } from '../context/socket-context';
import { PingTrigger } from '../components/PingTrigger';
import Timer from '../components/Timer';
import LogoTextGlitch from '../components/LogoTextGlitch';
import TiltLogo from '../components/TiltLogo';
import ChatDrawer from '../components/ChatDrawer';

export default function Lobby() {
  const navigate = useNavigate();
  const [nickname, setNickname] = useLocalStorage<string>('nickname');
  const [userIsReady, setUserIsReady] = React.useState(false);
  const [readyPlayers, setReadyPlayer] = React.useState(0);

  const setSocketUsername = useDebouncedCallback(() => {
    socket?.emit('user_name', nickname);
  }, 1000);

  const handleSetUserReady = () => {
    socket?.emit('user_ready', !userIsReady);
    setUserIsReady((current) => !current);
  };

  const handleReadyPlayers = (players: number) => {
    setReadyPlayer(players);
  };

  const handleChangeNickname = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(event.target.value);
  };

  React.useEffect(() => {
    socket.on('players', handleReadyPlayers);
    socket.on('start_game', () => {
      navigate('/game', { replace: true });
    });
  }, []);

  React.useEffect(() => {
    setSocketUsername();
  }, [nickname]);

  return (
    <SocketContext.Provider value={socket}>
      <Box position='absolute' m={5}>
        <LogoTextGlitch />
        <PingTrigger />
      </Box>
      <Center h='100vh' p={100} overflow='hidden' flexDirection='column' bg='black'>
        <TiltLogo />
        <FormControl variant='floating' id='nickname' mb={10} w='75%' maxW={500}>
          <Input
            isRequired
            placeholder='Nickname'
            value={nickname}
            onChange={handleChangeNickname}
            variant='flushed'
            size='lg'
            spellCheck='false'
            fontWeight='bold'
            fontSize='2xl'
          />
          {nickname && <Progress size='xs' isIndeterminate />}
        </FormControl>
        {nickname && (
          <>
            <Button
              className='animate__animated animate__backInUp'
              rightIcon={userIsReady ? <CloseIcon /> : <CheckIcon />}
              size='lg'
              variant={userIsReady ? 'outline' : 'solid'}
              colorScheme={userIsReady ? 'pink' : 'teal'}
              px='10'
              py='4'
              onClick={handleSetUserReady}
            >
              {userIsReady ? 'Cancelar' : 'Começar'}
            </Button>
            <Tag className='animate__animated animate__backInUp' variant='solid' colorScheme='teal'>
              {readyPlayers} {readyPlayers === 1 ? 'jogador pronto' : 'jogadores prontos'}
            </Tag>
          </>
        )}
        {userIsReady && (
          <Timer
            title='Aguardando jogadores...'
            text='A partida iniciará automaticamente quando todos estiverem prontos'
          ></Timer>
        )}
      </Center>

      {nickname && <ChatDrawer />}
    </SocketContext.Provider>
  );
}
