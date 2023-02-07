import { useSwrManySchema } from "@idealjs/ponder-shared-browser";
import { useEffect } from "react";

import schemaQuery from "../features/schemaQuery";
import { useSetSchemas } from "../store";

export const useQuerySchemas = () => {
  const setSchemas = useSetSchemas();
  const { data, error } = useSwrManySchema(schemaQuery);
  useEffect(() => {
    if (!error) {
      setSchemas(data);
    }
  }, [data, error, setSchemas]);
};
