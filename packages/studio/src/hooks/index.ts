import { useFindManySchema } from "@idealjs/ponder-shared-browser";
import { useContext, useEffect } from "react";

import { BackendBaseUrlContext, useSetSchemas } from "../store";

export const useBackendBaseURL = () => {
  return useContext(BackendBaseUrlContext);
};

const query = {
  include: {
    states: true,
    transitions: true,
    actions: true,
  },
};

export const useQuerySchemas = () => {
  const setSchemas = useSetSchemas();
  const backendBaseURL = useBackendBaseURL();
  const { data, error } = useFindManySchema(query, backendBaseURL);
  useEffect(() => {
    if (!error) {
      setSchemas(data);
    }
  }, [data, error, setSchemas]);
};
