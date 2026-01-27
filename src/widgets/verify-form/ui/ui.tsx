import { AttentionIcon, ShieldIcon } from '@/shared/lib/assets/icons';

import { Container } from '@/shared/ui/container';
import { Input } from '@/shared/ui/input';
import { LoadingButton } from '@/shared/ui/loading-button';
import { Typography } from '@/shared/ui/typography';

import { useVerifyForm } from '../model/useVerifyForm';

export const VerifyForm = () => {
    const { error, isLoading, isSubmitButtonDisabled, onChange, onSubmit, oneWinId } = useVerifyForm();

    return (
        <Container className='flex min-h-dvh'>
            <div className='flex flex-col justify-center gap-5 max-w-md w-full mx-auto'>
                <div className='flex flex-col items-center mb-5'>
                    <div className='p-[10px] rounded-full bg-primary-blue-transparent mb-3'>
                        <ShieldIcon className='text-primary-blue size-16' />
                    </div>
                    <Typography variant='primary' size='2xl'>
                        Пройдите верификацию
                    </Typography>
                    <Typography as='p' variant='secondary' size='md' weight='thin'>
                        Введите ваш ID, чтобы получить доступ к приложению
                    </Typography>
                </div>
                <form className='flex flex-col gap-3 mb-3' onSubmit={onSubmit}>
                    <label className='flex flex-col gap-2 items-start'>
                        <Typography variant='primary' size='sm'>
                            ID Аккаунта
                        </Typography>
                        <Input
                            disabled={isLoading}
                            variant='primary'
                            inputMode='numeric'
                            value={oneWinId}
                            onChange={onChange}
                            type='text'
                            _size='sm'
                            outline='primary'
                            className='rounded-lg'
                        />
                        {error && (
                            <Typography as='p' weight='thin' variant='error' className='text-left' size='xs'>
                                {error}
                            </Typography>
                        )}
                    </label>
                    <LoadingButton
                        cta={!isSubmitButtonDisabled}
                        isLoading={isLoading}
                        disabled={isSubmitButtonDisabled}
                    >
                        Подтвердить
                    </LoadingButton>
                </form>
                <div className='flex !gap-4 !justify-start !items-start !cursor-default overflow-hidden !rounded-[10px] bg-primary-blue-transparent border border-primary-blue/30'>
                    <AttentionIcon className='size-6 self-start text-primary-blue' />
                    <div className='flex flex-col items-start gap-2'>
                        <Typography as='h2' weight='semibold' size='sm'>
                            Нет ID?
                        </Typography>
                        <Typography
                            as='p'
                            variant='secondary'
                            weight='thin'
                            size='sm'
                            className='text-left text-pretty'
                        >
                            Перейдите в нашего&nbsp;
                            <Typography
                                as='a'
                                href='https://t.me/aiprognozer_bot'
                                variant='secondary'
                                weight='bold'
                                target='_blank'
                                className='underline'
                                size='sm'
                            >
                                бота
                            </Typography>
                            ,&nbsp;введите команду&nbsp;
                            <Typography variant='secondary' weight='bold' size='sm'>
                                /link
                            </Typography>
                            &nbsp;и зарегистрируйтесь по ссылке
                        </Typography>
                    </div>
                </div>
            </div>
        </Container>
    );
};