import type { Prisma } from "@idealjs/ponder-shared-node";
import { useEffect } from "react";

import { useSetSchemas } from "../store";
import trpc from "../trpc";

const query = {
  where: {},
  include: {
    states: true,
    transitions: true,
    actions: true,
  },
};

type Schema = Prisma.SchemaGetPayload<typeof query>;

export const useQuerySchemas = () => {
  const result = trpc.schema.findManySchema.useQuery<any, Schema[]>(query);
  const setSchemas = useSetSchemas();

  useEffect(() => {
    setSchemas(result.data);
  }, [result.data, setSchemas]);
};
