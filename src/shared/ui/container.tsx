import { cn } from '../lib/utils';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    as?: React.ElementType;
}

export const Container = ({ as, children, className, ...rest }: ContainerProps) => {
    const Component = as ?? 'section';

    return (
        <Component {...rest} className={cn('px-5 pt-[calc(var(--tg-viewport-safe-area-inset-top)+var(--tg-viewport-content-safe-area-inset-top)+var(--padding-t-main))] max-w-[1064px] w-full box-border mx-auto no-scrollbar', className)}>
            {children}
        </Component>
    );
};