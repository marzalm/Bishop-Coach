import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ChessCoach - Improve Your Chess",
  description: "Analyze your chess games and get personalized training",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
