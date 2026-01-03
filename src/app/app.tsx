import { Suspense } from 'react';

import { useShallow } from 'zustand/shallow';

import { screens } from '@/pages';

import { LoginError } from '@/widgets/login-error';
import { VerifyForm, VerifyFormSkeleton } from '@/widgets/verify-form';

import { sessionFlagsSelector, useSession } from '@/entities/session';
import { userSelector, useUser } from '@/entities/user';

import { ScreenProvider } from '@/shared/providers/screen/provider';
import { SocketProvider } from '@/shared/providers/socket/provider';
import { Loader } from '@/shared/ui/loader';
import { MainLayout } from '@/shared/ui/main-layout';

export const App = () => {
    const { isAuthorized, isAuthInProgress } = useSession(useShallow(sessionFlagsSelector));

    const user = useUser(useShallow(userSelector));

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
            <ScreenProvider screens={screens} Layout={MainLayout} />
        </SocketProvider>
    );
};