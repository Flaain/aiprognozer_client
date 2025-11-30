import { Player } from '@lottiefiles/react-lottie-player';

import MoneyEmoji from '@/shared/lib/assets/lottie/emojies/money.json';

import { Container } from './container';
import { Typography } from './typography';

export const Loader = () => (
    <Container className='flex flex-col items-center justify-center min-h-dvh'>
        <Player src={MoneyEmoji} loop autoplay className='max-h-[200px] max-w-[200px] size-full' />
        <Typography variant='primary' size='4xl' weight='semibold' className='animate-pulse'>
            Загрузка
        </Typography>
    </Container>
);