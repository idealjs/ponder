import { DMMF } from "@prisma/generator-helper";
import ejs from "ejs";
import path from "path";

export const genSWRHelperIndex = async (models: DMMF.Model[]) => {
  return await ejs.renderFile(
    path.resolve(__dirname, "../templates/genSWRHelperIndex.ejs"),
    {
      names: models.map((m) => m.name),
    }
  );
};

export default genSWRHelperIndex;
