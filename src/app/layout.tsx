import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../components/Navbar";

export const metadata: Metadata = {
  title: "Gilead POC",
  description: "Gilead POC Application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="flex flex-col h-screen">
          {/* Navbar at top */}
          <div className="h-16 flex-shrink-0 border-b border-gray-200">
            <Navbar />
          </div>
          {/* Main content area */}
          <div className="flex-1 overflow-hidden">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
