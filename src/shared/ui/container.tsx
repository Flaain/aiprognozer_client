import { cn } from '../lib/utils';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    as?: React.ElementType;
}

export const Container = ({ as, children, className, ...rest }: ContainerProps) => {
    const Component = as ?? 'section';

    return (
        <Component {...rest} className={cn('px-5 max-w-[1064px] w-full box-border mx-auto', className)}>
            {children}
        </Component>
    );
};