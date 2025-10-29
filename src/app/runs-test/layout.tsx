import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Runs Test | Randomness Testing Guide",
  description:
    "Test whether a sequence of bits is random based on the number of transitions between 0s and 1s.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
