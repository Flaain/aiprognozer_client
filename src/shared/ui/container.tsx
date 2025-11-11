import { cn } from '../lib/utils';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    as?: React.ElementType;
}

export const Container = ({ as, children, className, ...rest }: ContainerProps) => {
    const Component = as ?? 'section';

    return (
        <Component {...rest} className={cn('px-5 max-w-[1064px] w-full box-border mx-auto pb-(--tg-viewport-safe-area-inset-bottom) pt-(--tg-viewport-safe-area-inset-top)', className)}>
            {children}
        </Component>
    );
};