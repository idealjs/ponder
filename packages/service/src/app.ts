import cors from "@fastify/cors";
import { FastifyInstance } from "fastify";
import { IncomingMessage, Server, ServerResponse } from "http";
import {
  Http2SecureServer,
  Http2ServerRequest,
  Http2ServerResponse,
} from "http2";

import prismaPlugin from "./generated/prismaPlugin";
import http from "./http";
import http2 from "./http2";
import routes from "./routes";

const app = (
  process.env.HTTP2 === "true" ? http2() : http()
) as FastifyInstance<
  Http2SecureServer | Server,
  IncomingMessage | Http2ServerRequest,
  ServerResponse | Http2ServerResponse
>;

app.register(cors);
app.register(prismaPlugin);
app.register(routes);


export default app;
