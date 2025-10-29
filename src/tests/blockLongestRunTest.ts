import { chiSquaredPValue } from "@/src/utils/chiSquaredPValue";

export function blockLongestRunTest(randomString: string) {
  const n = randomString.length;
  // Dynamically scale block size: use sqrt(n) as a reasonable compromise
  // This ensures enough blocks for statistical validity while keeping blocks large enough
  const M = Math.max(8, Math.floor(Math.sqrt(n)));
  const N = Math.floor(n / M);
  // Calculate the exact theoretical distribution for longest runs in blocks of size M
  const distribution = calculateLongestRunDistribution(M);
  // Get all possible run lengths and sort them
  const runLengths = Array.from(distribution.keys()).sort((a, b) => a - b);
  // Divide the sequence into N M-bit blocks
  const blocks: string[] = [];
  for (let i = 0; i < N; i++) {
    blocks.push(randomString.substring(i * M, (i + 1) * M));
  }
  // Count observed frequencies for each run length
  const observedFrequencies = new Map<number, number>();
  for (const block of blocks) {
    const longestRun = findLongestRunOfOnes(block);
    observedFrequencies.set(
      longestRun,
      (observedFrequencies.get(longestRun) || 0) + 1,
    );
  }
  // Compute the chi-squared statistic
  let chiSquared = 0;
  for (const runLength of runLengths) {
    const expectedProb = distribution.get(runLength) || 0;
    const expectedFreq = N * expectedProb;
    const observedFreq = observedFrequencies.get(runLength) || 0;
    // Only include in chi-squared if expected frequency is reasonable (> 0.5)
    if (expectedFreq > 0.5) {
      chiSquared += (observedFreq - expectedFreq) ** 2 / expectedFreq;
    }
  }
  // Degrees of freedom = number of categories with expectedFreq > 0.5, minus 1
  const numCategories = runLengths.filter(
    (r) => N * (distribution.get(r) || 0) > 0.5,
  ).length;
  const degreesOfFreedom = Math.max(1, numCategories - 1);
  const pValue = chiSquaredPValue(chiSquared, degreesOfFreedom);
  return {
    testName: "Block Longest Run Test",
    chiSquared: chiSquared.toFixed(4),
    degreesOfFreedom: degreesOfFreedom,
    pValue: pValue.toFixed(4),
  };
}

function findLongestRunOfOnes(bitString: string) {
  let maxRun = 0;
  let currentRun = 0;
  for (let i = 0; i < bitString.length; i++) {
    if (bitString[i] === "1") {
      currentRun++;
      maxRun = Math.max(maxRun, currentRun);
    } else {
      currentRun = 0;
    }
  }
  return maxRun;
}

// Calculate the exact probability distribution for the longest run of 1s
// in a random binary sequence of length M using dynamic programming.
function calculateLongestRunDistribution(M: number) {
  // dp[i][j][k] = number of sequences of length i where:
  // - longest run so far is j
  // - current run of 1s is k
  // We'll simplify to: dp[i][maxRun][currentRun]
  // For efficiency, we'll use a different approach:
  // Count sequences ending at position i with max run exactly r
  // and current run of c consecutive 1s
  // dp[maxRun][currentRun] for current position
  let prev = new Map<string, number>();
  let curr = new Map<string, number>();
  // Initialize: position 0
  // Starting with '0': maxRun=0, currentRun=0
  prev.set("0,0", 1);
  // Starting with '1': maxRun=1, currentRun=1
  prev.set("1,1", 1);
  // Build up sequences one bit at a time
  for (let pos = 1; pos < M; pos++) {
    curr.clear();
    for (const [key, count] of prev) {
      const [maxRun, currentRun] = key.split(",").map(Number);
      // Append a '0'
      // Current run resets to 0, max run stays the same
      const key0 = `${maxRun},0`;
      curr.set(key0, (curr.get(key0) || 0) + count);
      // Append a '1'
      // Current run increases by 1
      const newCurrentRun = currentRun + 1;
      const newMaxRun = Math.max(maxRun, newCurrentRun);
      const key1 = `${newMaxRun},${newCurrentRun}`;
      curr.set(key1, (curr.get(key1) || 0) + count);
    }
    [prev, curr] = [curr, prev];
  }
  // Aggregate by max run length
  const distribution = new Map<number, number>();
  for (const [key, count] of prev) {
    const maxRun = parseInt(key.split(",")[0]);
    distribution.set(maxRun, (distribution.get(maxRun) || 0) + count);
  }
  // Convert counts to probabilities
  const total = 2 ** M;
  for (const [run, count] of distribution) {
    distribution.set(run, count / total);
  }
  return distribution;
}
