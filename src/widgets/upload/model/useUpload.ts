import { useRef, useState } from 'react';

import { useShallow } from 'zustand/shallow';

import type { SportType } from '@/features/sport-dropdown';

import { userActionsSelector, userSelector, useUser } from '@/entities/user';

import { useDropZone, type UseDropZoneErrorCode } from '@/shared/model/useDropZone';

import { DROPZONE_ERROR_TO_MESSAGE, MAX_SIZE, MIMETYPES } from './constants';

export const useUpload = () => {
    const { request_count, request_limit } = useUser(useShallow(userSelector));
    const { on_request } = useUser(useShallow(userActionsSelector));

    const [isLoading, setIsLoading] = useState(false);
    const [image, setImage] = useState<{ file: File, url: string } | null>(null);
    const [sportType, setSportType] = useState<SportType | null>(null);
    const [dropZoneError, setDropZoneError] = useState<string | null>(null);
    
    const mainButtonRef = useRef<HTMLDivElement>(null);

    const onStartAnalysis = () => {
        try {
            setIsLoading(true);

            on_request();
        } catch (error) {
            
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
        const file = files[0];

        image && URL.revokeObjectURL(image.url);

        sportType && showMainButton();

        setDropZoneError(null);
        setImage({ file, url: URL.createObjectURL(new Blob([file], { type: file.type })) });
    };

    const onSportTypeChange = (sportType: SportType) => {
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
        disabled: isLoading,
        onDrop: handleDropOrSelect,
        onSelect: handleDropOrSelect,
        onError: onDropZoneError
    });

    const delta = request_limit - request_count;
    const percent = Math.round((delta / request_limit) * 100);

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
        percent
    };
};