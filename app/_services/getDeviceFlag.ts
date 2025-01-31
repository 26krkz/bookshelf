import { userAgent } from "next/server";
import { headers } from "next/headers";

export default function getDeviceFlag() {
  const { device } = userAgent({ headers: headers() });
  return device?.type === "mobile" ? "mobile" : "desktop";
}
