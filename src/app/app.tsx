import { Suspense, useEffect } from 'react';

import { useShallow } from 'zustand/shallow';

import { screens } from '@/pages';

import { LoginError } from '@/widgets/login-error';
import { VerifyForm, VerifyFormSkeleton } from '@/widgets/verify-form';

import { login } from '@/features/login';

import { sessionFlagsSelector, useSession } from '@/entities/session';
import { userSelector, useUser } from '@/entities/user';

import { ScreenProvider } from '@/shared/providers/screen/provider';
import { SocketProvider } from '@/shared/providers/socket/provider';
import { Loader } from '@/shared/ui/loader';

export const App = () => {
    const { isAuthorized, isAuthInProgress } = useSession(useShallow(sessionFlagsSelector));

    const user = useUser(useShallow(userSelector));

    useEffect(() => { login() }, []);

    if (isAuthInProgress) return <Loader />;

    if (!isAuthorized) return <LoginError />;

    if (!user.isVerified) {
        return (
            <Suspense fallback={<VerifyFormSkeleton />}>
                <VerifyForm />
            </Suspense>
        );
    }

    return (
        <SocketProvider>
            <ScreenProvider screens={screens} />;
        </SocketProvider>
    );
};
