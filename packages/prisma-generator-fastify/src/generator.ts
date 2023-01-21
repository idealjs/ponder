import { generatorHandler, GeneratorOptions } from "@prisma/generator-helper";
import { logger } from "@prisma/internals";
import path from "path";
import { generate as prismaZodGenerator } from "prisma-zod-generator/lib/prisma-generator";

import { GENERATOR_NAME } from "./constants";
import genFastify from "./helpers/genFastify";
import genPrismaPlugin from "./helpers/genPrismaPlugin";
import genRoutesExport from "./helpers/genRoutesExport";
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
    await prismaZodGenerator(options);

    options.dmmf.datamodel.models.forEach(async (info) => {
      const content = await genFastify(info);
      const writeLocation = path.join(
        options.generator.output?.value!,
        `routes/${info.name}.ts`
      );

      await writeFileSafely(writeLocation, content);
    });
    await writeFileSafely(
      path.join(options.generator.output?.value!, "prismaPlugin.ts"),
      await genPrismaPlugin()
    );
    await writeFileSafely(
      path.join(options.generator.output?.value!, "routes/index.ts"),
      await genRoutesExport(options.dmmf.datamodel.models)
    );
  },
});
