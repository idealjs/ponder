import "valtio";

type Snapshot<T> = T extends AnyFunction
  ? T
  : T extends AsRef
  ? T
  : T extends Promise<any>
  ? Awaited<T>
  : {
      [K in keyof T]: Snapshot<T[K]>;
    };

declare module "valtio" {
  function useSnapshot<T extends object>(p: T): Snapshot<T>;
}
