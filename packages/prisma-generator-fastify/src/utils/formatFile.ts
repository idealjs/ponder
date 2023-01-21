import prettier from "prettier";

export const formatFile = (content: string): Promise<string> => {
  return new Promise((res, rej) => {
    try {
      const formatted = prettier.format(content, {
        parser: "typescript",
      });

      res(formatted);
    } catch (error) {
      rej(error);
    }
  });
};
