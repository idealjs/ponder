import ejs from "ejs";
import path from "path";

export const genPrismaPlugin = async () => {
  return await ejs.renderFile(
    path.resolve(__dirname, "../templates/genPrismaPlugin.ejs")
  );
};

export default genPrismaPlugin;
