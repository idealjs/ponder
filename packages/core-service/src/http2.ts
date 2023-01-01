import fs from "fs";
import http2 from "http2";
import path from "path";

import app from "./app";

const options = {
  key: fs.readFileSync(path.resolve(__dirname, "../server.key")),
  cert: fs.readFileSync(path.resolve(__dirname, "../server.crt")),
};

const server = http2.createSecureServer(options, app.callback());

const createServer = () => {
  return server;
};

export default createServer;
