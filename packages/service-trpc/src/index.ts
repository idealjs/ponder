import app from "./app";

const port = 3010;

const callback = () => {
  console.debug(`[debug] server is listen on port ${port}`);
};

app.listen({ port }, callback);
