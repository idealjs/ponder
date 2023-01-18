import type { AppRouter } from "@idealjs/ponder-shared-node";
import { createTRPCReact } from "@trpc/react-query";

const trpc = createTRPCReact<AppRouter>();

export default trpc;
