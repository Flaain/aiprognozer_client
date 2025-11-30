import { cn } from '@/shared/lib/utils';
import { Typography } from '@/shared/ui/typography';

import type { StoreWindowProps } from '../model/types';

export const StoreWindow = ({ title, description, icon, className, children, ...rest }: StoreWindowProps) => (
    <div {...rest} className={cn('flex flex-col gap-4', className)}>
        <div className={cn('flex gap-2', description ? 'items-start' : 'items-center')}>
            <Typography className='p-2 rounded-full bg-primary-blue-transparent'>{icon}</Typography>
            {description ? (
                <div className='flex flex-col items-start'>
                    <Typography size='xl'>{title}</Typography>
                    <Typography as='p' variant='secondary' weight='thin' size='md' className='text-left text-pretty'>
                        {description}
                    </Typography>
                </div>
            ) : (
                <Typography size='xl'>{title}</Typography>
            )}
        </div>
        {children}
    </div>
);
