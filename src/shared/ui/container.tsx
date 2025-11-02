import { cn } from '../lib/utils';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

export const Container = ({ children, className, ...rest }: ContainerProps) => {
    return (
        <div {...rest} className={cn('px-5 max-w-5xl w-full box-border mx-auto min-h-dvh', className)}>
            {children}
        </div>
    );
};