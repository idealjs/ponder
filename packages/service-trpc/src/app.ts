import cors from "@fastify/cors";
import { appRouter, PrismaClient } from "@idealjs/ponder-shared-node";
import { fastifyTRPCPlugin } from "@trpc/server/adapters/fastify";
import { FastifyInstance } from "fastify";
import { IncomingMessage, Server, ServerResponse } from "http";
import {
  Http2SecureServer,
  Http2ServerRequest,
  Http2ServerResponse,
} from "http2";

import http from "./http";
import http2 from "./http2";
import prismaPlugin from "./prismaPlugin";
import routes from "./routes";

const app = (
  process.env.HTTP2 === "true" ? http2() : http()
) as FastifyInstance<
  Http2SecureServer | Server,
  IncomingMessage | Http2ServerRequest,
  ServerResponse | Http2ServerResponse
>;

app.register(cors);
app.register(routes);

app.register(fastifyTRPCPlugin, {
  prefix: "/trpc",
  trpcOptions: {
    router: appRouter,
    createContext: () => {
      return {
        prisma: new PrismaClient(),
      };
    },
  },
});

app.register(prismaPlugin);

export default app;
