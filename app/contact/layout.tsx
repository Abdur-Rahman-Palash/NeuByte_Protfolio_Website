import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | NeuByte",
  description: "Get in touch with NeuByte for innovative AI and web solutions.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}