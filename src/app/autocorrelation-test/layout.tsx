import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Autocorrelation Test | Randomness Testing Guide",
  description:
    "Test whether a sequence of bits is random based on the ease of predicting the next bit based on the previous bits.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
