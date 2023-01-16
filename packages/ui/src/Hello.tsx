import { trpc } from "./App";

const Hello = () => {
  const result = trpc.action.findFirstAction.useQuery({});

  return <div>Hello</div>;
};

export default Hello;
