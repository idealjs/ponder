import { FastifyPluginCallback } from "fastify";

const routes: FastifyPluginCallback = async (fastify) => {
  fastify.get("/health", () => {
    return { alive: 1 };
  });
};

export default routes;
