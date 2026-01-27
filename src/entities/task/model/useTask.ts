import { useState } from "react";

import { openLink, openTelegramLink } from "@telegram-apps/sdk-react";
import { isAxiosError } from "axios";
import { toast } from "sonner";

import { toastErrorColors } from "@/shared/model/constants";
import type { ApiFailureData } from "@/shared/model/types";

import { taskApi } from "../api";

import { TASK_TYPE } from "./constants";
import type { TaskProps } from "./types";

export const useTask = ({ task, taskPath, onClaim, onRemove }: TaskProps) => {
    const [step, setStep] = useState('type' in task && 'link' in task ? 0 : 1);
    const [isVerifying, setIsVerifying] = useState(false);

    const handleStartTask = () => {
        try {
            if ('type' in task && 'link' in task) {
                if (TASK_TYPE[task.type as keyof typeof TASK_TYPE] !== 'EXTERNAL' && openTelegramLink.isAvailable()) {
                    openTelegramLink(task.link);
                } else {
                    openLink.isAvailable() ? openLink(task.link) : window.open(task.link, '_blank');
                }
            }

            setStep(1);
        } catch (error) {
            console.error(error);

            toast.error('Неудалось открыть задание', {
                icon: null,
                className: toastErrorColors,
                description: 'Пожалуйста, попробуйте еще раз',
                descriptionClassName: 'text-primary-white-secondary!'
            });
        }
    };

    const handleVerifyTask = async () => {
        try {
            setIsVerifying(true);

            const { data } = await taskApi.verify(task._id, taskPath);

            onClaim(task._id, task.reward, taskPath, data.claimedAt, data.nextClaimAvailableAt);
        } catch (error) {
            console.error(error);

            'link' in task && setStep(0);

            if (isAxiosError<ApiFailureData<{ claimedAt: string, nextClaimAvailableAt?: number }>>(error) && error.response?.data.code) {
                if (error.response?.data.code === 'TASK_ALREADY_CLAIMED') {
                    onClaim(
                        task._id, 
                        task.reward, 
                        taskPath, 
                        error.response.data.data!.claimedAt, 
                        error.response.data.data!.nextClaimAvailableAt
                    );
                } else if (error.response.data.code === 'TASK_NOT_EXISTS') {
                    onRemove(task._id, taskPath);

                    toast.info('Задание более неактуально', {
                        icon: null,
                        description: 'Возможно, срок его выполнения истек. Попробуйте выбрать другое задание из списка.'
                    });
                } else if (error.response.data.code === 'NOT_MEMBER_OF_CHAT') {
                    toast.error('Вы не являетесь участником чата', {
                        icon: null,
                        className: toastErrorColors,
                        description: 'Пожалуйста, попробуйте еще раз'
                    });
                }
            } else {
                toast.error('Неудалось проверить задание', {
                    icon: null,
                    className: toastErrorColors,
                    description: 'Пожалуйста, попробуйте еще раз'
                });
            }
        } finally {
            setIsVerifying(false);
        }
    };

    return { step, isVerifying, handleStartTask, handleVerifyTask };
};