import type { Theme } from '../model/types';

export const getTheme = (): Theme => {
    try {
        const theme = localStorage.getItem('theme');

        if (!theme || !['light', 'dark'].includes(theme)) return 'dark';

        return theme as Theme;
    } catch (error) {
        console.error(error);

        return 'dark';
    }
};