import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Solutions | NeuByte",
  description: "Discover our innovative solutions in AI and web development.",
};

export default function SolutionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}