import './globals.css'

import type { Metadata } from 'next'

export const metadata: Metadata = {

  title: 'Shree Krishna Trading',

  description: 'Professional Trading Dashboard'

}

export default function RootLayout({

  children,

}: {

  children: React.ReactNode

}) {

  return (

    <html lang="en">

      <body>

        {children}

      </body>

    </html>

  )

}