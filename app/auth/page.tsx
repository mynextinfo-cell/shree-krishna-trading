"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function AuthPage() {

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // SIGN UP
  const signUp = async () => {

    const { error } =
      await supabase.auth.signUp({
        email,
        password,
      });

    if (error) {

      alert(error.message);

    } else {

      alert(
        "Account Created Successfully ✅"
      );
    }
  };

  // LOGIN
  const login = async () => {

    const { error } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (error) {

      alert(error.message);

    } else {

      alert("Login Successful ✅");

      router.push("/dashboard");
    }
  };

  return (

    <main className="min-h-screen bg-black text-white flex items-center justify-center p-6">

      <div className="w-full max-w-md bg-[#050816] border border-zinc-900 rounded-3xl p-8">

        {/* TITLE */}
        <div className="mb-10 text-center">

          <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-400 to-fuchsia-500 bg-clip-text text-transparent">
            Shree Krishna Trading
          </h1>

          <p className="text-zinc-400 mt-4">
            Professional Trading Dashboard
          </p>

        </div>

        {/* FORM */}
        <div className="space-y-6">

          {/* EMAIL */}
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full bg-[#07122b] border border-zinc-800 rounded-2xl p-5 text-lg outline-none"
          />

          {/* PASSWORD */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full bg-[#07122b] border border-zinc-800 rounded-2xl p-5 text-lg outline-none"
          />

          {/* BUTTONS */}
          <div className="grid grid-cols-2 gap-4">

            <button
              onClick={signUp}
              className="bg-violet-600 rounded-2xl p-5 text-lg font-bold hover:opacity-90 transition"
            >
              Sign Up
            </button>

            <button
              onClick={login}
              className="bg-fuchsia-600 rounded-2xl p-5 text-lg font-bold hover:opacity-90 transition"
            >
              Login
            </button>

          </div>

        </div>

      </div>

    </main>
  );
}