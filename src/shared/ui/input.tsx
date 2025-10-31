import { forwardRef } from 'react';

import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>, VariantProps<typeof inputVariants> {}

const inputVariants = cva(
    '[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none box-border transition-all duration-200 ease-in-out flex w-full outline-none disabled:cursor-not-allowed disabled:opacity-50 focus:placeholder:opacity-0 placeholder:transition-opacity placeholder:duration-300 placeholder:ease-in-out',
    {
        variants: {
            variant: {
                primary: 'bg-primary-dark-secondary text-primary-white ring-primary-white-secondary/50 caret-primary-white font-normal peer border border-solid border-primary-white-secondary/50',
                secondary: 'bg-transparent caret-primary-white dark:focus-visible:ring-primary-dark-50 dark:hover:ring-primary-dark-50 dark:text-primary-white font-normal peer border border-solid border-primary-gray/20 dark:focus-visible:border-primary-dark-50 dark:hover:border-primary-dark-50',
                dark: 'dark:focus:bg-primary-dark-200 dark:bg-primary-dark-150 text-white dark:placeholder:text-white placeholder:opacity-50 dark:focus-visible:ring-primary-dark-50 dark:hover:ring-primary-dark-50 placeholder:opacity-50 border-none'
            },
            _size: {
                base: 'h-[54px] rounded-[10px] p-[15px] text-base',
                sm: 'h-10 px-3 py-4 rounded-md text-base placeholder:text-sm',
            },
            outline: {
                none: 'ring-0 hover:ring-0',
                primary: 'hover:ring-1 focus-visible:ring-2',
                secondary: 'hover:ring-1 focus-visible:ring-1'
            }
        },
        defaultVariants: {
            variant: 'primary',
            _size: 'base',
            outline: 'none'
        }
    }
);

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, children, variant, _size, outline, type, ...props }, ref) => {
        return (
            <input
                {...props}
                type={type}
                className={cn(inputVariants({ variant, _size, outline }), className)}
                ref={ref}
            />
        );
    }
);

Input.displayName = 'Input';

export { Input };