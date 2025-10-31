import { useEffect } from 'react';

import { mainButton } from '@telegram-apps/sdk-react';

import { authApi } from '@/entities/auth';
import { useSession } from '@/entities/session';
import { useUser } from '@/entities/user';

import Error400 from '@/shared/lib/assets/errors/400.png';

import { Container } from '@/shared/ui/container';
import { Typography } from '@/shared/ui/typography';

export const LoginError = () => {
    useEffect(() => {
        !mainButton.isMounted() && mainButton.mount();

        const handleRefetch = async () => {
            try {
                mainButton.setParams({
                    isEnabled: false,
                    isLoaderVisible: true,
                });
    
                const { data } = await authApi.login();

                useSession.getState().actions.on_signin(data._id);
                useUser.getState().actions.on_signin(data);
            } catch (error) {
                console.error(error);

                mainButton.setParams({
                    isEnabled: true,
                    isLoaderVisible: false,
                });
            }
        };

        mainButton.setParams({
            hasShineEffect: true,
            isEnabled: true,
            isLoaderVisible: false,
            isVisible: true,
            backgroundColor: '#155dfc',
            text: 'Попробовать еще раз'
        });

        mainButton.onClick(handleRefetch);

        return () => {
            mainButton.offClick(handleRefetch);
            mainButton.setParams({ isVisible: false });
            mainButton.unmount();
        };
    }, []);

    return (
        <Container className='flex flex-col items-center max-w-[400px] justify-center'>
            <Typography as='h1' variant='primary' size='4xl' weight='bold' className='mb-2'>
                Произошла ошибка
            </Typography>
            <Typography as='p' variant='secondary' size='md' weight='thin' className='max-w-[300px] text-pretty'>
                При получении профиля произошла непредвиденная ошибка. Пожлауйста, попробуйте еще раз
            </Typography>
            <img src={Error400} className='w-full mt-10' alt='400 error image' />
        </Container>
    );
};