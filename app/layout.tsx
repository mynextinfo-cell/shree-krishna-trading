import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {

  title: "Shree Krishna Trading",

  description:
    "Professional Trading Dashboard",

  manifest: "/manifest.json",

  themeColor: "#7c3aed",

};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (

    <html lang="en">

      <body>

        {children}

      </body>

    </html>
  );
}