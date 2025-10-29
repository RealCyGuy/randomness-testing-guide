import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Generator Test Matrix | Randomness Testing Guide",
  description:
    "Compare methods of generating random strings with methods of testing them.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
