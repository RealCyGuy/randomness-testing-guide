import { GeneratorType } from "@/src/utils/GeneratorType";

export const expectedRunsDistributionGenerator: GeneratorType = {
  name: "Expected Runs Distribution",
  generate: (nbits: number) => {
    const fragments = {
      "01": 0,
      "0011": 0,
      "000111": 0,
      "00001111": 0,
      "0000011111": 0,
      "000000111111": 0,
      "00000001111111": 0,
      "0000000011111111": 0,
      "000000000111111111": 0,
      "00000000001111111111": 0,
    };
    const fragmentKeys = Object.keys(fragments);
    let result = "";
    let pattern: number[] = [];
    for (let level = 0; level < fragmentKeys.length; level++) {
      const newPattern: number[] = [];
      // Repeat the previous pattern
      newPattern.push(...pattern);
      // Add the current level fragment
      newPattern.push(level);
      // Repeat the previous pattern again
      newPattern.push(...pattern);
      pattern = newPattern;
    }
    // Generate string by repeating the pattern
    let patternIndex = 0;
    while (result.length < nbits) {
      const fragmentIndex = pattern[patternIndex % pattern.length];
      const selectedFragment = fragmentKeys[fragmentIndex];
      fragments[selectedFragment as keyof typeof fragments]++;
      result += selectedFragment;
      patternIndex++;
    }
    // Truncate to exactly nbits length
    return result.slice(0, nbits);
  },
};
