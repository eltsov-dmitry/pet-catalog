# pet-catalog

Каталог товаров: React 19, Redux Toolkit с RTK Query, Feature-Sliced Design, сборка на Webpack,
собранном с нуля. Данные берутся из открытого [dummyjson](https://dummyjson.com).

Проект учебный и написан с конкретной целью: у меня коммерческий опыт на MobX, Vite и Vitest,
а рынок в основном спрашивает Redux и Webpack. Каталог - способ закрыть этот разрыв не по статьям,
а руками: с бесконечной подгрузкой, кэшем, инвалидацией, code splitting и замерами бандла.

## Запуск

```bash
pnpm install
pnpm dev        # http://localhost:8080
```

Прод-сборка и замеры:

```bash
pnpm build      # сборка в dist
pnpm preview    # раздача dist со сжатием, как на хостинге
pnpm size       # размеры чанков: сырой, gzip, brotli
pnpm analyze    # карта бандла в reports/bundle-report.html
```

## Стек

React 19.2, TypeScript 6.0, Redux Toolkit 2.12 с RTK Query, react-redux 9.3, react-router 8
в режиме data router, MUI 9.1 с Emotion, Tailwind 4.3, Webpack 5.107 с ts-loader.

## Архитектура

Раскладка по Feature-Sliced Design: `application` - каркас, стор, провайдеры и роуты; `pages` -
страницы; `widgets` - самостоятельные блоки вроде хедера; `features` - пользовательские действия;
`entities` - предметные сущности с их состоянием; `shared` - переиспользуемое.

Импорты идут строго вниз по слоям. Отсюда, например, `actions` пропом в
[`ProductCard`](src/shared/ui/molecules/product-card/index.tsx): карточка лежит в `shared` и не
имеет права знать о диалогах из `features`, поэтому кнопки приходят снаружи, со слоя страницы.

## Решения, которые стоит посмотреть

**Один api-слайс на приложение.** [`baseApi`](src/shared/api/baseApi.ts) создаётся однажды,
эндпоинты доклеиваются через `injectEndpoints` в
[`products/api.ts`](src/shared/api/products/api.ts). Несколько `createApi` дали бы несколько
независимых кэшей, и инвалидация перестала бы работать сквозь границы фич.

**Бесконечная подгрузка на `infiniteQuery`.** Страницы склеиваются в
[`useGetProductsListInfiniteQuery`](src/shared/api/products/api.ts), `getNextPageParam` считает
следующий `skip` от `limit` и `total` ответа. Подгрузка по `IntersectionObserver` -
[`InfiniteScroll`](src/shared/ui/molecules/infinite-scroll/index.tsx).

**Теги и гранулярная инвалидация.** Список раздаёт тег на каждый товар плюс `LIST`; создание бьёт
по `LIST`, обновление - по конкретному id, удаление - по обоим. Замерил цену такой точности:
при инвалидации одного товара `infiniteQuery` перезапрашивает **все** загруженные страницы, не одну.
Для трёх подгруженных страниц это три запроса.

**Персист без redux-persist.** Корзина, избранное и режим отображения переживают перезагрузку через
[`createListenerMiddleware`](src/application/store/persist.ts): слушатель ловит нужные экшены по
`isAnyOf` и пишет в localStorage, а обратно состояние приезжает через `preloadedState` в
[`store.ts`](src/application/store/store.ts). Отдельная библиотека тут не нужна - логика на двадцать строк.

**Фабрика хуков вместо `dispatch` в компонентах.**
[`createActionsHook`](src/shared/lib/store/hooks.ts) оборачивает экшены слайса через
`bindActionCreators`, компонент получает готовые функции и не знает про `dispatch`.

**Webpack собран руками, без CRA и шаблонов.** [`webpack.config.ts`](webpack.config.ts):
`contenthash` в именах, `publicPath` из переменной окружения (на GitHub Pages сайт живёт
в подкаталоге, и абсолютный `/main.js` туда не попадает), бюджет размеров в `performance`,
анализатор бандла под флагом.

**Code splitting по роутам и по взаимодействию.** Страницы грузятся через `route.lazy` в
[`routes`](src/application/routes/index.ts). Выпадающая корзина -
[`header-cart`](src/widgets/header/ui/header-cart.tsx) - вынесена отдельно: код подтягивается при
наведении на кнопку, монтируется по клику. Она тянет `Popper` с `@popperjs/core`, а это 88 КБ
исходников - на первой загрузке им делать нечего.

## Цифры

```
main.js                      515 КБ сырых   142 brotli
первая загрузка главной                     174 КБ
```

Замеры снимаются `pnpm size` и вкладкой Network поверх `pnpm preview`. Смотреть надо сжатый размер:
webpack в предупреждениях о бюджете считает сырые байты и про компрессию не знает.

Пара находок из этих замеров. `Tooltip` из MUI внутри рендерит `Popper` - две подсказки на кнопках
карточки затаскивали 10 КБ brotli в критический путь, заменил на `aria-label`. А ленивая загрузка
сама по себе ничего не даёт, если группировка чанков сводит модули с разными потребителями в один
файл: `splitChunks` пришлось разбирать отдельно.

## Что сознательно не сделано

- **Мутации не сохраняются.** dummyjson отвечает на POST, PATCH и DELETE успехом, но данные не меняет.
  После инвалидации приезжают исходные значения - это видно в уведомлении после каждого действия.
  Полноценный бэкенд для такого сценария у меня отдельным проектом:
  [express-ts-mock-api](https://github.com/eltsov-dmitry/express-ts-mock-api).
- **Нет авторизации и ролей** - каталог про работу с данными, а не про доступы.
- **Нет SSR.** Проект ровно про клиентскую сборку, серверный рендеринг сместил бы фокус.

## Что дальше

- Тесты на слайсы и на persist-слушатель.
- `splitChunks` с группировкой вендоров по сроку жизни: сейчас правка одного компонента меняет хеш
  всего `main`, включая React и роутер.
- Оптимистичные обновления через `onQueryStarted` и `updateQueryData`.
