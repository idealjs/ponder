import { Action } from "@prisma/client";

import parseModuleFromContent from "../parseModuleFromContent";
import { Optional } from "../type";

export type TransformAction = Optional<
  Pick<Action, "id" | "content">,
  "content"
>;

const act = async (
  action: TransformAction,
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
