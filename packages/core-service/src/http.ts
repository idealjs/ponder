import http from "http";

import app from "./app";

const server = http.createServer(app.callback());

const createServer = () => {
  return server;
};

export default createServer;
