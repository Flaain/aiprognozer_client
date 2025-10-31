import { useState } from 'react';

import { useShallow } from 'zustand/shallow';

import { userSelector, useUser } from '@/entities/user';

import { useDropZone } from '@/shared/model/useDropZone';

export const useUpload = () => {
    const { request_count, request_limit } = useUser(useShallow(userSelector));

    const [image, setImage] = useState<string | null>(null);

    const handleDropOrSelect = (_: DragEvent | React.ChangeEvent<HTMLInputElement>, files: Array<File>) => {
        const file = files[0];
        console.log(file);
        image && URL.revokeObjectURL(image);

        setImage(URL.createObjectURL(new Blob([file], { type: file.type })));
    };

    const handleRemove = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();

        setImage(null);
        URL.revokeObjectURL(image!);
    };

    const { ref, isOvered, onChange } = useDropZone<HTMLLabelElement>({
        maxSize: 10 * 1024 ** 2,
        mimetypes: ['image/png', 'image/jpeg'],
        onDrop: handleDropOrSelect,
        onSelect: handleDropOrSelect
    });

    const delta = request_limit - request_count;
    const percent = Math.round((delta / request_limit) * 100);

    return { ref, delta, request_limit, isOvered, onChange, image, handleRemove, percent };
};