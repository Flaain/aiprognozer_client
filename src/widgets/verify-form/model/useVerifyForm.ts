import { useState } from "react";

import { isAxiosError } from "axios";

import { userApi, useUser } from "@/entities/user";

import { MAX_ID_LENGTH } from "@/shared/model/constants";
import type { ApiFailureData } from "@/shared/model/types";

import { ERROR_CODE_TO_MESSAGE } from "./constants";

export const useVerifyForm = () => {
    const [oneWinId, setOneWinId] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string>('');

    const isSubmitButtonDisabled = oneWinId.length < MAX_ID_LENGTH || isLoading;

    const onChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
        setError('');

        const vt = value.trim();

        if (!vt.length) return setOneWinId('');

        if (vt.length > MAX_ID_LENGTH || !/^\d+$/.test(value)) return;

        setOneWinId(value);
    };

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        try {
            setError('');

            event.preventDefault();

            setIsLoading(true);

            await userApi.verify(oneWinId);

            useUser.getState().actions.onVerify(+oneWinId);
        } catch (error) {
            if (isAxiosError<ApiFailureData>(error) && error.response?.data.code) {
                setError(ERROR_CODE_TO_MESSAGE[error.response.data.code as keyof typeof ERROR_CODE_TO_MESSAGE]);
            } else {
                setError('При выполнении запроса произошла ошибка');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return {
        oneWinId,
        isLoading,
        error,
        isSubmitButtonDisabled,
        onChange,
        onSubmit
    }
};
