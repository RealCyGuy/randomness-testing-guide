import { chiSquaredPValue } from "@/src/utils/chiSquaredPValue";

// Curry the function to separate the test parameters from the actual input.
export function blockFrequencyTest(blockSize: number) {
  return function _(randomString: string) {
    const n = randomString.length;
    // Partition the input sequence into N non-overlapping blocks (and discard any unused bits).
    const N = Math.floor(n / blockSize);
    const blocks = [];
    for (let i = 0; i < N; i++) {
      blocks.push(randomString.substring(i * blockSize, (i + 1) * blockSize));
    }
    const observedCounts = blocks.map((block) => {
      const onesCount = (block.match(/1/g) || []).length;
      const zerosCount = blockSize - onesCount;
      return { ones: onesCount, zeros: zerosCount };
    });
    let chiSquared = 0;
    const expectedOnes = blockSize / 2;
    const expectedZeros = blockSize / 2;
    for (let i = 0; i < N; i++) {
      const observedOnes = observedCounts[i].ones;
      const observedZeros = observedCounts[i].zeros;
      chiSquared += (observedOnes - expectedOnes) ** 2 / expectedOnes;
      chiSquared += (observedZeros - expectedZeros) ** 2 / expectedZeros;
    }
    const degreesOfFreedom = N;
    const pValue = chiSquaredPValue(chiSquared, degreesOfFreedom);
    return {
      testName: "Block Frequency Test",
      blockSize: blockSize,
      chiSquared: chiSquared.toFixed(4),
      degreesOfFreedom: degreesOfFreedom,
      pValue: pValue.toFixed(4),
    };
  };
}
