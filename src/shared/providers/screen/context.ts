import { createContext, useContext } from 'react';

import type { ScreenContextProps } from './types';

export const ScreenContext = createContext<ScreenContextProps>(null!);

export const useScreen = () => {
    const context = useContext(ScreenContext);

    if (!context) throw new Error('useScreen must be used within a ScreenProvider');

    return context;
};

export const useChangeScreen = () => useScreen().changeScreen;

export const useCurrentScreen = () => useScreen().currentScreen;