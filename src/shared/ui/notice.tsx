import { isValidElement, type ReactElement } from 'react';

import { cva, type VariantProps } from 'class-variance-authority';

import { AttentionIcon, QuestionIcon } from '@/shared/lib/assets/icons';

import { cn } from '../lib/utils';

import { Typography } from './typography';

const variants = cva(
    "inline-flex items-center cursor-pointer justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
    {
        variants: {
            variant: {
                primary: 'bg-primary-blue-transparent border border-primary-blue/30'
            },
            size: {
                default: 'py-5 px-[10px] rounded-md'
            }
        },
        defaultVariants: {
            variant: 'primary',
            size: 'default'
        }
    }
);

interface NoticeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof variants> {
    title: string;
    description: string | ReactElement;
    status: 'attention' | 'info';
}

export const Notice = ({ className, title, variant, size, description, status, ...rest }: NoticeProps) => {
    const isPrimary = variant === 'primary';

    const icons: Record<NoticeProps['status'], React.ReactNode> = {
        attention: <AttentionIcon className={cn('size-6 self-start', isPrimary ? 'text-primary-blue' : 'text-primary-dark-secondary')} />,
        info: <QuestionIcon className={cn('size-6', isPrimary ? 'text-primary-blue' : 'text-primary-dark-secondary')} />
    };

    return (
        <div {...rest} className={cn('flex !gap-4 !justify-start !items-start !cursor-default overflow-hidden !rounded-[10px]', variants({ variant, size, className }))}>
            {icons[status]}
            <div className='flex flex-col items-start gap-2'>
                <Typography as='h2' variant={isPrimary ? 'primary' : 'secondary'} weight='semibold' size='sm'>
                    {title}
                </Typography>
                {isValidElement(description) ? (
                    description
                ) : (
                    <Typography as='p' variant={isPrimary ? 'secondary' : 'primary'} className='text-pretty text-left' weight='thin' size='xs'>
                        {description}
                    </Typography>
                )}
            </div>
        </div>
    );
};