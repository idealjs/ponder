const arrayToRecord = <
  ID extends string | number | symbol = string,
  T extends { id: ID } = { id: ID }
>(
  array: T[]
): Partial<Record<T["id"], T>> => {
  return array.reduce((p, c) => {
    return {
      ...p,
      [c.id]: c,
    };
  }, {});
};

export default arrayToRecord;
