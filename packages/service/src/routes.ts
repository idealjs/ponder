import { parseModuleContent } from "@idealjs/ponder-shared-node";
import Router from "@koa/router";

const router = new Router();

router.get("/health", async (ctx, next) => {
  ctx.body = { alive: true };

  const module = await parseModuleContent(script);
  module.default(" arnold");
  next();
});

export default router;

const script = `const hello = (name) => {
  console.log("hello" + name);
};

export default hello;
`;
