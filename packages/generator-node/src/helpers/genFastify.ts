import { DMMF } from "@prisma/generator-helper";
import ejs from "ejs";
import path from "path";

export const genFastify = async ({ name }: DMMF.Model) => {
  return await ejs.renderFile(
    path.resolve(__dirname, "../templates/genFastify.ejs"),
    {
      name,
    }
  );
};

export default genFastify;
