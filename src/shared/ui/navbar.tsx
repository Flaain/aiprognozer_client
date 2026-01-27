import { HomeIcon, StoreIcon, ReferralsIcon, TasksIcon } from '../lib/assets/icons';

import { NavbarButton } from './navbar-button';

export const Navbar = () => {
    return (
        <div className='mt-[10px] box-border z-50 w-full mx-auto overflow-hidden bg-primary-dark-secondary sm:shadow-lg sm:shadow-base-500/30 hover:shadow-md sm:max-w-sm sm:rounded-[14px]'>
            <div className='h-full mx-auto flex items-center'>
                <NavbarButton
                    icon={<HomeIcon className=' text-primary-white size-6' />}
                    title='Главная'
                    screen='home'
                    className='rounded-l-none rounded-r-xl'
                />
                <NavbarButton
                    icon={<ReferralsIcon className=' text-primary-white size-6' />}
                    title='Друзья'
                    screen='referrals'
                    className='rounded-xl'
                />
                <NavbarButton
                    icon={<TasksIcon className=' text-primary-white size-6' />}
                    title='Задания'
                    screen='tasks'
                    className='rounded-xl'
                />
                <NavbarButton
                    icon={<StoreIcon className=' text-primary-white size-6' />}
                    title='Магазин'
                    screen='store'
                    className='rounded-r-none rounded-l-xl'
                />
            </div>
        </div>
    );
};