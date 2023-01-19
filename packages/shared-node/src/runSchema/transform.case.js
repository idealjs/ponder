const action = (helper) => {
  const { payload, setNextPayload, setResult } = helper;
  const { rule, count } = payload;
  setNextPayload({ ...payload, count: payload.count + 1 });
  setResult({
    count: payload.count,
  });
  return rule[count];
};

export default action;
