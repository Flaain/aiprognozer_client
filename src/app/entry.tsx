import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import {
    init as initSDK,
    viewport,
    setDebug,
    miniApp,
    initData,
    isTMA,
    retrieveLaunchParams
} from '@telegram-apps/sdk-react';

import { login } from '@/features/login';

import { useTheme, getTheme } from '@/entities/theme';

import { NotTMA } from '@/shared/ui/not-tma';

import { App } from './app';

import './styles/index.css';

const init = async (debug: boolean) => {
    if (isTMA()) {
        setDebug(debug);

        initSDK();

        if (!miniApp.isSupported()) {
            throw new Error('MINIAPP_NOT_SUPPORTED');
        }

        await viewport.mount();

        if (retrieveLaunchParams().tgWebAppPlatform !== 'tdesktop' && viewport.requestFullscreen.isAvailable()) {
            await viewport.requestFullscreen();
        } else {
            document.documentElement.style.setProperty('--pt-main', '0px');
        }

        miniApp.mountSync();

        viewport.bindCssVars();
        miniApp.bindCssVars();

        initData.restore();

        useTheme.getState().actions.changeTheme(getTheme());

        login(retrieveLaunchParams().tgWebAppStartParam);
    } else {
        console.warn(
            `Приложение работает только внутри Telegram. Пожалуйста, откройте приложение из нашего бота - ${
                import.meta.env.VITE_BOT_URL
            }`
        );
    }
};

try {
    init(import.meta.env.VITE_ENV === 'development');

    createRoot(document.getElementById('root')!).render(<StrictMode>{isTMA() ? <App /> : <NotTMA />}</StrictMode>);
} catch (error) {
    console.error('Something went wrong while initializing the app', error);
}