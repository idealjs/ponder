import Fastify from "fastify";

import querystringParser from "./querystringParser";

const createServer = () => {
  const fastify = Fastify({
    logger: true,
    querystringParser,
  });

  return fastify;
};

export default createServer;
