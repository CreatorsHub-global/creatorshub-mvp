import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CreatorsHub MVP",
  description: "MVP demo",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sv">
      <body className="bg-neutral-950 text-neutral-100">{children}</body>
    </html>
  );
}
