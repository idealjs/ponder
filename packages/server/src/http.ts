import http from "http";

import app from "./app";

const server = http.createServer(app.callback());

export default server;
