import { AiIcon, ChevronIcon, CloseIcon, UploadIcon } from '@/shared/lib/assets/icons';

import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { LoadingButton } from '@/shared/ui/loading-button';
import { Typography } from '@/shared/ui/typography';

import { useUpload } from '../model/useUpload';

export const Upload = () => {
    const { onChange, handleRemove, delta, request_limit, image, isOvered, ref, percent } = useUpload();

    return (
        <div className='flex flex-col gap-5 w-full box-border'>
            <div className='flex items-center justify-between rounded-lg py-2 px-[10px] border-1 border-solid border-primary-white-secondary/30 w-full text-primary-white-secondary text-sm font-normal'>
                Выберите вид спорта для анализа
                <ChevronIcon className='text-primary-white-secondary size-5' />
            </div>
            <label
                ref={ref}
                className={cn(
                    'cursor-pointer relative h-[450px] hover:border-primary-blue transition-colors ease-in-out duration-300 flex flex-col p-5 max-sm:p-3 items-center justify-center gap-1 box-border border-2 border-dashed border-primary-white-secondary/30 rounded-[14px]',
                    isOvered && 'border-primary-blue bg-primary-blue-transparent'
                )}
            >
                <Input type='file' className='sr-only' onChange={onChange} />
                {image ? (
                    <>
                        <Button size='icon' className='ml-auto absolute max-sm:right-3 max-sm:top-3 right-5 top-5' onClick={handleRemove}>
                            <CloseIcon />
                        </Button>
                        <img src={image} className='object-cover object-center rounded-[14px] size-full' />
                    </>
                ) : (
                    <>
                        <div className='pointer-events-none flex flex-col items-center gap-2'>
                            <Typography className='flex size-16 mb-2 bg-primary-blue-transparent rounded-full items-center justify-center'>
                                <UploadIcon className='size-10 text-primary-blue' />
                            </Typography>
                            <Typography as='h2' size='2xl' weight='semibold'>
                                {isOvered ? 'Отпустите изображение' : 'Загрузите изображение'}
                            </Typography>
                            <Typography as='p' variant='secondary' weight='thin' className='text-pretty'>
                                Поддерживаемые форматы: PNG, JPG, JPEG
                            </Typography>
                        </div>
                    </>
                )}
            </label>
            <div className='flex flex-col gap-2 p-3 rounded-[14px] border border-solid border-primary-white-secondary/30'>
                <div className='flex items-center justify-between'>
                    <Typography variant='secondary' weight='thin'>
                        Доступно запросов
                    </Typography>
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
            <LoadingButton cta className='sticky bottom-2'>
                <AiIcon className='text-primary-white size-5' />
                Запустить анализ
            </LoadingButton>
        </div>
    );
};