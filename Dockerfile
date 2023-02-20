FROM node:16 AS builder
WORKDIR workspace

COPY package.json .
COPY yarn.lock .
COPY lerna.json .
COPY tsconfig.json .

COPY ./packages/generator-browser/package.json ./packages/generator-browser/package.json
COPY ./packages/generator-browser/package.json ./packages/generator-browser/tsconfig.json

COPY ./packages/generator-node/package.json ./packages/generator-node/package.json
COPY ./packages/generator-node/package.json ./packages/generator-node/tsconfig.json

COPY ./packages/service/package.json ./packages/service/package.json
COPY ./packages/service/package.json ./packages/service/tsconfig.json

COPY ./packages/shared-browser/package.json ./packages/shared-browser/package.json
COPY ./packages/shared-browser/package.json ./packages/shared-browser/tsconfig.json

COPY ./packages/shared-node/package.json ./packages/shared-node/package.json
COPY ./packages/shared-node/package.json ./packages/shared-node/tsconfig.json

COPY ./packages/studio/package.json ./packages/studio/package.json
COPY ./packages/studio/package.json ./packages/studio/tsconfig.json

COPY ./packages/studio-service/package.json ./packages/studio-service/package.json
COPY ./packages/studio-service/package.json ./packages/studio-service/tsconfig.json

RUN yarn install --frozen-lockfile --cache-folder .yarn

COPY ./packages/generator-browser ./packages/generator-browser

COPY ./packages/generator-node ./packages/generator-node

COPY ./packages/service ./packages/service

COPY ./packages/shared-browser ./packages/shared-browser

COPY ./packages/shared-node ./packages/shared-node

COPY ./packages/studio ./packages/studio

COPY ./packages/studio-service ./packages/studio-service

RUN yarn install --frozen-lockfile --cache-folder .yarn

RUN yarn lerna run generate

# service
FROM builder AS service

WORKDIR packages/service

CMD ["yarn", "ts-node", "src/index.ts"]

# studio-service
FROM builder AS studio-service

WORKDIR packages/studio-service

CMD ["yarn", "ts-node", "src/index.ts"]

# studio
FROM builder AS studio

WORKDIR packages/studio

CMD ["yarn", "dev"]

# test
FROM builder AS test

WORKDIR workspace

RUN yarn lerna run generate

CMD ["yarn", "lerna", "run", "coverage"]

# seed-db
FROM builder AS seed-db

WORKDIR packages/shared-node

CMD ["yarn", "prisma", "migrate", "reset", "--force"]
