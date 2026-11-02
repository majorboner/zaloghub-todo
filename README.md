# ZalogHub

Список задач React/TS. Сделано примерно за час работы.

## Демо

https://majorboner.github.io/zaloghub-todo/

## Запуск

```bash
npm install
npm run dev
```

запустится на `http://localhost:5173`

## Структура

```
src/
├── App.tsx        — корневой компонент: форма, фильтры, список
├── useTodos.ts    — хук состояния задач + синхронизация с localStorage
└── types.ts       — типы Todo и Filter
```
