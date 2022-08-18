import * as React from 'react';
import VanillaTilt from 'vanilla-tilt';
import { Image } from '@chakra-ui/react';

export default function TiltLogo() {
  // eslint-disable-next-line
  const imageLogo = React.useRef<any>();

  React.useEffect(() => {
    VanillaTilt.init(imageLogo.current, {
      perspective: 1000,
      scale: 1,
      speed: 3000,
      transition: true,
      reset: false,
      easing: 'cubic-bezier(.03,.98,.52,.99)',
      glare: true,
      gyroscope: true,
      gyroscopeMinAngleX: -45,
      gyroscopeMaxAngleX: 45,
      gyroscopeMinAngleY: -45,
      gyroscopeMaxAngleY: 45,
    });
  }, []);

  return (
    <Image
      src='/assets/images/logo_db.png'
      alt='Dutch Blitz logo'
      h='100%'
      fit='contain'
      ref={imageLogo}
      data-tilt-full-page-listening
      data-tilt-glare
      data-tilt-max-glare='0.8'
    />
  );
}
