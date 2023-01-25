import { DMMF } from "@prisma/generator-helper";
import ejs from "ejs";
import path from "path";

export const genFastifyRoutes = async ({ name }: DMMF.Model) => {
  return await ejs.renderFile(
    path.resolve(__dirname, "../templates/genFastifyRoutes.ejs"),
    {
      name,
    }
  );
};

export default genFastifyRoutes;
