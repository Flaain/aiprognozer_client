import { Suspense } from 'react';

import type { ScreenObject } from '@/shared/providers/screen/types';

import { View } from './model/view';
import { StoreSkeleton } from './ui/skeleton';

export const StoreScreen: ScreenObject = {
    name: 'store',
    element: (
        <Suspense fallback={<StoreSkeleton shouldAnimate />}>
            <View />
        </Suspense>
    )
};