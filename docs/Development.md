# Development

> These commands should be executed in the project root directory.

## 1. Install Deps

```
yarn
```

## 2. Prepare Environment

### 2.1 Copy DB Env
```
cp dev.env .env
```

### 2.2 Write Frontend Dev Env

```
echo VITE_BACKEND_BASE_URL=http://localhost:3010 >> packages/studio/.env
```

## 3. Run Local Dev Database

```
docker compose --env-file dev.env up db
```

### 4. Migration DB Schema

```
yarn prisma migrate deploy
```

### 5. Generate Code

```
yarn prisma generate
```

### 6. Start Development

```
yarn dev
```
