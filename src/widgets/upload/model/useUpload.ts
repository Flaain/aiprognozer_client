import { useRef, useState } from 'react';

import { useShallow } from 'zustand/shallow';

import type { SportType } from '@/features/sport-dropdown';

import { userActionsSelector, userSelector, useUser } from '@/entities/user';

import type { Analysis } from '@/shared/model/types';
import { useDropZone, type UseDropZoneErrorCode } from '@/shared/model/useDropZone';

import { uploadApi } from '../api';

import { DROPZONE_ERROR_TO_MESSAGE, MAX_SIZE, MIMETYPES } from './constants';

export const useUpload = (onAnalysisReady: (analysis: Analysis) => void) => {
    const { request_count, request_limit, last_request_at } = useUser(useShallow(userSelector));
    const { updateRequestCount, updateLastRequestAt } = useUser(useShallow(userActionsSelector));

    const [isLoading, setIsLoading] = useState(false);
    const [image, setImage] = useState<{ file: File, url: string } | null>(null);
    const [sportType, setSportType] = useState<SportType | null>(null);
    const [dropZoneError, setDropZoneError] = useState<string | null>(null);
    
    const mainButtonRef = useRef<HTMLDivElement>(null);
    const isReachedLimit = request_limit === request_count;
    const resetAt = new Date(+new Date(last_request_at) + 24 * 60 * 60 * 1000);
    const delta = request_limit - request_count;
    const percent = Math.round((delta / request_limit) * 100);
    
    const onStartAnalysis = async () => {
        try {
            if (!image || !sportType || isLoading || isReachedLimit) return;

            setIsLoading(true);

            updateRequestCount('inc');
            
            const form = new FormData();

            form.append('image', new Blob([image.file], { type: image.file.type }));

            const { data: { last_request_at, ...analysis } } = await uploadApi.upload(form, sportType);
            
            onAnalysisReady(analysis);
            updateLastRequestAt(last_request_at);

            setImage(null);
            setSportType(null);
        } catch (error) {
            updateRequestCount('dec');
        } finally {
            setIsLoading(false);
        }
    }

    const showMainButton = () => {
        if (mainButtonRef.current?.classList.contains('hidden')) {
            mainButtonRef.current.classList.remove('hidden');

            requestAnimationFrame(() => {
                mainButtonRef.current?.classList.remove('opacity-0', 'translate-y-10');
                mainButtonRef.current?.classList.add('opacity-100', 'translate-y-0');
            });
        }
    }

    const handleDropOrSelect = (_: DragEvent | React.ChangeEvent<HTMLInputElement>, files: Array<File>) => {
        if (isReachedLimit) return;

        const file = files[0];

        image && URL.revokeObjectURL(image.url);

        sportType && showMainButton();

        setDropZoneError(null);
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

        mainButtonRef.current?.classList.remove('opacity-100', 'translate-y-0');
        mainButtonRef.current?.classList.add('opacity-0', 'translate-y-10');
        
        setTimeout(() => mainButtonRef.current?.classList.add('hidden'), 310);
    };

    const onDropZoneError = (code: UseDropZoneErrorCode) => {
        setDropZoneError(DROPZONE_ERROR_TO_MESSAGE[code]);
    }

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
        onStartAnalysis,
        onSportTypeChange,
        setDropZoneError,
        delta,
        isLoading,
        dropZoneError,
        mainButtonRef,
        request_limit,
        isOvered,
        onChange,
        image,
        handleRemove,
        percent,
        resetAt,
        isReachedLimit
    };
};