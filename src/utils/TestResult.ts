export interface TestResult {
  testName: string;
  pValue: string;
  [key: string]: string | number;
}
