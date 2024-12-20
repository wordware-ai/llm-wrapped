import { spotifyApiRouter } from "@/server/api/routers/spotify-api";
import { spotifyResultsRouter } from "@/server/api/routers/spotify-results";
import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { linkedinResultsRouter } from "./routers/linkedin-results";
import { linkedinApiRouter } from "./routers/linkedin-api";
import { tinderResultsRouter } from "./routers/tinder";
/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  spotifyApi: spotifyApiRouter,
  spotifyResults: spotifyResultsRouter,
  linkedinApi: linkedinApiRouter,
  linkedinResults: linkedinResultsRouter,
  tinderResults: tinderResultsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
