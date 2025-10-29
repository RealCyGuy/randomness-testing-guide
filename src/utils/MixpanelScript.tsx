"use client";

import mixpanel from "mixpanel-browser";
import { environmentVariables } from "@/src/utils/environmentVariables";

export function MixpanelScript() {
  if (typeof window !== "undefined") {
    const keyExists = environmentVariables.mixpanelToken !== "";
    const isNotLocalhost =
      !window.location.host.includes("localhost") &&
      !window.location.host.includes("192.168");
    if (keyExists && isNotLocalhost) {
      // @ts-expect-error
      mixpanel.init(environmentVariables.mixpanelToken, {
        autocapture: true,
      });
    }
  }
  return <></>;
}
