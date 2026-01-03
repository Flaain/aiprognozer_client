import { Suspense } from 'react';

import type { ScreenObject } from '@/shared/providers/screen/types';

import { View } from './model/view';
import { ReferallsSkeleton } from './ui/skeleton';

export const ReferallsScreen: ScreenObject = {
    name: 'referalls',
    element: (
        <Suspense fallback={<ReferallsSkeleton />}>
            <View />
        </Suspense>
    )
};