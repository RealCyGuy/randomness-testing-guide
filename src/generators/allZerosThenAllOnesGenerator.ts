import { GeneratorType } from "@/src/utils/GeneratorType";

export const allZerosThenAllOnesGenerator: GeneratorType = {
  name: "All Zeros Then All Ones",
  generate: (nbits: number) => {
    const halfBits = Math.floor(nbits / 2);
    const zeros = "0".repeat(halfBits);
    const ones = "1".repeat(nbits - halfBits);
    return zeros + ones;
  },
};
