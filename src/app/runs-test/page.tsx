"use client";

import { BlockMath, InlineMath } from "react-katex";
import { ArticleChapterTitle } from "@/src/components/ArticleChapterTitle";
import { ArticleSectionTitle } from "@/src/components/ArticleSectionTitle";
import { ArticleWrapper } from "@/src/components/ArticleWrapper";
import { TestInterface } from "@/src/components/TestInterface";
import { alternatingZerosAndOnesGenerator } from "@/src/generators/alternatingZerosAndOnesGenerator";
import { expectedRunsDistributionGenerator } from "@/src/generators/expectedRunsDistributionGenerator";
import { runsTest } from "@/src/tests/runsTest";

export default function Page() {
  return (
    <ArticleWrapper>
      <ArticleChapterTitle>Runs Test</ArticleChapterTitle>
      <p>Let's say we have the following binary string.</p>
      <BlockMath math="s = 01010101010101010101" />
      <p>
        It is obviously not random since each bit is simply the opposite of the
        previous one. Therefore, we must check that there is a reasonable number
        of transitions between zeros and ones.
      </p>
      <p>
        If we start at the beginning of a bit string, what is the expected
        number of bits we will encounter before transitioning to the opposite
        bit? There is a 50% chance we transition in 1 step, a 25% chance we
        transition in 2 steps, a 12.5% chance we transition in 3 steps, etc.
      </p>
      <p>
        This means that for a string of length <InlineMath math="n" />, 50% of
        the total number of runs will have length 1, 25% of the total number of
        runs will have length 2, 12.5% of the total number of runs will have
        length 3, etc. These percentages also tell us that the expected total
        number of runs is 2. We can use a <InlineMath math="\chi^{2}" /> test to
        determine if the observed distribution of run lengths matches this
        expected distribution.
      </p>
      <p>
        For the binary string <InlineMath math="s" /> above, every single bit is
        different from the previous one, so there are 20 total runs in the
        string, each of length 1. The expected total number of runs is 10.
        Therefore, we can calculate the <InlineMath math="\chi^{2}" /> statistic
        with infinity degrees of freedom as follows.
      </p>
      <BlockMath math="\chi^{2}_{\infty} = \underbrace{\frac{(20 - 5)^2}{5}}_{\text{runs of length 1}} + \underbrace{\frac{(0 - 2.5)^2}{2.5}}_{\text{runs of length 2}} + \underbrace{\frac{(0 - 1.25)^2}{1.25}}_{\text{runs of length 3}} + \cdots = 50" />
      <p>
        The p-value for a chi-squared of 50 with infinite degrees of freedom is
        0.0000, which is less than 0.01, indicating that this sequence of
        numbers was probably not randomly generated.
      </p>
      <TestInterface
        testCases={[
          {
            description: alternatingZerosAndOnesGenerator.name,
            sequence: alternatingZerosAndOnesGenerator.generate(20),
          },
        ]}
        testFunctions={[runsTest]}
      />
      <p>
        Note that using "infinite" categories has some issues, such as the fact
        that we can't have runs of length 10 if the input string is only 9 bits
        long. The implementation here uses 10 categories, which is "good enough"
        for most cases.
      </p>
      <p>
        This test, known as the <b>runs test</b>, is a significantly more
        difficult to pass than the frequency test. However, it fails on the
        following binary string that was obviously not randomly generated.
      </p>
      <BlockMath math="s = \color{lightcoral}{01010101}\color{lightgreen}{00110011}\color{lightblue}{000111}\color{lightcoral}{01010101}\color{lightgreen}{00110011}\color{lightblue}{000111}\color{orchid}{00001111}" />
      <TestInterface
        testCases={[
          {
            description: expectedRunsDistributionGenerator.name,
            sequence: "0101010100110011000111010101010011001100011100001111",
          },
        ]}
        testFunctions={[runsTest]}
      />
      <ArticleSectionTitle>Notes</ArticleSectionTitle>
      <p>
        It is normally not reasonable to use a chi-squared test where there are
        infinite degrees of freedom since the sum of the frequencies for each
        category have to add up to 1. The formulation in this article satisfies
        this condition since the frequencies 1/2, 1/4, 1/8, etc. add up to 1. If
        desired, an "other" category can be created that includes all the values
        deemed to be too small, e.g. 1/2, 1/4, (1/8 + 1/16 + 1/32 + ...) = 1/4.
      </p>
    </ArticleWrapper>
  );
}
