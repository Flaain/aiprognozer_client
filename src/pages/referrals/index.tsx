import { Suspense } from 'react';

import type { ScreenObject } from '@/shared/providers/screen/types';

import { View } from './model/view';
import { ReferralsSkeleton } from './ui/skeleton';

export const ReferralsScreen: ScreenObject = {
    name: 'referrals',
    element: (
        <Suspense fallback={<ReferralsSkeleton />}>
            <View />
        </Suspense>
    )
};