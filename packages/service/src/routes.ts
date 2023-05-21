import { FastifyPluginCallback } from "fastify";
import { z } from "zod";

import prisma from "./lib/prisma";
import runSchema from "./lib/runSchema";

const routes: FastifyPluginCallback = async (fastify) => {
  fastify.get("/health", () => {
    return { alive: 1 };
  });

  fastify.post(
    "/task",
    {
      schema: {
        body: z.object({
          schemaId: z.string(),
        }),
      },
    },
    async (request) => {
      const { schemaId } = request.body as { schemaId: string };
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
    }
  );
};

export default routes;
