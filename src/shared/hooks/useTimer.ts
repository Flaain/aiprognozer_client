import { useEffect, useRef, useState } from 'react';

const getTimeFromSeconds = (timestamp: number) => {
    const roundedTimestamp = Math.ceil(timestamp);
    const days = Math.floor(roundedTimestamp / (60 * 60 * 24));
    const hours = Math.floor((roundedTimestamp % (60 * 60 * 24)) / (60 * 60));
    const minutes = Math.floor((roundedTimestamp % (60 * 60)) / 60);
    const seconds = Math.floor(roundedTimestamp % 60);

    return {
        seconds,
        minutes,
        hours,
        days
    };
};

interface UseTimerOptions {
    onExpire?: () => void
    immediately?: boolean
}

export const useTimer = (s?: number | null, { immediately = true, onExpire }: UseTimerOptions = { immediately: true }) => {
    const inital = Math.round(Math.max(s ?? 0, 0));

    const [seconds, setSeconds] = useState(inital);

    const intervalRef = useRef<ReturnType<typeof setInterval>>(null);

    useEffect(() => {
        if (inital <= 0) {
            setSeconds(0);
            return;
        }

        immediately && start(inital);

        return () => {
            intervalRef.current && clearInterval(intervalRef.current);
        }
    }, [inital]);

    const start = (seconds: number) => {
        if (seconds <= 0) return;

        setSeconds(seconds);

        intervalRef.current && clearInterval(intervalRef.current);

        const intervalId = setInterval(() => {
            setSeconds((prev) => {
                const newSeconds = prev - 1;
                
                if (newSeconds === 0) {
                    clearInterval(intervalId);
                    intervalRef.current = null;

                    onExpire && requestAnimationFrame(onExpire);
                }

                return newSeconds;
            });
        }, 1000);

        intervalRef.current = intervalId;
    }

    return {
        ...getTimeFromSeconds(seconds),
        start,
    }
};