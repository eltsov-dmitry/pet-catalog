import type { AppDispatch, RootState } from '@/application/store';
import { bindActionCreators, type ActionCreatorsMapObject } from '@reduxjs/toolkit';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export const createActionsHook = <T extends ActionCreatorsMapObject>(actions: T) => {
    return (): T => {
        const dispatch = useAppDispatch();
        return useMemo(() => bindActionCreators(actions, dispatch), [dispatch]);
    };
};
