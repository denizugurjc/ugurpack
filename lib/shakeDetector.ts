// lib/shakeDetector.ts
import { Accelerometer } from "expo-sensors";

export function subscribeToShake(callback: () => void) {
  let last = Date.now();

  const subscription = Accelerometer.addListener(({ x, y, z }) => {
    const totalForce = Math.abs(x) + Math.abs(y) + Math.abs(z);
    const now = Date.now();

    if (totalForce > 2.5 && now - last > 1000) {
      last = now;
      callback();
    }
  });

  Accelerometer.setUpdateInterval(200);

  return () => subscription.remove();
}
