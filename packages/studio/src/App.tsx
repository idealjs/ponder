import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/react-query";

import { Schemas } from "./features";
import trpc from "./trpc";

const queryClient = new QueryClient();
const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: "http://localhost:3010/trpc",
    }),
  ],
});

function App() {
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <div className="App text-3xl font-bold underline">
          <Schemas />
        </div>
      </QueryClientProvider>
    </trpc.Provider>
  );
}

export default App;
