import type { ReactNode } from 'react';

import { hapticFeedbackImpactOccurred } from '@telegram-apps/sdk-react';

import { cn } from '../lib/utils';
import { useScreen } from '../providers/screen/context';

import { Button } from './button';
import { Typography } from './typography';

export const NavbarButton = ({ icon, screen, title, className, ...rest }: React.HTMLAttributes<HTMLButtonElement> & { icon: ReactNode; title: string; screen: string }) => {
    const { currentScreen, changeScreen } = useScreen();

    const handleChangeScreen = (screen: string) => {
        changeScreen(screen);
        hapticFeedbackImpactOccurred('soft');
    };

    return (
        <Button
            {...rest}
            onClick={() => handleChangeScreen(screen)}
            variant='icon'
            className={cn(
                'gap-1 pt-2 px-1 grow-1 pb-[calc(max(8px,var(--tg-viewport-safe-area-inset-bottom)))] h-full box-border flex-col',
                currentScreen.name === screen ? 'bg-primary-blue' : 'hover:bg-primary-blue-transparent',
                className
            )}
        >
            {icon}
            <Typography size='xs' className='transition-colors duration-200 ease-in-out'>
                {title}
            </Typography>
        </Button>
    );
};