import { generatorHandler, GeneratorOptions } from "@prisma/generator-helper";
import { logger } from "@prisma/internals";
import path from "path";

import { GENERATOR_NAME } from "./constants";
import genFastifyRoutes from "./helpers/genFastifyRoutes";
import genFastifyRoutesIndex from "./helpers/genFastifyRoutesIndex";
import genPrismaPlugin from "./helpers/genPrismaPlugin";
import { writeFileSafely } from "./utils/writeFileSafely";

generatorHandler({
  onManifest() {
    logger.info(`${GENERATOR_NAME}:Registered`);
    return {
      defaultOutput: "../generated",
      prettyName: GENERATOR_NAME,
    };
  },
  onGenerate: async (options: GeneratorOptions) => {
    options.dmmf.datamodel.models.forEach(async (info) => {
      const content = await genFastifyRoutes(info);
      const writeLocation = path.join(
        options.generator.output?.value!,
        `routes/${info.name}.ts`
      );

      await writeFileSafely(writeLocation, content);
    });
    await writeFileSafely(
      path.join(options.generator.output?.value!, "routes/index.ts"),
      await genFastifyRoutesIndex(options.dmmf.datamodel.models)
    );
    await writeFileSafely(
      path.join(options.generator.output?.value!, "prismaPlugin.ts"),
      await genPrismaPlugin(options.dmmf.datamodel.models)
    );
  },
});
