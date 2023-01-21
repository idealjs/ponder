import { generatorHandler, GeneratorOptions } from "@prisma/generator-helper";
import { logger } from "@prisma/internals";
import path from "path";

import { GENERATOR_NAME } from "./constants";
import { genEnum } from "./helpers/genEnum";
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
    options.dmmf.datamodel.enums.forEach(async (enumInfo) => {
      const tsEnum = await genEnum(enumInfo);
      const writeLocation = path.join(
        options.generator.output?.value!,
        `${enumInfo.name}.ts`
      );

      await writeFileSafely(writeLocation, tsEnum);
    });

    options.dmmf.datamodel.models.forEach(async(modelInfo)=>{
      
    })
  },
});
