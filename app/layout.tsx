import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Notion Widget v2",
  description: "Recreated from Figma design",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full overflow-hidden">{children}</body>
    </html>
  );
}
