import { GeneratorType } from "@/src/utils/GeneratorType";

export const linearCongruentialGenerator: GeneratorType = {
  name: "Linear Congruential Generator",
  generate: (nbits: number) => {
    const a = 1664525;
    const c = 1013904223;
    const m = 2 ** 32;
    let seed = 1234;
    let result = "";
    for (let i = 0; i < nbits; i++) {
      seed = (a * seed + c) % m;
      // Extract bit from a higher position (bit 16) for better randomness
      result += ((seed >> 16) & 1).toString();
    }
    return result;
  },
};
