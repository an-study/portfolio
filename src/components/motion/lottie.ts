// Local-bundled lottie-web
import lottie from "lottie-web";

export type LottiePlayer = typeof lottie;

export async function loadLottie(): Promise<LottiePlayer> {
  // Keep async signature for compatibility with existing callers
  return lottie;
}

export function asset(path: string) {
  const base = import.meta.env.BASE_URL || "/";
  const clean = path.startsWith("/") ? path.slice(1) : path;
  return new URL(clean, window.location.origin + base).toString();
}
