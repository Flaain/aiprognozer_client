import { useEffect, useRef } from 'react';

import { Typography } from './typography';

export const Counter = ({ start = 0, end }: { start?: number; end: number }) => {
    const ref = useRef<any>(null);

    useEffect(() => {
        if (!ref.current) return;

        let value = start;

        const intervalId = setInterval(() => {
            value = Math.min(value + 1, end);

            ref.current.textContent = `${value}%`;

            value === end && clearInterval(intervalId);
        }, 25);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    return (
        <Typography ref={ref} size='4xl' weight='bold' className='text-end max-md:text-start'>
            {start}%
        </Typography>
    );
};