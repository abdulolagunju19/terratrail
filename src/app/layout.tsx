import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Office Conversions",
  description: "A subsidiary of Aurrin Ventures.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={"antialiased"}
      >
        {children}
      </body>
    </html>
  );
}
