import { appRouter, PrismaClient } from "@idealjs/ponder-shared-node";
import cors from "@koa/cors";
import Koa from "koa";
import { createKoaMiddleware } from "trpc-koa-adapter";

const app = new Koa();

app.use(cors());

app.use(
  createKoaMiddleware({
    router: appRouter,
    prefix: "/trpc",
    createContext: () => {
      return {
        prisma: new PrismaClient(),
      };
    },
  })
);

export default app;
