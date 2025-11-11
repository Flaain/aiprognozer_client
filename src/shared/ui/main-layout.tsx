import { Container } from './container';
import { Navbar } from './navbar';

export const MainLayout = ({ children }: { children: React.ReactNode }) => (
    <section className='flex flex-col gap-5 min-h-dvh'>
        <Container as='div' className='grow-1'>
            {children}
        </Container>
        <Navbar />
    </section>
);