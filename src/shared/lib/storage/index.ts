export const storage = {
    get<T>(key: string): T | undefined {
        try {
            const raw = localStorage.getItem(key);
            return raw ? (JSON.parse(raw) as T) : undefined;
        } catch {
            return undefined;
        }
    },
    set<T>(key: string, value: T): void {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch {
            // место кончилось / приватный режим — молча игнорируем
        }
    },
};
