/** Server only: reads data/coaches_2026.json (built offline from CFBD; see scripts/data-src/coaches/README.md). */
import raw from "../../../data/coaches_2026.json" with { type: "json" };
import type { CoachesFile } from "./coaches.ts";

export const coachesFile = (): CoachesFile => raw as unknown as CoachesFile;
