import { DMMF } from "@prisma/generator-helper";
import ejs from "ejs";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

export const genFastifyRoutes = async ({ name }: DMMF.Model) => {
  return await ejs.renderFile(
    path.resolve(__dirname, "../templates/genFastifyRoutes.ejs"),
    {
      name,
    }
  );
};

export default genFastifyRoutes;
