import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chi-Squared Test Details | Randomness Testing Guide",
  description:
    "Learn about how the chi-squared test works underneath the hood.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
