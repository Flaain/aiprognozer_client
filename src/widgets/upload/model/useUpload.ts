import { useEffect, useState } from 'react';

import { hapticFeedbackImpactOccurred } from '@telegram-apps/sdk-react';
import { isAxiosError } from 'axios';
import { toast } from 'sonner';
import { useShallow } from 'zustand/shallow';

import type { SportType } from '@/features/sport-dropdown';

import { userActionsSelector, userSelector, useUser } from '@/entities/user';

import { useDropZone, type UseDropZoneErrorCode } from '@/shared/hooks/useDropZone';
import { useTimer } from '@/shared/hooks/useTimer';
import { toastErrorColors } from '@/shared/model/constants';
import type { Analysis, ApiFailureData } from '@/shared/model/types';

import { uploadApi } from '../api';

import { DROPZONE_ERROR_TO_MESSAGE, LOADING_WORDS, MAX_SIZE, MIMETYPES } from './constants';

export const useUpload = (onAnalysisReady: (analysis: Analysis) => void) => {
    const { request_count, request_limit, isUnlimited, role } = useUser(useShallow(userSelector));
    const { updateRequestCount, onRequestLimitExceeded, updateFirstRequestAt } = useUser(useShallow(userActionsSelector));
    
    const timer = useTimer(null, { immediately: false, onExpire: () => updateRequestCount('reset') });

    const isReachedLimit = request_limit === request_count;
    const isUnlimitedOrAdmin = isUnlimited || role === 'ADMIN';

    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [isStatusLoading, setIsStatusLoading] = useState(isReachedLimit);

    const [image, setImage] = useState<{ file: File; url: string } | null>(null);
    const [sportType, setSportType] = useState<SportType | null>(null);
    const [loadingWordIndex, setLoadingWordIndex] = useState(0);

    useEffect(() => {
        if (!isAnalyzing) return;

        const intervalId = setInterval(() => {
            setLoadingWordIndex((prev) => (prev + 1) % LOADING_WORDS[sportType!].length);
        }, 2000);

        return () => clearInterval(intervalId);
    }, [isAnalyzing, sportType]);

    useEffect(() => {
        if (isUnlimitedOrAdmin || !isReachedLimit) return;
        
        const controller = new AbortController();

        (async () => {
            try {
                const { data } = await uploadApi.status(controller.signal);

                setIsStatusLoading(false);

                timer.start(data.nextRequestsAvailableAt ?? 0);
            } catch (error) {
                console.error(error);
            }
        })();

        return () => {
            controller.abort();
        }
    }, []);

    const delta = request_limit - request_count;
    const percent = Math.round((delta / request_limit) * 100);

    const onStartAnalysis = async () => {
        try {
            if (!image || !sportType || isAnalyzing) return;

            setIsAnalyzing(true);
            
            await new Promise((resolve) => setTimeout(resolve, 5000));

            hapticFeedbackImpactOccurred('medium');

            !isUnlimitedOrAdmin && updateRequestCount('inc');

            const form = new FormData();

            form.append('image', new Blob([image.file], { type: image.file.type }));

            const { data: { first_request_at, ...analysis } } = await uploadApi.upload(form, sportType);

            onAnalysisReady(analysis);
            updateFirstRequestAt(first_request_at);
        } catch (error) {
            if (
                isAxiosError<ApiFailureData<{ first_request_at: string; nextRequestsAvailableAt: number }>>(error) &&
                error.response?.data.code === 'REQUEST_LIMIT_EXCEEDED'
            ) {
                onRequestLimitExceeded(error.response.data.data?.first_request_at!);

                setImage(null);
                setSportType(null);

                timer.start(error.response.data.data!.nextRequestsAvailableAt);

                toast.error('Превышен лимит запросов', { className: toastErrorColors, icon: null });
            } else {
                toast.error('При выполнении запроса произошла ошибка', { className: toastErrorColors, icon: null });

                !isUnlimitedOrAdmin && updateRequestCount('dec');
            }
        } finally {
            setIsAnalyzing(false);
        }
    };

    const handleDropOrSelect = (_: DragEvent | React.ChangeEvent<HTMLInputElement>, files: Array<File>) => {
        if (isReachedLimit) return;

        const file = files[0];

        image && URL.revokeObjectURL(image.url);

        setImage({ file, url: URL.createObjectURL(new Blob([file], { type: file.type })) });
    };

    const onSportTypeChange = (sportType: SportType) => {
        if (isReachedLimit) return;

        setSportType(sportType);
    };

    const handleRemove = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();

        setSportType(null);
        setImage(null);

        image && URL.revokeObjectURL(image.url);
    };

    const onDropZoneError = (code: UseDropZoneErrorCode) => {
        const { title, description } = DROPZONE_ERROR_TO_MESSAGE[code];

        toast.error(title, { className: toastErrorColors, icon: null, description });
    };

    const { ref, isOvered, onChange } = useDropZone<HTMLLabelElement>({
        maxSize: MAX_SIZE,
        mimetypes: MIMETYPES,
        disabled: isAnalyzing || isReachedLimit,
        onDrop: handleDropOrSelect,
        onSelect: handleDropOrSelect,
        onError: onDropZoneError
    });

    return {
        ref,
        sportType,
        isStatusLoading,
        onStartAnalysis,
        onSportTypeChange,
        delta,
        timer,
        isAnalyzing,
        request_limit,
        loadingWordIndex,
        isOvered,
        onChange,
        image,
        handleRemove,
        percent,
        isReachedLimit
    };
};
