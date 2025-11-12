import { Container } from "./container";
import { Typography } from "./typography";

export const Loader = () => (
    <Container className='flex items-center justify-center min-h-dvh'>
        <Typography variant="primary" size="4xl" weight="semibold" className="animate-pulse">Загрузка</Typography>
    </Container>
);