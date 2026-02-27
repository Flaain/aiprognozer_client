
import { useShallow } from 'zustand/shallow';

import { SportDropdown } from '@/features/sport-dropdown';

import { userSelector, useUser } from '@/entities/user';

import { AiIcon, ClockIcon, CloseIcon, PulseIcon, UploadIcon } from '@/shared/lib/assets/icons';

import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { LoadingButton } from '@/shared/ui/loading-button';
import { Progressbar } from '@/shared/ui/progressbar';
import { Skeleton } from '@/shared/ui/skeleton';
import { Typography } from '@/shared/ui/typography';
import { getTimerString } from '@/shared/utils/getTimerString';

import { ALLOWED_TYPES, LOADING_WORDS } from '../model/constants';
import type { UploadProps } from '../model/types';
import { useUpload } from '../model/useUpload';

export const Upload = ({ onAnalysisReady }: UploadProps) => {
    const {
        onChange,
        onStartAnalysis,
        handleRemove,
        sportType,
        timer,
        onSportTypeChange,
        onLoadingWordAnimationEnd,
        delta,
        request_limit,
        isReachedLimit,
        image,
        isOvered,
        ref,
        percent,
        isAnalyzing,
        loadingWordIndex,
        isStatusLoading
    } = useUpload(onAnalysisReady);

    const { isUnlimited, role } = useUser(useShallow(userSelector));

    return (
        <>
            <SportDropdown onSelect={onSportTypeChange} value={sportType} disabled={isAnalyzing || isReachedLimit} />
            <label
                ref={ref}
                className={cn(
                    'relative min-h-[350px] flex-1 self-stretch transition-colors ease-in-out border-primary-white-secondary/30 duration-300 flex flex-col p-5 max-sm:p-3 items-center justify-center gap-1 box-border border-2 border-dashed rounded-[14px]',
                    isOvered && !isAnalyzing && 'border-primary-blue bg-primary-blue-transparent',
                    !isAnalyzing && !isReachedLimit && 'cursor-pointer hover:[&:not(:has(button:hover))]:border-primary-blue'
                )}
            >
                <Input
                    type='file'
                    className='sr-only'
                    onChange={onChange}
                    accept='image/jpeg, image/png'
                    disabled={isAnalyzing || isReachedLimit}
                />
                {isAnalyzing && (
                    <div className='left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 px-3 absolute z-10 max-sm:max-w-[300px] max-w-[500px] w-full overflow-hidden h-14'>
                        <Typography
                            size='md'
                            weight='bold'
                            className='flex items-center justify-center text-primary-white size-full animate-text-loader-fade text-center'
                            onAnimationIteration={onLoadingWordAnimationEnd}
                        >
                            {LOADING_WORDS[sportType!][loadingWordIndex]}
                        </Typography>
                    </div>
                )}
                {image ? (
                    <div className='flex size-full grow-1 overflow-hidden rounded-[14px]'>
                        {!isAnalyzing && (
                            <Button
                                disabled={isAnalyzing}
                                variant='error'
                                size='icon'
                                className='ml-auto absolute rounded-tr-[14px] rounded-tl-none rounded-br-none max-sm:right-3 max-sm:top-3 right-5 top-5 z-10'
                                onClick={handleRemove}
                            >
                                <CloseIcon />
                            </Button>
                        )}
                        <img
                            src={image.url}
                            className={cn(
                                'object-cover object-center rounded-[14px] size-full transition-all ease-in-out duration-300',
                                isAnalyzing && 'blur-xs opacity-50 grayscale-100'
                            )}
                        />
                    </div>
                ) : (
                    <div className='flex flex-col items-center gap-2'>
                        <Typography className='flex size-16 mb-2 bg-primary-blue-transparent rounded-full items-center justify-center'>
                            {isReachedLimit ? (
                                <ClockIcon className='size-10 text-primary-blue' />
                            ) : (
                                <UploadIcon className='size-10 text-primary-blue' />
                            )}
                        </Typography>
                        {isReachedLimit ? (
                            <>
                                <Typography as='h2' size='2xl' weight='semibold'>
                                    Достигнут лимит запросов
                                </Typography>
                                {isStatusLoading ? (
                                    <Skeleton className='w-2/3 h-5 rounded-lg before:border-none' />
                                ) : (
                                    <Typography as='p' variant='secondary' weight='thin' className='text-pretty text-center'>
                                        Запросы обнулятся через:&nbsp;{getTimerString(timer)}
                                    </Typography>
                                )}
                            </>
                        ) : (
                            <>
                                <Typography as='h2' size='2xl' weight='semibold'>
                                    {isOvered ? 'Отпустите изображение' : 'Загрузите изображение'}
                                </Typography>
                                <Typography as='p' variant='secondary' weight='thin' className='text-pretty'>
                                    Поддерживаемые форматы: {ALLOWED_TYPES.join(', ').toUpperCase()}
                                </Typography>
                            </>
                        )}
                    </div>
                )}
                <LoadingButton
                    cta={!isAnalyzing && !!image && !!sportType}
                    onClick={onStartAnalysis}
                    className={cn(
                        'disabled:opacity-100 h-12 rounded-b-[14px] rounded-t-none flex z-10 absolute inset-x-5 max-sm:inset-x-3 w-auto bottom-5 max-sm:bottom-3 transition-all duration-200 ease-in-out',
                        !image || !sportType ? 'opacity-0! pointer-events-none translate-y-2' : 'opacity-100 pointer-events-auto translate-y-0'
                    )}
                    disabled={!image || !sportType || isAnalyzing}
                    isLoading={isAnalyzing}
                >
                    <AiIcon className='text-primary-white size-5' />
                    Запустить анализ
                </LoadingButton>
            </label>
            {!isUnlimited && role !== 'ADMIN' && (
                <div className='flex flex-col gap-2 p-3 rounded-[14px] border border-solid border-primary-white-secondary/30'>
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-2'>
                            <PulseIcon className='size-5 text-primary-blue' />
                            <Typography variant='secondary' weight='thin'>
                                Доступно запросов
                            </Typography>
                        </div>
                        <Typography variant='secondary' weight='medium'>
                            {delta} / {request_limit}
                        </Typography>
                    </div>
                    <Progressbar progress={percent} />
                </div>
            )}
        </>
    );
};
