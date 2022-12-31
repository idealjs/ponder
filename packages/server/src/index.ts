import http from "./http";
import http2 from "./http2";

const port = 3010;

const callback = () => {
  console.debug(`[debug] server is listen on port ${port}`);
};

process.env.HTTP2 === "true"
  ? http2.listen(port, callback)
  : http.listen(port, callback);
