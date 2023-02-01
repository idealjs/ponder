# Development

> These commands should be executed in the project root directory.

## Prepare Environment

```
cp packages/service/dev.env packages/service/.env
cp packages/studio-service/dev.env packages/studio-service/.env
cp packages/shared-node/dev.env packages/shared-node/.env
```

## Install Deps

```
yarn
```

## Run Database

```
docker-compose up
```

### Migration DB Schema

```
cd packages/shared-node && yarn prisma migrate deploy && cd -
```
