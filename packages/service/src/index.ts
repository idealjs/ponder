import app from "./app";

const port = 3100;

const callback = (err: Error | null) => {
  console.debug(`[debug] server is listen on port ${port}`);
  if (err) {
    console.error(err);
  }
};

app.listen({ port }, callback);
