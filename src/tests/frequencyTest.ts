import { chiSquaredPValue } from "@/src/utils/chiSquaredPValue";

export function frequencyTest(randomString: string) {
  const zeroCount = (randomString.match(/0/g) || []).length;
  const oneCount = randomString.length - zeroCount;
  const expectedCount = randomString.length / 2;
  const chiSquared =
    (zeroCount - expectedCount) ** 2 / expectedCount +
    (oneCount - expectedCount) ** 2 / expectedCount;
  const degreesOfFreedom = 1;
  const pValue = chiSquaredPValue(chiSquared, degreesOfFreedom);
  return {
    testName: "Frequency Test",
    chiSquared: chiSquared.toFixed(4),
    degreesOfFreedom: degreesOfFreedom,
    pValue: pValue.toFixed(4),
  };
}
