import { Fragment } from 'react/jsx-runtime';

import { SportDropdown } from '@/features/sport-dropdown';

import { AiIcon, AttentionIcon, ClockIcon, CloseIcon, PulseIcon, UploadIcon } from '@/shared/lib/assets/icons';

import { cn } from '@/shared/lib/utils';
import type { Analysis } from '@/shared/model/types';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { LoadingButton } from '@/shared/ui/loading-button';
import { Typography } from '@/shared/ui/typography';

import { ALLOWED_TYPES, LOADING_WORDS } from '../model/constants';
import { useUpload } from '../model/useUpload';

export const Upload = ({ onAnalysisReady }: { onAnalysisReady: (analysis: Analysis) => void }) => {
    const {
        onChange,
        onStartAnalysis,
        handleRemove,
        mainButtonRef,
        sportType,
        dropZoneError,
        setDropZoneError,
        onSportTypeChange,
        delta,
        request_limit,
        isReachedLimit,
        image,
        isOvered,
        ref,
        percent,
        isLoading
    } = useUpload(onAnalysisReady);

    return (
        <div className='flex flex-col gap-5 w-full box-border relative'>
            <SportDropdown onSelect={onSportTypeChange} value={sportType} disabled={isLoading || isReachedLimit} />
            <label
                ref={ref}
                className={cn(
                    'relative h-[450px] transition-colors ease-in-out border-primary-white-secondary/30 duration-300 flex flex-col p-5 max-sm:p-3 items-center justify-center gap-1 box-border border-2 border-dashed rounded-[14px]',
                    isOvered && !isLoading && (dropZoneError ? 'border-primary-error bg-primary-error/10' : 'border-primary-blue bg-primary-blue-transparent'),
                    dropZoneError && 'border-primary-error/50',
                    !isLoading && !isReachedLimit && 'cursor-pointer',
                    !isLoading && !isReachedLimit && (dropZoneError ? 'hover:border-primary-error' : 'hover:border-primary-blue')
                )}
            >
                <Input
                    type='file'
                    className='sr-only'
                    onChange={onChange}
                    accept='image/jpeg, image/png'
                    disabled={isLoading || isReachedLimit}
                />
                {isLoading && sportType && image && (
                    <div className='left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 px-3 absolute z-10 gap-2 max-sm:max-w-[300px] max-w-[500px] w-full overflow-hidden h-14'>
                        {LOADING_WORDS[sportType].map((word, index, arr) => {
                            if (index === arr.length - 1) {
                                return (
                                    <Fragment key={'fragment-loader-words-list'}>
                                        <Typography
                                            key={index}
                                            size='md'
                                            weight='bold'
                                            className='flex items-center justify-center text-primary-white size-full animate-text-loader text-center'
                                        >
                                            {word}
                                        </Typography>
                                        <Typography
                                            key={`${0}-dublicated`}
                                            size='md'
                                            weight='bold'
                                            className='flex items-center justify-center text-primary-white size-full animate-text-loader text-center'
                                        >
                                            {arr[0]}
                                        </Typography>
                                    </Fragment>
                                );
                            }

                            return (
                                <Typography
                                    key={index}
                                    size='md'
                                    weight='bold'
                                    className='flex items-center justify-center text-primary-white size-full animate-text-loader text-center'
                                >
                                    {word}
                                </Typography>
                            );
                        })}
                    </div>
                )}
                {image ? (
                    <div className='flex size-full grow-1 overflow-hidden rounded-[14px]'>
                        {!isLoading && (
                            <Button
                                disabled={isLoading}
                                variant='error'
                                size='icon'
                                className='ml-auto absolute max-sm:right-3 max-sm:top-3 right-5 top-5 z-10'
                                onClick={handleRemove}
                            >
                                <CloseIcon />
                            </Button>
                        )}
                        <img
                            src={image.url}
                            className={cn(
                                'object-cover object-center rounded-[14px] size-full transition-all ease-in-out duration-300',
                                isLoading && 'blur-xs opacity-50 grayscale-100'
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
                                <Typography as='p' variant='secondary' weight='thin' className='text-pretty'>
                                    Запросы обнулятся через 24 часа
                                </Typography>
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
            </label>
            {dropZoneError && (
                <div
                    onClick={() => setDropZoneError(null)}
                    className='flex cursor-pointer items-start justify-start p-5 max-sm:p-3 relative bg-primary-error/10 rounded-[14px] border border-solid border-primary-error'
                >
                    <AttentionIcon className='min-w-5 min-h-5 size-5 text-primary-error mr-3' />
                    <Typography variant='error' as='p' weight='thin' size='sm' className='text-pretty text-left'>
                        {dropZoneError}
                    </Typography>
                </div>
            )}
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
                <div className='flex items-center'>
                    <div className='grow-1 h-1.5 bg-primary-white-secondary/30 rounded-full relative'>
                        <div
                            className='absoute h-1.5 bg-primary-blue rounded-full transition-all duration-1000 ease-in-out'
                            style={{ width: `${percent}%` }}
                        ></div>
                    </div>
                </div>
            </div>
            <div
                ref={mainButtonRef}
                className='py-3 hidden z-10 bg-primary-dark sticky bottom-0 opacity-0 translate-y-10 transition-all duration-300 ease-in-out'
            >
                <LoadingButton
                    cta={!isLoading && !!image && !!sportType}
                    onClick={onStartAnalysis}
                    className='h-11'
                    disabled={!image || !sportType}
                    isLoading={isLoading}
                >
                    <AiIcon className='text-primary-white size-5' />
                    Запустить анализ
                </LoadingButton>
            </div>
        </div>
    );
};
