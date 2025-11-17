import Error from '@/shared/lib/assets/errors/something_went_wrong.png';

import { Container } from './container';
import { Typography } from './typography';

export const NotTMA = () => {
    return (
        <Container className='flex items-center flex-col justify-center h-full'>
            <Typography as='h1' size='4xl' weight='bold'>
                Ошибка инициализации
            </Typography>
            <Typography as='p' size='xl' variant='secondary' weight='thin'>
                Приложение может быть запущено только из нашего бота в Telegram
            </Typography>
            <img src={Error} className='my-10 size-auto' alt='error image' />
            <a
                href={import.meta.env.VITE_BOT_URL}
                target='_blank'
                className='relative h-10 rounded-lg px-6 max-w-[300px] w-full whitespace-nowrap flex items-center justify-center bg-primary-blue text-primary-white hover:bg-primary-blue/80 focus-visible:bg-primary-blue/80 focus-visible:ring-primary-blue before:absolute before:inset-0 before:rounded-md before:opacity-0 before:animate-shimmer before:bg-gradient-to-r before:from-transparent before:via-primary-white/50 before:to-transparent overflow-hidden isolate before:border-y before:border-primary-white/20'
            >
                Перейти в бота
            </a>
        </Container>
    );
};