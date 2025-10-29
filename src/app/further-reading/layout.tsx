import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Further Reading | Randomness Testing Guide",
  description: "Additional papers about randomness testing.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
