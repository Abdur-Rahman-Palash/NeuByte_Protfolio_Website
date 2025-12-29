import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Meet Our CEO | NeuByte",
  description: "Learn about NeuByte's visionary CEO and leader in AI and web development innovation.",
};

export default function CEOLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}