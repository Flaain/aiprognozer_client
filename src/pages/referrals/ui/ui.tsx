import { ReferralsList } from '@/widgets/referrals-list';

import { CheckIcon, CopyIcon } from '@/shared/lib/assets/icons';

import { Button } from '@/shared/ui/button';
import { Container } from '@/shared/ui/container';
import { LoadingButton } from '@/shared/ui/loading-button';
import { Typography } from '@/shared/ui/typography';

import { useReferrals } from '../model/useReferrals';

import { ReferralsSkeleton } from './skeleton';

export const Referrals = () => {
    const {
        isLoading,
        isError,
        isRefetching,
        isEmpty,
        isLoadingMore,
        isErrorMore,
        isRefetchingMore,
        isCopied,
        isInviteInProgress,
        data,
        refetch,
        handleCopy,
        onLoadMore,
        handleInvite
    } = useReferrals();

    if (isLoading || isError || isRefetching) {
        return <ReferralsSkeleton isRefetching={isRefetching} isError={isError} refetch={refetch} />;
    }

    return (
        <Container as='div' className='flex-1 flex flex-col gap-5 overflow-y-auto'>
            <div className=' flex flex-col items-start gap-2 p-5 max-sm:p-3 rounded-[14px] bg-linear-to-br from-primary-dark-secondary to-transparent'>
                <Typography as='h1' size='xl' weight='bold' className='text-start text-pretty'>
                    Приглашайте друзей и получайте бонусы
                </Typography>
                {data?.rewards.request_limit && (
                    <div className='flex flex-col gap-3 w-full'>
                        <Typography weight='bold' className='text-start text-pretty'>
                            Увеличение лимита
                        </Typography>
                        <Typography className='text-left text-pretty bg-primary-dark-secondary w-full px-3 py-2 rounded-lg'>
                            +{data.rewards.request_limit.default} за каждого друга
                            <br />+{data.rewards.request_limit.premium}, если у друга есть премиум
                        </Typography>
                    </div>
                )}
                <div className='mt-5 flex w-full items-center justify-between gap-2 sticky bottom-0'>
                    <LoadingButton isLoading={isInviteInProgress} className='flex-1' size='lg' onClick={handleInvite}>
                        Пригласить
                    </LoadingButton>
                    <Button size='lg' onClick={handleCopy} disabled={isCopied}>
                        {isCopied ? <CheckIcon className='size-6'/> : <CopyIcon className='size-6' />}
                    </Button>
                </div>
            </div>
            {isEmpty ? (
                <Typography size='xl' className='text-center text-pretty my-auto'>
                    Кажется, у вас нет друзей
                </Typography>
            ) : (
                <div className='flex items-start flex-col gap-2 flex-1'>
                    <Typography as='h2' size='lg'>
                        Ваши друзья
                    </Typography>
                    <ReferralsList
                        isLoading={isLoadingMore}
                        isError={isErrorMore}
                        isRefetching={isRefetchingMore}
                        canLoadMore={data?.referrals.meta.hasMore && !isLoadingMore && !isErrorMore}
                        onLoadMore={onLoadMore}
                        referrals={data?.referrals.items}
                    />
                </div>
            )}
        </Container>
    );
};
