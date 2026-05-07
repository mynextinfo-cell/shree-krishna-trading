'use client'

import Link from 'next/link'

import { usePathname, useRouter }

from 'next/navigation'

import { supabase }

from '@/lib/supabase'

export default function Navbar() {

  const pathname = usePathname()

  const router = useRouter()

  // LOGOUT
  const handleLogout = async () => {

    await supabase.auth.signOut()

    router.push('/auth')

  }

  // NAV ITEMS
  const navItems = [

    {

      name: 'Journal',

      path: '/journal'

    },

    {

      name: 'Ledger',

      path: '/ledger'

    },

    {

      name: 'Portfolio',

      path: '/portfolio'

    },

    {

      name: 'Analytics',

      path: '/analytics'

    }

  ]

  return (

    <nav className="bg-white shadow-lg rounded-3xl p-5 mb-8">

      <div className="flex flex-col md:flex-row items-center justify-between gap-5">

        {/* LOGO */}
        <div>

          <h1 className="text-3xl font-bold text-pink-600">

            Shree Krishna Trading

          </h1>

        </div>

        {/* NAVIGATION */}
        <div className="flex flex-wrap gap-4">

          {navItems.map((item) => (

            <Link
              key={item.path}
              href={item.path}
              className={`px-5 py-3 rounded-2xl font-semibold transition ${
                pathname === item.path

                  ? 'bg-pink-600 text-white'

                  : 'bg-pink-100 hover:bg-pink-200 text-black'
              }`}
            >

              {item.name}

            </Link>

          ))}

        </div>

        {/* LOGOUT */}
        <button

          onClick={handleLogout}

          className="bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded-2xl font-bold"

        >

          Logout

        </button>

      </div>

    </nav>

  )

}