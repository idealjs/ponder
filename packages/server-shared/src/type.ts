export interface ISchema {
  states: Record<string, IState>;
  transitions: Record<string, ITransition>;
  actions: Record<string, IAction>;
}

export interface IState {
  id: string;
  name: string;
  transitions: string[];
}

export interface ITransition {
  id: string;
  from: string;
  faild: string;
  success: string;
  action: string;
}

export interface IAction {
  id: string;
  url?: string;
  content?: string;
}
