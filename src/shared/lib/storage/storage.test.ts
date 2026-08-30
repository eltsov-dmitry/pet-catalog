import { beforeEach, expect, test, vi } from 'vitest';
import { storage } from './index';

beforeEach(() => localStorage.clear());

test('значение переживает запись и чтение', () => {
    storage.set('key', { a: 1 });

    expect(storage.get('key')).toEqual({ a: 1 });
});

test('отсутствующий ключ даёт undefined', () => {
    expect(storage.get('нет-такого')).toBeUndefined();
});

test('битый JSON не роняет приложение', () => {
    localStorage.setItem('key', '{не json');

    expect(storage.get('key')).toBeUndefined();
});

test('запись в переполненное хранилище не бросает исключение', () => {
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
        throw new DOMException('QuotaExceededError');
    });

    expect(() => storage.set('key', 'value')).not.toThrow();
});
