import { LoaderIcon } from '../lib/assets/icons';
import { cn } from '../lib/utils';

import { Button, type ButtonProps } from './button';

export const LoadingButton = ({
    isLoading,
    disabled,
    children,
    className,
    ...rest
}: ButtonProps & { isLoading?: boolean }) => {
    return (
        <Button
            variant='default'
            disabled={disabled || isLoading}
            className={cn('w-full rounded-lg', className)}
            size='lg'
            {...rest}
        >
            {isLoading ? <LoaderIcon className='size-5 animate-spin' /> : children}
        </Button>
    );
};