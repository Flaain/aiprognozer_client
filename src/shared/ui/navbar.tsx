import { HomeIcon, StoreIcon } from '../lib/assets/icons';
import { cn } from '../lib/utils';
import { useScreen } from '../providers/screen/context';

import { Button } from './button';
import { Typography } from './typography';

export const Navbar = () => {
    const { currentScreen, changeScreen } = useScreen();

    return (
        <div className='mt-5 box-border z-50 w-full mx-auto overflow-hidden bg-primary-dark-secondary sm:shadow-lg sm:shadow-base-500/30 hover:shadow-md sm:max-w-sm sm:rounded-[14px]'>
            <div className='h-full mx-auto flex items-center'>
                <Button
                    onClick={() => changeScreen('home')}
                    variant='icon'
                    className={cn(
                        'gap-1 pt-2 px-1 grow-1 pb-[calc(max(8px,var(--tg-viewport-safe-area-inset-bottom)))] h-full box-border flex-col rounded-l-none rounded-r-xl',
                        currentScreen.name === 'home' ? 'bg-primary-blue' : 'hover:bg-primary-blue-transparent'
                    )}
                >
                    <HomeIcon className='size-6 text-primary-white' />
                    <Typography size='xs' className='transition-colors duration-200 ease-in-out'>
                        Главная
                    </Typography>
                </Button>
                <Button 
                    onClick={() => changeScreen('store')}
                    variant='icon'
                    className={cn(
                        'gap-1 pt-2 px-1 grow-1 pb-[calc(max(8px,var(--tg-viewport-safe-area-inset-bottom)))] h-full box-border flex-col rounded-r-none rounded-l-xl',
                        currentScreen.name === 'store' ? 'bg-primary-blue' : 'hover:bg-primary-blue-transparent'
                    )}
                >
                    <StoreIcon className=' text-primary-white size-6' />
                    <Typography size='xs' className='transition-colors duration-200 ease-in-out'>
                        Магазин
                    </Typography>
                </Button>
            </div>
        </div>
    );
};