import { Navbar } from './navbar';

export const MainLayout = ({ children }: { children: React.ReactNode }) => (
    <section className='flex flex-col justify-between h-full'>
        {children}
        <Navbar />
    </section>
);
