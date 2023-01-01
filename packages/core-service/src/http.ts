import http from "http";

import app from "./app";

const createServer = () => {
  const server = http.createServer(app.callback());
  return server;
};

export default createServer;
