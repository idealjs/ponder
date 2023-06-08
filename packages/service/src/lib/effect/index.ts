import createClean from "./createClean";
import createEffect from "./createEffect";
import { IEffectResult } from "./type";

export const createAction = <Input, Data>(params: {
  effect: (input: Input) => Data;
  clean: (input: Input, stack: IEffectResult<Data>[]) => Data;
}) => {
  return {
    effect: createEffect(params.effect),
    clean: createClean<Input, Data>(params.clean),
  };
};
