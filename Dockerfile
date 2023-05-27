FROM node:18 AS builder
WORKDIR workspace

COPY package.json .
COPY yarn.lock .
COPY lerna.json .
COPY tsconfig.json .
COPY .yarn .yarn
COPY .yarnrc.yml .

COPY ./packages/db/package.json ./packages/db/package.json
COPY ./packages/db/package.json ./packages/db/tsconfig.json

COPY ./packages/service/package.json ./packages/service/package.json
COPY ./packages/service/package.json ./packages/service/tsconfig.json

COPY ./packages/studio/package.json ./packages/studio/package.json
COPY ./packages/studio/package.json ./packages/studio/tsconfig.json

RUN yarn install --immutable

COPY ./packages/db ./packages/db

COPY ./packages/service ./packages/service

COPY ./packages/studio ./packages/studio

RUN yarn workspace @idealjs/ponder-db run prisma generate

# service
FROM builder AS service

WORKDIR workspace

CMD ["yarn", "workspace", "@idealjs/ponder-service", "run", "dev"]

# studio
FROM builder AS studio

WORKDIR workspace

CMD ["yarn", "workspace", "@idealjs/ponder-studio", "run", "dev"]

# test
FROM builder AS test

WORKDIR workspace

RUN yarn lerna run generate

CMD ["yarn", "workspaces", "foreach", "run", "coverage"]

# seed-db
FROM builder AS seed-db

WORKDIR workspace

CMD ["yarn", "workspace", "@idealjs/ponder-db", "run", "migrate", "deploy"]
