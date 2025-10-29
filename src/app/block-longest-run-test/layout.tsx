import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Block Longest Run Test | Randomness Testing Guide",
  description:
    "Test whether a sequence of bits is random based on the distribution of longest runs within blocks of bits.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
