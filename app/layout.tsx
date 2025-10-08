import "./globals.css";
import Providers from "./providers";

export const metadata = {
  title: "CreatorsHub",
  description: "Everything begins with a line",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
