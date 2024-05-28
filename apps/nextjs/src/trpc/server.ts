import { cache } from "react";
import { cookies, headers } from "next/headers";
import { createCaller, createTRPCContext } from "@septplaces/api";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

/**
 * This wraps the `createTRPCContext` helper and provides the required context for the tRPC API when
 * handling a tRPC call from a React Server Component.
 */
const createContext = cache(async () => {
  const heads = new Headers(headers());
  heads.set("x-trpc-source", "rsc");
  const supabase = createServerComponentClient({ cookies });
  return createTRPCContext({
    supabase,
    headers: heads,
  });
});

export const api = createCaller(createContext);
