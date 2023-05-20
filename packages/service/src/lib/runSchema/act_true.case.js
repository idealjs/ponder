const action = (helper) => {
  const { payload, setNextPayload, setResult, setError } = helper;

  setNextPayload({
    hello: "world",
    inComePayload: payload,
  });

  setResult("result string");

  setError("error string");

  return true;
};

export default action;
