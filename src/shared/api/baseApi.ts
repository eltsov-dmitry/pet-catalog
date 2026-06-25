import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl } from '@/shared/api/base';

// Базовый API-слайс: регистрируется в сторе один раз,
// конкретные эндпоинты доклеиваются через injectEndpoints в слоях фич/энтити
export const baseApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl }),
    tagTypes: ['Products'],
    endpoints: () => ({}),
});
