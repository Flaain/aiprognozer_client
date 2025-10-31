import * as React from 'react';

import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../lib/utils';

const buttonVariants = cva(
    "inline-flex items-center cursor-pointer justify-center relative gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
    {
        variants: {
            variant: {
                default: 'bg-primary-blue text-primary-white hover:bg-primary-blue/80 focus-visible:bg-primary-blue/80 focus-visible:ring-primary-blue'
            },
            size: {
                default: 'h-9 px-4 py-2 has-[>svg]:px-3',
                sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
                lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
                icon: 'size-9'
            }
        },
        defaultVariants: {
            variant: 'default',
            size: 'default'
        }
    }
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
    asChild?: boolean;
    cta?: boolean;
}

function Button({
    className,
    variant,
    size,
    cta,
    asChild = false,
    ...props
}: ButtonProps) {
    const Comp = asChild ? Slot : 'button';

    return (
        <Comp
            data-slot='button'
            className={cn(
                buttonVariants({ variant, size, className }),
                cta && 'before:absolute before:inset-0 before:rounded-md before:opacity-0 before:animate-shimmer before:bg-gradient-to-r before:from-transparent before:via-primary-white/50 before:to-transparent overflow-hidden isolate before:border-y before:border-primary-white/20'
            )}
            {...props}
        />
    );
}

export { Button, buttonVariants };
