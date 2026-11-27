import { describe, it, expect } from "vitest";
import { UI } from "../src/lib/i18n";

describe("i18n static UI dictionary", () => {
  it("has identical non-empty keys in id and en", () => {
    const idKeys = Object.keys(UI.id).sort();
    const enKeys = Object.keys(UI.en).sort();
    expect(idKeys).toEqual(enKeys);
    for (const k of idKeys) {
      expect(UI.id[k].trim().length).toBeGreaterThan(0);
      expect(UI.en[k].trim().length).toBeGreaterThan(0);
    }
  });
});
