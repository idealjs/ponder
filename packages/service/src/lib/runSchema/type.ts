import type { State } from "@prisma/client";

export interface IPipelineData<Payload> {
  state?: State | null;
  payload: Payload;
  actionStack?: readonly string[];
}
