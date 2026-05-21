import type { Metadata }
from "next";

import "./globals.css";

import {
  Cinzel,
  Poppins,
}
from "next/font/google";

const cinzel =
  Cinzel({

    subsets: ["latin"],

    variable:
      "--font-cinzel",
  });

const poppins =
  Poppins({

    subsets: ["latin"],

    weight: [
      "300",
      "400",
      "500",
      "600",
      "700",
    ],

    variable:
      "--font-poppins",
  });

export const metadata:
Metadata = {

  title:
    "Shree Krishna Trading",

  description:
    "Professional Trading Platform",
};

export default function RootLayout({

  children,

}: Readonly<{

  children:
    React.ReactNode;

}>) {

  return (

    <html lang="en">

      <body
        className={`

          ${cinzel.variable}

          ${poppins.variable}

          font-sans

        `}
      >

        {children}

      </body>

    </html>
  );
}