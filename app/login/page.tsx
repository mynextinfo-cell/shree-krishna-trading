"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import Link from "next/link";

import { supabase } from "@/lib/supabase";

export default function LoginPage() {

  const router =
    useRouter();

  // STATES

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  // LOGIN FUNCTION

  const handleLogin =
    async (
      e: React.FormEvent
    ) => {

      e.preventDefault();

      setLoading(true);

      // ADMIN SHORT LOGIN

      let loginEmail =
        email;

      if (
        email.toLowerCase() ===
        "admin"
      ) {

        loginEmail =
          "mynextinfo@gmail.com";
      }

      // SUPABASE LOGIN

      const { error } =
        await supabase.auth.signInWithPassword({

          email:
            loginEmail,

          password:
            password,
        });

      // ERROR

      if (error) {

        alert(
          error.message
        );

        setLoading(false);

        return;
      }

      // SUCCESS

      alert(
        "Login Successful 🚀"
      );

      router.push(
        "/dashboard"
      );

      setLoading(false);
    };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-rose-50 to-white p-6">

      {/* CARD */}

      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-pink-100 p-8">

        {/* HEADER */}

        <div className="text-center mb-8">

          <h1 className="text-4xl font-bold text-pink-600">

            Welcome Back

          </h1>

          <p className="text-zinc-500 mt-3">

            Login to Shree Krishna Trading

          </p>

        </div>

        {/* FORM */}

        <form
          onSubmit={
            handleLogin
          }
          className="space-y-5"
        >

          {/* EMAIL */}

          <div>

            <label className="block text-sm font-semibold text-zinc-700 mb-2">

              Email / Admin ID

            </label>

            <input
              type="text"
              placeholder="Enter email or admin"
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
              required
              className="
                w-full
                px-5
                py-4
                rounded-2xl
                bg-pink-50
                border
                border-pink-100
                outline-none
                focus:border-pink-400
                text-zinc-700
              "
            />

          </div>

          {/* PASSWORD */}

          <div>

            <label className="block text-sm font-semibold text-zinc-700 mb-2">

              Password

            </label>

            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
              required
              className="
                w-full
                px-5
                py-4
                rounded-2xl
                bg-pink-50
                border
                border-pink-100
                outline-none
                focus:border-pink-400
                text-zinc-700
              "
            />

          </div>

          {/* BUTTON */}

          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              bg-pink-500
              hover:bg-pink-600
              disabled:bg-pink-300
              text-white
              font-bold
              py-4
              rounded-2xl
              transition-all
              duration-300
              shadow-lg
            "
          >

            {loading
              ? "Logging in..."
              : "Login"}

          </button>

        </form>

        {/* FOOTER */}

        <div className="mt-8 text-center">

          <p className="text-zinc-500">

            Don&apos;t have an account?

          </p>

          <Link
            href="/signup"
            className="text-pink-600 font-bold hover:text-pink-700 mt-2 inline-block"
          >

            Create Account

          </Link>

        </div>

      </div>

    </div>
  );
}