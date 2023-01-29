import { generatorHandler, GeneratorOptions } from "@prisma/generator-helper";
import { logger } from "@prisma/internals";
import path from "path";

import { GENERATOR_NAME } from "./constants";
import genSWRHelper from "./helpers/genSWRHelper";
import genSWRHelperIndex from "./helpers/genSWRHelperIndex";
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
      const content = await genSWRHelper(info);
      const writeLocation = path.join(
        options.generator.output?.value!,
        `swr/${info.name}.ts`
      );

      await writeFileSafely(writeLocation, content);
    });
    try {
      await writeFileSafely(
        path.join(options.generator.output?.value!, "swr/index.ts"),
        await genSWRHelperIndex(options.dmmf.datamodel.models)
      );
    } catch (error) {
      logger.info(error);
    }
  },
});
