import { Toaster } from 'sonner';

import { Navbar } from './navbar';

export const MainLayout = ({ children }: { children: React.ReactNode }) => (
    <>
        <Toaster
            position='top-center'
            toastOptions={{ descriptionClassName: 'text-primary-white-secondary!' }}
            className='data-[y-position=top]:top-[max(50px,calc(var(--tg-viewport-safe-area-inset-top)+var(--tg-viewport-content-safe-area-inset-top)+var(--padding-t-main)))]!'
        />
        <section className='flex flex-col justify-between h-full'>
            {children}
            <Navbar />
        </section>
    </>
);