import app from "./app";

const port = 3010;

const callback = (error: Error | null) => {
  if (error) {
    console.error(error);
    return;
  }
  console.debug(`[debug] server is listen on port ${port}`);
};

app.listen({ port }, callback);
