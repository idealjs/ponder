import type { AppRouter } from "@idealjs/ponder-shared-node";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createTRPCReact, httpBatchLink } from "@trpc/react-query";

import Hello from "./Hello";

export const trpc = createTRPCReact<AppRouter>();

const queryClient = new QueryClient();
const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: "http://localhost:3010/trpc",
      // optional
    }),
  ],
});

function App() {
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <div className="App text-3xl font-bold underline">
          Hello world!
          <Hello />
        </div>
      </QueryClientProvider>
    </trpc.Provider>
  );
}

export default App;
