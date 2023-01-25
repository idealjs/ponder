import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { runSchema } from "@idealjs/ponder-shared-node";
import { Type } from "@sinclair/typebox";

import prisma from "./prisma";

const routes: FastifyPluginAsyncTypebox = async (fastify) => {
  fastify.get("/health", () => {
    return { alive: 1 };
  });

  fastify.post(
    "/task",
    {
      schema: {
        body: Type.Object({
          schemaId: Type.String(),
        }),
      },
    },
    async (request) => {
      const { schemaId } = request.body;
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
