import { DMMF } from "@prisma/generator-helper";
import ejs from "ejs";
import path from "path";

export const genEnum = async ({ name, values }: DMMF.DatamodelEnum) => {
  return await ejs.renderFile(
    path.resolve(__dirname, "../templates/getEnum.ejs"),
    {
      name,
      values,
    }
  );
};
