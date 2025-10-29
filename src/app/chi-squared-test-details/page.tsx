"use client";

import { useMemo } from "react";
import { BlockMath, InlineMath } from "react-katex";
import { ArticleChapterTitle } from "@/src/components/ArticleChapterTitle";
import { ArticleWrapper } from "@/src/components/ArticleWrapper";

export default function Page() {
  const verificationData = useMemo(() => {
    const examples = [
      { n: 100, heads: 60, p: 0.1 },
      { n: 100, heads: 60, p: 0.2 },
      { n: 100, heads: 60, p: 0.3 },
      { n: 100, heads: 60, p: 0.4 },
      { n: 100, heads: 60, p: 0.5 },
      { n: 100, heads: 60, p: 0.6 },
      { n: 100, heads: 60, p: 0.7 },
      { n: 100, heads: 60, p: 0.8 },
      { n: 100, heads: 60, p: 0.9 },
    ];
    return examples.map((example) => {
      const { n, heads, p } = example;
      const tails = n - heads;
      const expectedHeads = n * p;
      const expectedTails = n * (1 - p);
      const z = calculateZScore(heads, n, p);
      const zSquared = z ** 2;
      const chiSquared = calculateChiSquared(
        [tails, heads],
        [expectedTails, expectedHeads],
      );
      return {
        heads,
        tails,
        p: p.toFixed(2),
        zSquared: zSquared.toFixed(2),
        chiSquared: chiSquared.toFixed(2),
        difference: Math.abs(zSquared - chiSquared).toFixed(2),
      };
    });
  }, []);

  return (
    <ArticleWrapper>
      <ArticleChapterTitle>Chi-Squared Test Details</ArticleChapterTitle>
      <p>
        If we flip a coin 100 times and we get 60 heads and 40 tails, is the
        coin fair? The simplest way of testing this is using a z-score, which
        has the following formula.
      </p>
      <BlockMath math="z = \frac{x - np}{\sqrt{np(1-p)}}" />
      <p>We can then calculate the z-score as follows.</p>
      <BlockMath math="z = \frac{60 - (100)(0.5)}{\sqrt{(100)(0.5)(0.5)}} = \frac{10}{5} = 2" />
      <p>
        Using the normal curve (also known as a "bell curve"), we can use this
        z-score to make an educated guess as to whether the coin is fair or not.
      </p>
      <p>
        What if we try to use a chi-squared test instead? The chi-squared
        statistic has the following formula.
      </p>
      <BlockMath math="\chi^{2} = \sum_{i} \frac{(O_{i} - E_{i})^2}{E_{i}}" />
      <p>For the coin flipping case, we get the following value.</p>
      <BlockMath math="\chi^{2} = \frac{(40 - 50)^2}{50} + \frac{(60 - 50)^2}{50} = 4" />
      <p>
        Notice how in this case, <InlineMath math="\chi^2 = z^2" />. When the{" "}
        <InlineMath math="\chi^2" /> statistic has one degree of freedom, it is
        equivalent to the square of the <InlineMath math="z" /> statistic.
      </p>
      <p>
        Let's verify this relationship with several examples. The table below
        shows various coin flip scenarios and compares <InlineMath math="z^2" />{" "}
        with <InlineMath math="\chi^2" />:
      </p>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-neutral-300 mt-4">
          <thead className="bg-neutral-800">
            <tr>
              <th className="border border-neutral-300 px-4 py-2">Pr(Heads)</th>
              <th className="border border-neutral-300 px-4 py-2">Heads</th>
              <th className="border border-neutral-300 px-4 py-2">Tails</th>
              <th className="border border-neutral-300 px-4 py-2">z²</th>
              <th className="border border-neutral-300 px-4 py-2">χ²</th>
              <th className="border border-neutral-300 px-4 py-2">|z² - χ²|</th>
            </tr>
          </thead>
          <tbody>
            {verificationData.map((row) => (
              <tr key={`${row.heads}-${row.p}`}>
                <td className="border border-neutral-300 px-4 py-2 text-center">
                  {row.p}
                </td>
                <td className="border border-neutral-300 px-4 py-2 text-center">
                  {row.heads}
                </td>
                <td className="border border-neutral-300 px-4 py-2 text-center">
                  {row.tails}
                </td>
                <td className="border border-neutral-300 px-4 py-2 text-center">
                  {row.zSquared}
                </td>
                <td className="border border-neutral-300 px-4 py-2 text-center">
                  {row.chiSquared}
                </td>
                <td className="border border-neutral-300 px-4 py-2 text-center font-bold">
                  {row.difference}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ArticleWrapper>
  );
}

function calculateZScore(x: number, n: number, p: number) {
  return (x - n * p) / Math.sqrt(n * p * (1 - p));
}

function calculateChiSquared(observed: number[], expected: number[]) {
  return observed.reduce((sum, o, i) => {
    return sum + (o - expected[i]) ** 2 / expected[i];
  }, 0);
}
