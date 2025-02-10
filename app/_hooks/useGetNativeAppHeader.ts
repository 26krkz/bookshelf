import { useEffect, useState } from "react";

export default function useGetNativeAppHeader() {
  const [isNative, setIsNative] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsNative(navigator.userAgent.includes("ExpoWebView"));
    }
  }, []);
  return { isNative };
}
