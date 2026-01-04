import { Toaster } from 'sonner';

import { mainToastClassName } from '../model/constants';

import { Navbar } from './navbar';

export const MainLayout = ({ children }: { children: React.ReactNode }) => (
    <>
        <Toaster position='top-center' toastOptions={{ className: mainToastClassName }} />
        <section className='flex flex-col justify-between h-full'>
            {children}
            <Navbar />
        </section>
    </>
);