"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  Calculator,
  BarChart3,
  BookOpen,
  BriefcaseBusiness,
  Wallet,
  Settings,
  LogOut,
} from "lucide-react";

export default function Sidebar() {

  const pathname =
    usePathname();

  const menuItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Calculator",
      href: "/calculator",
      icon: Calculator,
    },
    {
      title: "Analytics",
      href: "/analytics",
      icon: BarChart3,
    },
    {
      title: "Journal",
      href: "/journal",
      icon: BookOpen,
    },
    {
      title: "Portfolio",
      href: "/portfolio",
      icon: BriefcaseBusiness,
    },
    {
      title: "Ledger",
      href: "/ledger",
      icon: Wallet,
    },
    {
      title: "Settings",
      href: "/settings",
      icon: Settings,
    },
  ];

  return (

    <aside className="w-72 bg-white border-r border-zinc-200 min-h-screen flex flex-col justify-between">

      {/* TOP SECTION */}

      <div>

        {/* LOGO */}

        <div className="flex justify-center items-center py-8 border-b border-zinc-200">

          <img
            src="/logo.png"
            alt="Logo"
            className="w-40 rounded-xl"
          />

        </div>

        {/* MENU */}

        <div className="p-4 space-y-3">

          {menuItems.map((item) => {

            const Icon =
              item.icon;

            const active =
              pathname === item.href;

            return (

              <Link
                key={item.title}
                href={item.href}
                className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-200 ${
                  active
                    ? "bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg"
                    : "text-zinc-700 hover:bg-zinc-100 hover:text-black"
                }`}
              >

                <Icon size={24} />

                <span className="text-lg font-medium">

                  {item.title}

                </span>

              </Link>
            );
          })}

        </div>

      </div>

      {/* LOGOUT */}

      <div className="p-4 border-t border-zinc-200">

        <button className="w-full flex items-center justify-center gap-3 bg-red-600 hover:bg-red-700 text-white py-4 rounded-2xl font-semibold transition">

          <LogOut size={22} />

          Logout

        </button>

      </div>

    </aside>
  );
}