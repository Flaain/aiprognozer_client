import { useRef, useState } from 'react';

import { hapticFeedbackImpactOccurred } from '@telegram-apps/sdk-react';
import { isAxiosError } from 'axios';
import { useShallow } from 'zustand/shallow';

import type { SportType } from '@/features/sport-dropdown';

import { userActionsSelector, userSelector, useUser } from '@/entities/user';

import { useDropZone, type UseDropZoneErrorCode } from '@/shared/hooks/useDropZone';
import { useTimer } from '@/shared/hooks/useTimer';
import type { Analysis, ApiFailureData } from '@/shared/model/types';

import { uploadApi } from '../api';

import { DROPZONE_ERROR_TO_MESSAGE, MAX_SIZE, MIMETYPES } from './constants';

export const useUpload = (onAnalysisReady: (analysis: Analysis) => void) => {
    const [isLoading, setIsLoading] = useState(false);
    const [image, setImage] = useState<{ file: File; url: string } | null>(null);
    const [sportType, setSportType] = useState<SportType | null>(null);
    const [error, setError] = useState<string | null>(null);
    
    const { request_count, request_limit, isUnlimited, first_request_at } = useUser(useShallow(userSelector));
    const { updateRequestCount, onRequestLimitExceeded, updateFirstRequestAt } = useUser(useShallow(userActionsSelector));
    
    const isReachedLimit = request_limit === request_count;
    const timer = useTimer(isReachedLimit ? (+new Date(+new Date(first_request_at!) + 1000 * 60 * 60 * 24) - Date.now()) / 1000 : null, {
        onExpire: () => updateRequestCount('reset')
    });
    const mainButtonRef = useRef<HTMLDivElement>(null);
    const delta = request_limit - request_count;
    const percent = Math.round((delta / request_limit) * 100);

    const onStartAnalysis = async () => {
        try {
            if (!image || !sportType || isLoading || isReachedLimit) return;

            setError(null);
            setIsLoading(true);
            
            hapticFeedbackImpactOccurred('medium');

            !isUnlimited && updateRequestCount('inc');

            const form = new FormData();

            form.append('image', new Blob([image.file], { type: image.file.type }));

            const { data: { first_request_at, ...analysis } } = await uploadApi.upload(form, sportType);

            onAnalysisReady(analysis);
            updateFirstRequestAt(first_request_at);

            setImage(null);
            setSportType(null);
        } catch (error) {
            if (isAxiosError<ApiFailureData>(error) && error.response?.data.code === 'REQUEST_LIMIT_EXCEEDED') {
                onRequestLimitExceeded();
                
                setImage(null);
                setSportType(null);

                setError('Превышен лимит запросов');

                hideMainButton();

                updateFirstRequestAt(error.response.data.first_request_at!)

                timer.start((+new Date(+new Date(error.response.data.first_request_at!) + 1000 * 60 * 60 * 24) - Date.now()) / 1000);
            } else {
                setError('При выполнении запроса произошла ошибка');
                !isUnlimited && updateRequestCount('dec');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const showMainButton = () => {
        if (mainButtonRef.current?.classList.contains('hidden')) {
            mainButtonRef.current.classList.remove('hidden');

            requestAnimationFrame(() => {
                mainButtonRef.current?.classList.remove('opacity-0', 'translate-y-10');
                mainButtonRef.current?.classList.add('opacity-100', 'translate-y-0');
            });
        }
    };

    const hideMainButton = () => {
        mainButtonRef.current?.classList.remove('opacity-100', 'translate-y-0');
        mainButtonRef.current?.classList.add('opacity-0', 'translate-y-10');

        setTimeout(() => mainButtonRef.current?.classList.add('hidden'), 310);
    }

    const handleDropOrSelect = (_: DragEvent | React.ChangeEvent<HTMLInputElement>, files: Array<File>) => {
        if (isReachedLimit) return;

        const file = files[0];

        image && URL.revokeObjectURL(image.url);

        sportType && showMainButton();

        setError(null);
        setImage({ file, url: URL.createObjectURL(new Blob([file], { type: file.type })) });
    };

    const onSportTypeChange = (sportType: SportType) => {
        if (isReachedLimit) return;

        setSportType(sportType);
        image && showMainButton();
    };

    const handleRemove = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();

        setSportType(null);
        setImage(null);

        image && URL.revokeObjectURL(image.url);

        hideMainButton();
    };

    const onDropZoneError = (code: UseDropZoneErrorCode) => {
        setError(DROPZONE_ERROR_TO_MESSAGE[code]);
    };

    const { ref, isOvered, onChange } = useDropZone<HTMLLabelElement>({
        maxSize: MAX_SIZE,
        mimetypes: MIMETYPES,
        disabled: isLoading || isReachedLimit,
        onDrop: handleDropOrSelect,
        onSelect: handleDropOrSelect,
        onError: onDropZoneError
    });

    return {
        ref,
        sportType,
        timer,
        onStartAnalysis,
        onSportTypeChange,
        setError,
        delta,
        isLoading,
        error,
        mainButtonRef,
        request_limit,
        isOvered,
        onChange,
        image,
        handleRemove,
        percent,
        isReachedLimit
    };
};
