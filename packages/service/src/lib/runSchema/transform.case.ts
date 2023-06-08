import { createAction } from "../effect";
import FaildError from "../effect/FaildError";

const action = createAction({
  effect: (input: { rule: { [key: number]: boolean }; count: number }) => {
    const { rule, count } = input;
    if (rule[count] === false) {
      throw new FaildError({
        rule,
        count,
      });
    }
    return {
      rule,
      count,
    };
  },
  clean: (input, stack) => {
    return input;
  },
});

export default action;
