class FaildError<Data extends {}> extends Error {
  public data: Data;
  constructor(data: Data) {
    super("Run Action's Effect Faild");
    this.data = data;
  }
}

export default FaildError;
