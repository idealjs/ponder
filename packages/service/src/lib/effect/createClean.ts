import FaildError from "./FaildError";
import { EffectStatus, IEffectResult } from "./type";

const createClean = <Input, ReturnData>(
  func: (input: Input, stack: IEffectResult<ReturnData>[]) => ReturnData
) => {
  return (
    input: Input,
    stack: IEffectResult<ReturnData>[]
  ): IEffectResult<ReturnData> => {
    try {
      return {
        status: EffectStatus.SUCCESS,
        data: func(input, stack),
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

export default createClean;
