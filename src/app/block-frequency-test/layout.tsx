import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Block Frequency Test | Randomness Testing Guide",
  description:
    "Test whether a sequence of bits is random based on the frequency of 0s and 1s within blocks of bits.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
