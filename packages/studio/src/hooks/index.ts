import { useSwrManySchema } from "@idealjs/ponder-shared-browser";
import { useEffect } from "react";

import { useSetSchemas } from "../store";

const query = {
  include: {
    states: true,
    transitions: true,
    actions: true,
  },
};

export const useQuerySchemas = () => {
  const setSchemas = useSetSchemas();
  const { data, error } = useSwrManySchema(query);
  useEffect(() => {
    if (!error) {
      setSchemas(data);
    }
  }, [data, error, setSchemas]);
};
