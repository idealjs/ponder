import { EffectStatus } from "../effect/type";
import parseModuleFromContent from "../parseModuleFromContent";
import { IPipelineData } from "./type";

interface IActionContent<Payload, Data> {
  effect: (helper: { payload: Payload }) => {
    status: EffectStatus;
    data?: Data;
  };
  clean:(helper: { payloads: Payload[] })=>{

  }
}

const act = async (
  action: { content: string },
  currentPipelineData: IPipelineData<unknown>
): Promise<{
  status: EffectStatus;
  error?: unknown;
  data?: unknown;
}> => {
  try {
    const module = (await parseModuleFromContent(action.content)) as {
      default: IActionContent<unknown, {}>;
    };
    const result = module.default.effect({
      payload: currentPipelineData.payload,
    });
    return result;
  } catch (error) {
    return {
      status: EffectStatus.FAILD,
      error: error,
    };
  }
};

export default act;
