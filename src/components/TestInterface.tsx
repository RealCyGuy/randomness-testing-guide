"use client";

import { useState } from "react";
import { TestCaseAccordion } from "@/src/components/TestCaseAccordion";

export function TestInterface({
  testCases,
  testFunctions,
}: {
  testCases: TestCase[];
  testFunctions: any[];
}) {
  const [results, setResults] = useState<Map<number, TestResult[]>>(new Map());
  const [expandedCases, setExpandedCases] = useState<Set<number>>(new Set());

  const runTestsForCase = (caseIndex: number) => {
    const testCase = testCases[caseIndex];
    const testResults: TestResult[] = [];

    for (const testFunction of testFunctions) {
      testResults.push(testFunction(testCase.sequence));
    }

    setResults((prev) => new Map(prev).set(caseIndex, testResults));
    setExpandedCases((prev) => new Set(prev).add(caseIndex));
  };

  return (
    <div className="flex flex-col gap-4">
      {testCases.map((testCase, caseIndex) => (
        <TestCaseAccordion
          key={testCase.description}
          testCase={testCase}
          isExpanded={expandedCases.has(caseIndex)}
          caseResults={results.get(caseIndex)}
          onRunTests={() => runTestsForCase(caseIndex)}
        />
      ))}
    </div>
  );
}

interface TestCase {
  description: string;
  sequence: string;
}

interface TestResult {
  testName: string;
  pValue: string;
  [key: string]: string | number;
}
