import { DMMF } from "@prisma/generator-helper";
import ejs from "ejs";
import path from "path";

export const genSWRHelper = async ({ name }: DMMF.Model) => {
  return await ejs.renderFile(
    path.resolve(__dirname, "../templates/genSWRHelper.ejs"),
    {
      name,
    }
  );
};

export default genSWRHelper;
