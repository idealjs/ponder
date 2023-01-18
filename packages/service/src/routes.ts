import { runSchema } from "@idealjs/ponder-shared-node";
import { FastifyPluginCallback } from "fastify";
import zod from "zod";

import prisma from "./prisma";

const routes: FastifyPluginCallback = async (fastify) => {
  fastify.get("/health", () => {
    return { alive: 1 };
  });

  fastify.post("/task", async (request) => {
    const bodySchema = zod.object({
      schemaId: zod.string(),
    });
    const body = bodySchema.parse(request.body);
    const { schemaId } = body;
    const schema = await prisma.schema.findUnique({
      where: {
        id: schemaId,
      },
      include: {
        states: true,
        transitions: true,
        actions: true,
      },
    });

    if (schema == null) {
      return {};
    }

    const result = runSchema(schema);
    return {
      result,
    };
  });
};

export default routes;
