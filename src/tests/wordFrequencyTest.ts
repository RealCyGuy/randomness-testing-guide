import { chiSquaredPValue } from "@/src/utils/chiSquaredPValue";

// Curry the function to separate the test parameters from the actual input.
export function wordFrequencyTest(bitsPerSymbol: number) {
  return function _(randomString: string) {
    // Group the binary string into chunks of size `bitsPerSymbol`
    // If `bitsPerSymbol` is 2, then the possible words are "00", "01", "10", and "11"
    const words: string[] = [];
    for (
      let i = 0;
      i <= randomString.length - bitsPerSymbol;
      i += bitsPerSymbol
    ) {
      words.push(randomString.slice(i, i + bitsPerSymbol));
    }
    // Generate all possible words for the given bit length
    const numWords = 2 ** bitsPerSymbol;
    const allPossibleWords: string[] = [];
    for (let i = 0; i < numWords; i++) {
      allPossibleWords.push(i.toString(2).padStart(bitsPerSymbol, "0"));
    }
    // Initialize counts for all possible words
    const wordCounts: { [key: string]: number } = {};
    for (const symbol of allPossibleWords) {
      wordCounts[symbol] = 0;
    }
    // Count the occurrences of each word
    for (const symbol of words) {
      if (wordCounts[symbol] !== undefined) {
        wordCounts[symbol]++;
      }
    }
    // Each word should appear with equal probability
    const n = words.length;
    const expected = n / numWords;
    // Calculate the chi-squared statistic
    let chiSquared = 0;
    for (const symbol of allPossibleWords) {
      const observed = wordCounts[symbol];
      chiSquared += (observed - expected) ** 2 / expected;
    }
    const degreesOfFreedom = numWords - 1;
    const pValue = chiSquaredPValue(chiSquared, degreesOfFreedom);
    return {
      testName: "Word Frequency Test",
      chiSquared: chiSquared.toFixed(4),
      degreesOfFreedom: degreesOfFreedom,
      pValue: pValue.toFixed(4),
    };
  };
}
