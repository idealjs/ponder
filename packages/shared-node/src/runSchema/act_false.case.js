const action = (helper) => {
  const { payload, setNextPayload, setResult, setError } = helper;

  setNextPayload({
    hello: "world",
    inComePayload: payload,
  });

  setResult({ result: "result object" });

  setError({ error: "error object" });

  return false;
};

export default action;
