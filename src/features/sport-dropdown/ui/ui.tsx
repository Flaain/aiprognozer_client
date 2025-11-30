import { useState } from 'react';

import { ChevronIcon } from '@/shared/lib/assets/icons';

import { cn } from '@/shared/lib/utils';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/shared/ui/dropdown-menu';
import { Typography } from '@/shared/ui/typography';

import type { SportType } from '../model';

const titles: Record<SportType, string> = {
    football: '⚽ Футбол',
    basketball: '🏀 Баскетбол',
    mma: '🥊 MMA'
};

interface SportDropdownProps {
    value?: SportType | null;
    onSelect: (sport: SportType) => void;
    disabled?: boolean;
}

export const SportDropdown = ({ value, disabled, onSelect }: SportDropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <DropdownMenu onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild disabled={disabled}>
                <div
                    className={cn(
                        'relative outline-0 focus:opacity-0 flex items-center justify-between rounded-lg py-2 px-[10px] border-1 border-solid border-primary-white-secondary/30 w-full text-primary-white-secondary text-sm font-normal',
                        disabled ? 'cursor-default opacity-50' : 'opacity-100 cursor-pointer'
                    )}
                >
                    <Typography className='select-none'>
                        {value ? titles[value] : 'Выберите спорт для анализа'}
                    </Typography>
                    <ChevronIcon
                        className={cn(
                            'text-primary-white-secondary size-5 transition-transform duration-300 ease-in-out',
                            isOpen && 'rotate-180'
                        )}
                    />
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                asChild
                loop
                className='border border-solid border-primary-white-secondary/30 shadow-2xl flex flex-col bg-primary-dark p-1 rounded-[14px] box-border'
                align='center'
                sideOffset={10}
            >
                <ul>
                    <DropdownMenuItem
                        onSelect={() => onSelect('football')}
                        asChild
                        className='focus:bg-primary-dark-secondary focus-visible:bg-primary-dark-secondary cursor-pointer flex px-3 py-2 rounded-lg transition-colors ease-in-out duration-200 hover:bg-primary-dark-secondary'
                    >
                        <li>
                            <Typography>⚽ Футбол</Typography>
                        </li>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onSelect={() => onSelect('basketball')}
                        asChild
                        className='focus:bg-primary-dark-secondary focus-visible:bg-primary-dark-secondary cursor-pointer flex px-3 py-2 rounded-lg transition-colors ease-in-out duration-200 hover:bg-primary-dark-secondary'
                    >
                        <li>
                            <Typography>🏀 Баскетбол</Typography>
                        </li>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onSelect={() => onSelect('mma')}
                        asChild
                        className='focus:bg-primary-dark-secondary focus-visible:bg-primary-dark-secondary cursor-pointer flex px-3 py-2 rounded-lg transition-colors ease-in-out duration-200 hover:bg-primary-dark-secondary'
                    >
                        <li>
                            <Typography>🥊 MMA</Typography>
                        </li>
                    </DropdownMenuItem>
                </ul>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};