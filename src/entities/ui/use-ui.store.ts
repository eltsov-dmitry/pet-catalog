import { useAppSelector } from '@/shared/lib/store';
import { selectUiView, useUiActions } from './ui.slice';

export const useUiStore = () => {
    const view = useAppSelector(selectUiView);
    const actions = useUiActions();

    return { view, ...actions };
};
