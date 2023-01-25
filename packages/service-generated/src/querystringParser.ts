import qs from "qs";

const querystringParser = (data: string) => {
  return qs.parse(data, {
    decoder(value: string) {
      if (/^(\d+|\d*\.\d+)$/.test(value)) {
        return parseFloat(value);
      }

      let keywords = {
        true: true,
        false: false,
        null: null,
        undefined: undefined,
      };
      if (value in keywords) {
        return keywords[value as keyof typeof keywords];
      }
      return value;
    },
  });
};

export default querystringParser;
