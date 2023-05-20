import { DMMF } from "@prisma/generator-helper";
import ejs from "ejs";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

export const genSWRHelper = async ({ name }: DMMF.Model) => {
  return await ejs.renderFile(
    path.resolve(__dirname, "../templates/genSWRHelper.ejs"),
    {
      name,
    }
  );
};

export default genSWRHelper;
