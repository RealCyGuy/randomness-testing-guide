import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Word Frequency Test | Randomness Testing Guide",
  description:
    "Test whether a sequence of bits is random based on the frequency of groups of 0s and 1s.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
