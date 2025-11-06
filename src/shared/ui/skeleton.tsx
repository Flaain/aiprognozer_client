import { cn } from '../lib/utils';

export interface AnimatedSkeletonProps extends React.HTMLAttributes<HTMLSpanElement> {
    animate?: boolean;
}

export const Skeleton = ({ animate = true, className, children, ...rest }: AnimatedSkeletonProps) => (
    <span
        {...rest}
        className={cn(
            'relative',
            animate && 'bg-primary-dark-secondary before:absolute before:inset-0 before:animate-[shimmer_3s_infinite] before:bg-gradient-to-r before:from-transparent before:via-gray-200/10 before:to-transparent overflow-hidden isolate before:border-t before:border-primary-white-secondary/30',
            className,
        )}
    >
        {children}
    </span>
);