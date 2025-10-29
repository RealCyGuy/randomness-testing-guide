import { GeneratorType } from "@/src/utils/GeneratorType";

export const allZerosGenerator: GeneratorType = {
  name: "All Zeros",
  generate: (nbits: number) => {
    return "0".repeat(nbits);
  },
};
