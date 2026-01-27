import { Suspense } from 'react';

import type { ScreenObject } from '@/shared/providers/screen/types';

import { View } from './model/view';
import { TasksSkeleton } from './ui/skeleton';

export const TasksScreen: ScreenObject = {
    name: 'tasks',
    element: (
        <Suspense fallback={<TasksSkeleton />}>
            <View />
        </Suspense>
    )
};