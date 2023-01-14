import Router from "@koa/router";

const router = new Router();

router.get("/health", async (ctx, next) => {
  ctx.body = { alive: true };
  next();
});

export default router;
