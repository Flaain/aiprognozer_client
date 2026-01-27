import { cn } from '../lib/utils';

export const Progressbar = ({
    progress,
    wrapperClassnames,
    progressClassnames
}: {
    progress: number;
    wrapperClassnames?: string;
    progressClassnames?: string;
}) => (
    <div className='flex flex-col gap-1 items-center mt-3'>
        <div className={cn('w-full h-2 bg-primary-white-secondary/30 rounded-full relative', wrapperClassnames)}>
            <div
                className={cn(
                    'absoute h-2 bg-primary-blue rounded-full transition-all duration-1000 ease-in-out',
                    progressClassnames
                )}
                style={{ width: `${progress}%` }}
            ></div>
        </div>
    </div>
);