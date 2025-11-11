import { useEffect, type DependencyList } from 'react';

import { backButton } from '@telegram-apps/sdk-react';

export type UseBackButtonType = (onBack: () => void, deps?: DependencyList) => void;

export const useBackButtonTelegram: UseBackButtonType = (onBack: () => void, deps = []) => {
    useEffect(() => {
        if (!backButton.isSupported()) return;

        !backButton.isMounted() && backButton.mount();

        backButton.show();
        backButton.onClick(onBack);

        return () => {
            backButton.offClick(onBack);
            backButton.hide();
        };
    }, deps);
};