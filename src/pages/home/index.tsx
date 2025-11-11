import type { ScreenObject } from '@/shared/providers/screen/types';

import { Home } from './ui/ui';

export const HomeScreen: ScreenObject = {
    name: 'home',
    element: <Home />,
    default: true
};