# Учёт запчастей — клон v1.qalight.com.ua
# Команды: just --list

set shell := ["bash", "-cu"]

port := env("PORT", "3000")

default:
    @just --list

# Установить зависимости
install:
    pnpm install

# Dev-сервер
dev:
    pnpm dev

# Production-сборка
build:
    pnpm build

# Запуск production-сборки (PORT=8080 just start)
start:
    pnpm exec next start -p {{port}}

# Проверка типов
typecheck:
    pnpm typecheck

# Типы + сборка
check: typecheck build

# Удалить артефакты сборки
clean:
    rm -rf .next

# Переустановить зависимости с нуля
fresh: clean
    rm -rf node_modules
    pnpm install
