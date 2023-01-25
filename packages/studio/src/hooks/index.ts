import type { Prisma } from "@idealjs/ponder-shared-node";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

import { useSetSchemas } from "../store";

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
  const setSchemas = useSetSchemas();
  action.useActionQuery();
  // useEffect(() => {
  //   setSchemas(result.data);
  // }, [result.data, setSchemas]);
};

export const action = {
  useActionQuery: (query?: Prisma.ActionFindManyArgs) => {
    return useQuery({
      queryKey: ["action", query],
    });
  },
  useActionMutate: () => {
    useMutation({});
  },
};
