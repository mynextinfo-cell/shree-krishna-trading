"use client";

import Link from "next/link";

import Image from "next/image";

import { usePathname }
from "next/navigation";

import LogoutButton
from "./LogoutButton";

export default function Sidebar() {

  const pathname =
    usePathname();

  // NAVIGATION ITEMS

  const navItems = [

    {
      name: "Dashboard",
      href: "/dashboard",
    },

    {
      name: "Calculator",
      href: "/calculator",
    },

    {
      name: "Journal",
      href: "/journal",
    },

    {
      name: "Portfolio",
      href: "/portfolio",
    },

    {
      name: "Ledger",
      href: "/ledger",
    },

    // ✅ NEW ANALYTICS TAB

    {
      name: "Analytics",
      href: "/analytics",
    },

    {
      name: "Charts",
      href: "/chart",
    },

    {
      name: "News",
      href: "/news",
    },

    {
      name: "Settings",
      href: "/settings",
    },
  ];

  return (

    <aside
      className="
        w-72
        min-h-screen
        bg-white
        border-r
        border-pink-100
        shadow-2xl
        p-6
        flex
        flex-col
      "
    >

      {/* LOGO */}

      <div className="mb-10">

        <div className="flex justify-center">

          <Image
            src="/logo.png"
            alt="Company Logo"
            width={180}
            height={180}
            className="object-contain"
            priority
          />

        </div>

      </div>

      {/* NAVIGATION */}

      <nav className="flex flex-col gap-3">

        {navItems.map((item) => {

          const active =
            pathname === item.href;

          return (

            <Link
              key={item.href}
              href={item.href}
              className={`

                px-5
                py-4
                rounded-2xl
                font-semibold
                transition
                shadow-sm

                ${active

                  ? "bg-pink-500 text-white shadow-lg"

                  : "bg-pink-50 text-zinc-700 hover:bg-pink-100"

                }

              `}
            >

              {item.name}

            </Link>
          );
        })}

      </nav>

      {/* LOGOUT */}

      <div className="mt-auto pt-8">

        <LogoutButton />

      </div>

    </aside>
  );
}