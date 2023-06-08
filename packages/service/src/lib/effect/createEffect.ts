import FaildError from "./FaildError";
import { EffectStatus, IEffectResult } from "./type";

const createEffect = <Input, ReturnData>(
  func: (input: Input) => ReturnData
) => {
  return (input: Input): IEffectResult<ReturnData> => {
    try {
      return {
        status: EffectStatus.SUCCESS,
        data: func(input),
      };
    } catch (error) {
      if (error instanceof FaildError) {
        return {
          status: EffectStatus.FAILD,
          data: error.data,
        };
      }
      throw error;
    }
  };
};

export default createEffect;
