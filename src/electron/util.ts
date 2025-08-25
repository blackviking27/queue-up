import { app } from "electron";
import path from "path";

export function isDev(): boolean {
  console.log(process.env.NODE_ENV);
  return process.env.NODE_ENV === "dev";
}

export function getPreloadPath(): string {
  return path.join(
    app.getAppPath(),
    (isDev() ? "." : "..") + "/dist-electron/preload.cjs"
  );
}
