export function isLightMode(): boolean {
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
  return new URLSearchParams(location.search).get("ringan") === "1"
    || matchMedia("(prefers-reduced-motion: reduce)").matches
    || !!connection?.saveData
    || /^(slow-2g|2g|3g)$/.test(connection?.effectiveType || "");
}
