import { useState } from 'react';

import { ScreenContext } from './context';
import type { ChangeScreenOptions, Screen, Screens } from './types';

export const ScreenProvider = ({ screens }: { screens: Screens }) => {
    const { 0: currentScreen, 1: setCurrentScreen } = useState<Screen>(() => {
        const defaultScreen = screens.find((screen) => screen.default);

        if (!defaultScreen) throw new Error('Default screen not found. Please provide default screen.');

        return defaultScreen;
    });

    const changeScreen = (name: string, options?: ChangeScreenOptions) => {
        if (currentScreen.name === name) return;

        const screen = screens.find((screen) => screen.name === name);

        if (!screen) throw new Error(`Screen with specified name "${name}" not found.`);

        setCurrentScreen({ ...screen, ...options });
    };

    return (
        <ScreenContext.Provider value={{ currentScreen, changeScreen }}>{currentScreen.element}</ScreenContext.Provider>
    );
};