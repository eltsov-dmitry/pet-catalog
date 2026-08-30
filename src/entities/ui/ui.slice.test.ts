import { expect, test } from 'vitest';
import { uiActions, uiReducer } from './ui.slice';

test('режим отображения переключается', () => {
    const state = uiReducer({ view: 'grid' }, uiActions.setView('list'));

    expect(state.view).toBe('list');
});
