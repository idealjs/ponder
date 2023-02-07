import { FastifyInstance } from "fastify";
import {
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from "fastify-type-provider-zod";
import { IncomingMessage, Server, ServerResponse } from "http";
import {
  Http2SecureServer,
  Http2ServerRequest,
  Http2ServerResponse,
} from "http2";

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

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);
app.withTypeProvider<ZodTypeProvider>();

app.register(routes);

export default app;
