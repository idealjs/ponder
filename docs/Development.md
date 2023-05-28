# Quick Start

> These commands should be executed in the project root directory.

## 1. Install Deps

```
yarn
```

## 2. Prepare Environment

### 2.1 Copy DB Env

```
cp dev.env packages/db/.env
```

### 2.2 Write Frontend Dev Env

```
echo VITE_BACKEND_BASE_URL=http://localhost:3010 >> packages/studio/.env
```

## 3. Run Local Dev Database

```
docker compose --env-file dev.env up db
```

## 4. Migration DB Schema

```
yarn workspace @idealjs/ponder-db run prisma migrate deploy
```

## 5. Generate Code

```
yarn workspace @idealjs/ponder-db run prisma generate
```

## 6. Start Development

```
yarn dev
```


# DB Migration

## 1. Create a Migration Record

> Check How To Customize Migration If You Need. 
> 
> https://www.prisma.io/docs/guides/migrate/developing-with-prisma-migrate/customizing-migrations

```
yarn workspace @idealjs/ponder-db run prisma migrate dev --create-only
```

## 2. Apply To DB

> Data May Be Lost!!!

```
yarn workspace @idealjs/ponder-db run prisma migrate deploy
```

## 3. Generate Code

```
yarn workspace @idealjs/ponder-db run prisma generate
```
