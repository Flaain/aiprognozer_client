import { useState } from 'react';

import { Player } from '@lottiefiles/react-lottie-player';

import { authApi } from '@/entities/auth';
import { useSession } from '@/entities/session';
import { useUser } from '@/entities/user';

import CatEmoji from '@/shared/lib/assets/lottie/emojies/cat.json';

import { Container } from '@/shared/ui/container';
import { LoadingButton } from '@/shared/ui/loading-button';
import { Typography } from '@/shared/ui/typography';

export const LoginError = () => {
    const [isRefetch, setIsRefetch] = useState(false);
    
    const error = useSession((state) => state.error);

    const handleRefetch = async () => {
        try {
            setIsRefetch(true);

            const { data } = await authApi.login();

            useSession.getState().actions.onSignin(data._id);
            useUser.getState().actions.onSignin(data);
        } catch (error) {
            console.error(error);
        } finally {
            setIsRefetch(false);
        }
    };

    return (
        <Container className='flex flex-col relative items-center max-w-[400px] justify-center min-h-dvh pb-[calc(var(--tg-viewport-safe-area-inset-bottom)+10px)]'>
            <Typography as='h1' variant='primary' size='4xl' weight='bold' className='mb-2'>
                Произошла ошибка
            </Typography>
            <Typography as='p' variant='secondary' size='md' weight='thin' className='max-w-[300px] text-pretty'>
                При получении профиля произошла непредвиденная ошибка. Пожалуйста, попробуйте еще раз
            </Typography>
            <Typography as='p' variant='secondary' size='md' weight='thin' className='max-w-[300px] text-pretty'>
                {JSON.stringify(error)}
            </Typography>
            <Player src={CatEmoji} loop autoplay className='max-h-[400px] max-w-[400px] size-full' />
            <LoadingButton
                cta={!isRefetch}
                onClick={handleRefetch}
                isLoading={isRefetch}
                className='py-3 h-auto mt-auto'
            >
                Попробовать еще раз
            </LoadingButton>
        </Container>
    );
};