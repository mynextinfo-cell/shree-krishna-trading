"use client";

import { useRouter }
from "next/navigation";

import { supabase }
from "@/lib/supabase";

export default function LogoutButton() {

  const router =
    useRouter();

  const handleLogout =
    async () => {

      const { error } =
        await supabase.auth.signOut();

      if (error) {

        alert(
          error.message
        );

        return;
      }

      router.push(
        "/login"
      );
    };

  return (

    <button
      onClick={
        handleLogout
      }
      className="
        w-full
        bg-red-500
        hover:bg-red-600
        text-white
        font-semibold
        py-3
        rounded-2xl
        transition
      "
    >

      Logout

    </button>
  );
}