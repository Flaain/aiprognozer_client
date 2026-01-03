import { forwardRef } from 'react';

import { LoaderIcon } from '../lib/assets/icons';
import { cn } from '../lib/utils';

import { Button, type ButtonProps } from './button';

export const LoadingButton = forwardRef<HTMLButtonElement, ButtonProps & { isLoading?: boolean }>(({ isLoading, disabled, children, className, ...rest }, ref) => {
    return (
        <Button
            ref={ref}
            variant='default'
            disabled={disabled || isLoading}
            className={cn('w-full rounded-lg', className)}
            size='lg'
            {...rest}
        >
            {isLoading ? <LoaderIcon className='size-5 animate-spin' /> : children}
        </Button>
    );
})