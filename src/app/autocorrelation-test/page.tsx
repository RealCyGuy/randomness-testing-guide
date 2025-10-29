"use client";

import { BlockMath, InlineMath } from "react-katex";
import { ArticleBulletList } from "@/src/components/ArticleBulletList";
import { ArticleChapterTitle } from "@/src/components/ArticleChapterTitle";
import { ArticleSectionTitle } from "@/src/components/ArticleSectionTitle";
import { ArticleWrapper } from "@/src/components/ArticleWrapper";
import { TestInterface } from "@/src/components/TestInterface";
import { aesGenerator } from "@/src/generators/aesGenerator";
import { linearCongruentialGenerator } from "@/src/generators/linearCongruentialGenerator";
import { autocorrelationTest } from "@/src/tests/autocorrelationTest";

export default function Page() {
  return (
    <ArticleWrapper>
      <ArticleChapterTitle>Autocorrelation Test</ArticleChapterTitle>
      <p>
        A linear congruential generator is defined by the following formula.
      </p>
      <BlockMath math="X_{n+1} = (aX_n + c) \bmod m" />
      <p>
        In this formula, <InlineMath math="X_n" /> is the current value in the
        sequence, <InlineMath math="a" /> is the multiplier,{" "}
        <InlineMath math="c" /> is the increment, and <InlineMath math="m" /> is
        the modulus. <InlineMath math="X_0" /> is a seed that can be arbitrarily
        chosen.
      </p>
      <p>
        Let's say we have the following binary string generated from a linear
        congruential generator.
      </p>
      <BlockMath math="s = 00110111001011011011101101011101001010101011011010" />
      <p>
        The weakness we can exploit here is that each bit is a linear function
        of the previous bits. If we can successfully predict the next bit using
        the previous bits, then the sequence isn't random.
      </p>
      <p>Therefore we want to calculate the following probabilities.</p>
      <ArticleBulletList>
        <li>
          <InlineMath math="\text{Pr(next bit = 0 | current bit = 0)}" />
        </li>
        <li>
          <InlineMath math="\text{Pr(next bit = 1 | current bit = 0)}" />
        </li>
        <li>
          <InlineMath math="\text{Pr(next bit = 0 | current bit = 1)}" />
        </li>
        <li>
          <InlineMath math="\text{Pr(next bit = 1 | current bit = 1)}" />
        </li>
      </ArticleBulletList>
      <p>
        However, this is exactly the same thing as calculating the frequencies
        of 00, 01, 10, and 11 in the binary string. This is extremely similar to
        what the word frequency test does, but with one key difference: the word
        frequency test uses <i>non-overlapping words</i>, whereas here we are
        looking at <i>overlapping words</i>.
      </p>
      <BlockMath math="s = \text{\color{lightcoral}{0} \color{orange}{0} \color{yellow}{1} \color{lightgreen}{1} \color{lightblue}{0} \color{orchid}{1} \color{white}{1 \ldots}}" />
      <BlockMath math="s' = \text{\color{lightcoral}{00} \color{orange}{01} \color{yellow}{11} \color{lightgreen}{10} \color{lightblue}{01} \color{orchid}{11}} \color{white}{\ldots}" />
      <p>
        The advantage of using overlapping words is that the sample size becomes
        much larger. For words of length 2 (such as the above example), the
        sample is 2 times larger. This is extremely important because when using
        the chi-squared test, if every category has an equal expected value,
        then too many categories leads to an extremely sparse expected
        distribution and causes the test to give invalid results. ("Sparse
        distribution" means that many of the entries are equal to zero.)
      </p>
      <p>
        For example, when using words of length 8, there are 2^8 = 256
        categories. If the random string is 1024 bits long, then there are 1024
        / 8 = 128 non-overlapping words, which are then placed in the 256
        categories. This means we expect half the categories to have no
        observations, which is way too sparse for the chi-squared test to
        produce valid results.
      </p>
      <p>
        By comparison, when using overlapping words, there are 2^8 = 256
        categories, 1024 - 7 = 1017 overlapping words, and they are placed in
        the 256 categories. This means we expect each category to have{" "}
        <InlineMath math="1017 / 256 \approx 4" /> observations per category,
        which is a (barely) acceptable number of observations per category.
      </p>
      <p>
        This test, known as the <b>autocorrelation test</b>, is a significantly
        more difficult to pass than the words test. Let's try and use it (with a
        word size of 2) on a 100-bit string from a linear congruential
        generator.
      </p>
      <TestInterface
        testCases={[
          {
            description: "Small LCG String",
            sequence: linearCongruentialGenerator.generate(100),
          },
        ]}
        testFunctions={[autocorrelationTest(2)]}
      />
      <p>
        There are two problems here. First is that 100 bits is not enough to
        detect any pattern. Second is that that word size is way too small and
        cannot be increased due to the small size of the binary string. However,
        if we use a 700,000-bit binary string with a word size of 8, we will be
        able to detect that the string was not randomly generated.
      </p>
      <TestInterface
        testCases={[
          {
            description: "Large LCG String",
            sequence: linearCongruentialGenerator.generate(700000),
          },
        ]}
        testFunctions={[autocorrelationTest(8)]}
      />
      <p>
        By comparison, a random string generated using AES (Advanced Encryption
        Standard) will not be failed by this test.
      </p>
      <TestInterface
        testCases={[
          {
            description: aesGenerator.name,
            sequence: aesGenerator.generate(700000),
          },
        ]}
        testFunctions={[autocorrelationTest(8)]}
      />
      <ArticleSectionTitle>Notes</ArticleSectionTitle>
      <p>
        The autocorrelation test, as implemented in this guide, only considers
        predicting the <i>next</i> bit given the previous{" "}
        <InlineMath math="n" /> bits. However, it's possible that the{" "}
        <InlineMath math="n" /> bits have no predictive power for the next bit,
        but for some later bit in the sequence. In other words, there may be a{" "}
        <i>lag</i> for the predictive ability of the bits. The "overlapping
        words" analogy doesn't make sense with lags greater than one.
      </p>
    </ArticleWrapper>
  );
}
