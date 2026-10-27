# qalight — учёт запчастей (клон v1.qalight.com.ua)

Клон сайта <http://v1.qalight.com.ua> — система учёта запчастей на Next.js 15 (App Router) + TypeScript.
Разметка и стили AdminLTE 2 / Bootstrap 3.3.2 взяты с оригинала без изменений.

## Быстрый старт

```bash
pnpm install
pnpm dev
```

Откройте <http://localhost:3000> — произойдёт редирект на `/login`.

**Данные для входа:** `student` / `909090` (другие пользователи — в `src/data/users.json`).

## Скрипты

| Команда          | Описание                        |
| ---------------- | ------------------------------- |
| `pnpm dev`       | Dev-сервер                      |
| `pnpm build`     | Production-сборка               |
| `pnpm start`     | Запуск production-сборки        |
| `pnpm typecheck` | Проверка типов (`tsc --noEmit`) |

Те же команды доступны через [just](https://github.com/casey/just): `just --list`.

```bash
just install     # pnpm install
just dev         # dev-сервер
just check       # typecheck + build
just start       # production, порт по умолчанию 3000 (PORT=8080 just start)
just clean       # удалить .next
just fresh       # снести node_modules и переустановить
```

> `pnpm lint` не используется: ESLint в проекте не настроен, а `next lint` в Next.js 15
> интерактивно предлагает установку конфига.

## Данные и CRUD

Данные выгружены с оригинала в `src/data/*.json` и загружаются в память при первом обращении.
Слой доступа — `src/lib/db.ts` (паттерн «репозиторий»), его достаточно заменить на Prisma/Drizzle
без изменения страниц и server action `src/app/actions.ts`.

- По умолчанию изменения (create/update/delete) живут в памяти процесса.
- Для сохранения между перезапусками в dev: `DATA_STORE=file pnpm dev` (пишет `.data/state.json`).
- На Vercel память не сохраняется между инстансами — для продакшена нужна внешняя БД.

> Данные — снимок оригинала на момент выгрузки. Живой сайт постоянно правят другие тестировщики,
> поэтому список записей может отличаться от текущего состояния оригинала.

## Деплой на Vercel

1. Импортируйте репозиторий в Vercel — фреймворк определится как Next.js, пакетный менеджер — pnpm
   (по `packageManager` в `package.json`), настройки не нужны.
2. Опционально задайте переменную окружения `AUTH_SECRET` (если не задана — используется
   dev-значение `qalight-dev-secret`). Токен сессии подписывается HMAC-SHA256.
3. Deploy.

## Структура

```
src/
  app/
    (auth)/login/          страница входа (layout с login-page)
    (main)/                защищённые страницы (layout skin-blue)
    login_check/route.ts   POST-обработчик формы входа
    logout/route.ts        выход
    actions.ts             server action saveEntity (CRUD всех сущностей)
  components/              AdminLTE-разметка и формы
  data/                    выгруженные данные
  lib/                     типы, репозитории, форматирование, сессия
  middleware.ts            защита страниц (кроме /login, /login_check, /logout)
public/bundles/ap/         CSS/JS/шрифты/картинки оригинала
```

## Отличия от оригинала

- `dictionary/installation` (и её `/edit`-страницы) на оригинале падают с 500 — клон отдаёт ту же
  страницу ошибки Symfony (перехват в `src/middleware.ts`, разметка — `src/lib/symfony-error.ts`).
- `dictionary/service` на оригинале периодически отдаёт 500 — здесь реализована рабочая страница.
- Ссылки относительные (`/dictionary/apparat/edit/2`) вместо абсолютных `http://v1.qalight.com.ua/...`.
- IonIcons-шрифты на оригинале отсутствуют (404) — также не подключены.
