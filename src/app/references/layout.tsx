import { Metadata } from "next";

export const metadata: Metadata = {
  title: "References | Randomness Testing Guide",
  description:
    "All the papers and research I can find about testing random number generators.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
