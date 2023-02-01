import Fastify from "fastify";
import fs from "fs";
import path from "path";

import querystringParser from "./querystringParser";

const createServer = () => {
  const options = {
    key: fs.readFileSync(path.resolve(__dirname, "../server.key")),
    cert: fs.readFileSync(path.resolve(__dirname, "../server.crt")),
  };
  const fastify = Fastify({
    logger: true,
    http2: true,
    https: options,
    querystringParser,
  });

  return fastify;
};

export default createServer;
