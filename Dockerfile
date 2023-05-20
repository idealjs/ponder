FROM node:16 AS builder
WORKDIR workspace

COPY package.json .
COPY yarn.lock .
COPY lerna.json .
COPY tsconfig.json .

COPY ./packages/shared/package.json ./packages/shared/package.json
COPY ./packages/shared/package.json ./packages/shared/tsconfig.json

COPY ./packages/service/package.json ./packages/service/package.json
COPY ./packages/service/package.json ./packages/service/tsconfig.json

COPY ./packages/studio/package.json ./packages/studio/package.json
COPY ./packages/studio/package.json ./packages/studio/tsconfig.json

RUN yarn install --frozen-lockfile --cache-folder .yarn

COPY ./packages/shared ./packages/shared

COPY ./packages/service ./packages/service

COPY ./packages/studio ./packages/studio

RUN yarn install --frozen-lockfile --cache-folder .yarn

RUN yarn lerna run generate

# service
FROM builder AS service

WORKDIR workspace/packages/service

CMD ["yarn", "ts-node", "src/index.ts"]

# studio
FROM builder AS studio

WORKDIR workspace/packages/studio

CMD ["yarn", "dev"]

# test
FROM builder AS test

WORKDIR workspace

RUN yarn lerna run generate

CMD ["yarn", "lerna", "run", "coverage"]

# seed-db
FROM builder AS seed-db

WORKDIR workspace/packages/shared

CMD ["yarn", "prisma", "migrate", "reset", "--force"]
