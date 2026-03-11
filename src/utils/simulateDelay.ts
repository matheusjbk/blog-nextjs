import { logColor } from "./logColor";

export async function simulateDelay(miliseconds: number = 0, verbose = false) {
  if (miliseconds <= 0) return;

  if (verbose) logColor(`Delaying for ${miliseconds}ms...`);

  await new Promise(resolve => setTimeout(resolve, miliseconds));
}
