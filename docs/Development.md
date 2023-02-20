# Development

> These commands should be executed in the project root directory.

## Prepare Environment

```
cp dev.env packages/service/.env
cp dev.env packages/studio-service/.env
cp dev.env packages/shared-node/.env
cp dev.env packages/studio/.env
```

## Install Deps

```
yarn
```

## Run Database

```
docker compose --env-file .env up db
```

### Migration DB Schema

```
cd packages/shared-node && yarn prisma migrate deploy && cd -
```
