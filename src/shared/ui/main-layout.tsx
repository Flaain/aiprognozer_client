import { Navbar } from './navbar';

export const MainLayout = ({ children }: { children: React.ReactNode }) => (
    <section className='flex flex-col gap-5 min-h-dvh'>
        {children}
        <Navbar />
    </section>
);
