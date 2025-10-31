import { useShallow } from 'zustand/shallow';

import { Home } from '@/pages/home';

import { LoginError } from '@/widgets/login-error';
import { VerificationForm } from '@/widgets/verification-form';

import { useSession, sessionFlagsSelector } from '@/entities/session';
import { useUser, userSelector } from '@/entities/user';

import { Loader } from '@/shared/ui/loader';

export const App = () => {
    const { is_auth_in_progress, is_authorized } = useSession(useShallow(sessionFlagsSelector));

    const user = useUser(useShallow(userSelector));

    if (is_auth_in_progress) return <Loader />;

    if (!is_authorized) return <LoginError />;

    return user.isVerified ? <Home /> : <VerificationForm />;
};