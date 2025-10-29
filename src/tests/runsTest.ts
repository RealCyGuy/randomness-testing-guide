import { chiSquaredPValue } from "@/src/utils/chiSquaredPValue";

export function runsTest(randomString: string) {
  const n = randomString.length;
  const runLengths: number[] = [];
  let currentRunLength = 1;
  for (let i = 1; i < n; i++) {
    if (randomString[i] === randomString[i - 1]) {
      currentRunLength++;
    } else {
      runLengths.push(currentRunLength);
      currentRunLength = 1;
    }
  }
  // Don't forget the last run
  runLengths.push(currentRunLength);
  const maxCategory = 10;
  const observed = new Array(maxCategory).fill(0);
  for (const length of runLengths) {
    const category = Math.min(length, maxCategory) - 1;
    observed[category]++;
  }
  const expectedTotalRuns = randomString.length / 2;
  const expected = [
    // length 1
    expectedTotalRuns * 0.5,
    // length 2
    expectedTotalRuns * 0.25,
    // length 3
    expectedTotalRuns * 0.125,
    // length 4
    expectedTotalRuns * 0.0625,
    // length 5
    expectedTotalRuns * 0.03125,
    // length 6
    expectedTotalRuns * 0.015625,
    // length 7
    expectedTotalRuns * 0.0078125,
    // length 8
    expectedTotalRuns * 0.00390625,
    // length 9
    expectedTotalRuns * 0.001953125,
    // length 10+
    expectedTotalRuns * 0.001953125,
  ];
  let chiSquared = 0;
  for (let i = 0; i < maxCategory; i++) {
    chiSquared += (observed[i] - expected[i]) ** 2 / expected[i];
  }
  const degreesOfFreedom = maxCategory - 1;
  const pValue = chiSquaredPValue(chiSquared, degreesOfFreedom);
  return {
    testName: "Runs Test",
    chiSquared: chiSquared.toFixed(4),
    degreesOfFreedom: degreesOfFreedom,
    pValue: pValue.toFixed(4),
  };
}
