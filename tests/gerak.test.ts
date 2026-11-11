import { afterEach, expect, it, vi } from "vitest";
import { isLightMode } from "../src/lib/gerak";

afterEach(() => vi.unstubAllGlobals());
it.each([
  ["", false, false, "4g", false],
  ["?ringan=1", false, false, "4g", true],
  ["", true, false, "4g", true],
  ["", false, true, "4g", true],
  ["", false, false, "slow-2g", true],
  ["", false, false, "3g", true],
])("selects static mode for %s / reduced=%s / saveData=%s / %s", (search, reduced, saveData, effectiveType, expected) => {
  vi.stubGlobal("location", { search });
  vi.stubGlobal("matchMedia", () => ({ matches: reduced }));
  vi.stubGlobal("navigator", { connection: { saveData, effectiveType } });
  expect(isLightMode()).toBe(expected);
});
