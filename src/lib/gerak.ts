export function isLightMode(): boolean {
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
  const choice = new URLSearchParams(location.search).get("ringan");
  return choice === "1"
    || matchMedia("(prefers-reduced-motion: reduce)").matches
    || (choice !== "0" && (!!connection?.saveData
    || /^(slow-2g|2g|3g)$/.test(connection?.effectiveType || "")));
}
