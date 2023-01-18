import type { Action } from "@prisma/client";

import parseModuleFromContent from "../parseModuleFromContent";

const act = async (
  action: Action,
  helper: {
    payload: any;
    setNextPayload: (payload: any) => void;
    setResult: (result: string) => void;
    setError: (error: string) => void;
  }
) => {
  try {
    if (action.content) {
      const module = await parseModuleFromContent(action.content);
      return module.default(helper);
    }
    return false;
  } catch (error) {
    return false;
  }
};

export default act;
