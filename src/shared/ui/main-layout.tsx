import { Toaster } from 'sonner';

import { mainToastClassName } from '../model/constants';

import { Navbar } from './navbar';

export const MainLayout = ({ children }: { children: React.ReactNode }) => (
    <section className='flex flex-col justify-between h-full'>
        <Toaster  position='top-center' toastOptions={{ className: mainToastClassName }} />
        {children}
        <Navbar />
    </section>
);