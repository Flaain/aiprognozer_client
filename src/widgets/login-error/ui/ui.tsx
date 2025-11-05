import { useState } from 'react';

import { authApi } from '@/entities/auth';
import { useSession } from '@/entities/session';
import { useUser } from '@/entities/user';

import Error400 from '@/shared/lib/assets/errors/400.png';

import { Container } from '@/shared/ui/container';
import { LoadingButton } from '@/shared/ui/loading-button';
import { Typography } from '@/shared/ui/typography';

export const LoginError = () => {
    const [isRefetch, setIsRefetch] = useState(false);

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
        <Container className='flex flex-col relative items-center max-w-[400px] justify-center'>
            <Typography as='h1' variant='primary' size='4xl' weight='bold' className='mb-2'>
                Произошла ошибка
            </Typography>
            <Typography as='p' variant='secondary' size='md' weight='thin' className='max-w-[300px] text-pretty'>
                При получении профиля произошла непредвиденная ошибка. Пожалуйста, попробуйте еще раз
            </Typography>
            <img src={Error400} className='w-full mt-10' alt='400 error image' />
            <LoadingButton
                cta={!isRefetch}
                onClick={handleRefetch}
                isLoading={isRefetch}
                className='sticky bottom-0 mt-auto'
            >
                Попробовать еще раз
            </LoadingButton>
        </Container>
    );
};