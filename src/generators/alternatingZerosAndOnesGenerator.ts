import { GeneratorType } from "@/src/utils/GeneratorType";

export const alternatingZerosAndOnesGenerator: GeneratorType = {
  name: "Alternating Zeros and Ones",
  generate: (nbits: number) => {
    return "01".repeat(Math.ceil(nbits / 2)).slice(0, nbits);
  },
};
