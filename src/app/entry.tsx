import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { init as initSDK, viewport, setDebug, miniApp, initData } from '@telegram-apps/sdk-react';

import { login } from '@/features/login';

import { useTheme, getTheme } from '@/entities/theme';

import { App } from './app';

import './styles/index.css';

const init = async (debug: boolean) => {
    setDebug(debug);

    initSDK();

    if (!miniApp.isSupported()) {
        throw new Error('MINIAPP_NOT_SUPPORTED');
    }

    await viewport.mount();
    
    miniApp.mountSync();
    
    viewport.bindCssVars();
    miniApp.bindCssVars();
    
    initData.restore();

    useTheme.getState().actions.changeTheme(getTheme());

    login();
};

try {
    init(import.meta.env.VITE_ENV === 'development');

    createRoot(document.getElementById('root')!).render(
        <StrictMode>
            <App />
        </StrictMode>
    );
} catch (error) {
    console.error('Something went wrong while initializing the app', error);
}