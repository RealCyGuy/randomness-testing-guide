import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Goodness of Fit | Randomness Testing Guide",
  description:
    "Determine whether an observed distribution matches an expected distribution.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
