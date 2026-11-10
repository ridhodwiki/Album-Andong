import { spawnSync } from "node:child_process";
import { expect, it } from "vitest";

it("refuses to generate a secret package without an explicit password", () => {
  const result = spawnSync(process.execPath, ["scripts/enkripsi-rahasia.ts"], {
    env: { ...process.env, RAHASIA_SANDI: "" },
    encoding: "utf8",
  });
  expect(result.status).toBe(1);
  expect(result.stderr).toContain("RAHASIA_SANDI wajib diisi");
});
