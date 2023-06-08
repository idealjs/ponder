export enum EffectStatus {
  SUCCESS = "SUCCESS",
  FAILD = "FAILD",
}

export interface IEffectResult<Data = unknown> {
  status: EffectStatus;
  data: Data;
}
