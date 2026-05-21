"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import Link from "next/link";

import { supabase } from "@/lib/supabase";

export default function SignupPage() {

  const router =
    useRouter();

  // STATES

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [confirmPassword,
    setConfirmPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  // SIGNUP FUNCTION

  const handleSignup =
    async () => {

      if (
        !email ||
        !password ||
        !confirmPassword
      ) {

        alert(
          "Please fill all fields."
        );

        return;
      }

      if (
        password !==
        confirmPassword
      ) {

        alert(
          "Passwords do not match."
        );

        return;
      }

      if (
        password.length < 6
      ) {

        alert(
          "Password must be at least 6 characters."
        );

        return;
      }

      setLoading(true);

      const {
        error,
      } = await supabase.auth.signUp({

        email,

        password,
      });

      setLoading(false);

      if (error) {

        alert(
          error.message
        );

        return;
      }

      alert(
        "Account created successfully 🚀"
      );

      router.push(
        "/login"
      );
    };

  return (

    <div className="min-h-screen bg-[#fff1f7] flex items-center justify-center p-6">

      {/* CARD */}

      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 border border-pink-100">

        {/* HEADER */}

        <div className="text-center mb-8">

          <h1 className="text-5xl font-extrabold text-pink-500">

            SK Trading

          </h1>

          <p className="text-zinc-500 mt-3 text-lg">

            Create Your Trading Account 🚀

          </p>

        </div>

        {/* EMAIL */}

        <div className="mb-5">

          <label className="block text-sm font-semibold text-zinc-700 mb-2">

            Email Address

          </label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email || ""}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
            className="w-full bg-pink-50 border border-pink-100 rounded-2xl px-5 py-4 outline-none focus:border-pink-400"
          />

        </div>

        {/* PASSWORD */}

        <div className="mb-5">

          <label className="block text-sm font-semibold text-zinc-700 mb-2">

            Password

          </label>

          <input
            type="password"
            placeholder="Create password"
            value={
              password || ""
            }
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            className="w-full bg-pink-50 border border-pink-100 rounded-2xl px-5 py-4 outline-none focus:border-pink-400"
          />

        </div>

        {/* CONFIRM PASSWORD */}

        <div className="mb-6">

          <label className="block text-sm font-semibold text-zinc-700 mb-2">

            Confirm Password

          </label>

          <input
            type="password"
            placeholder="Confirm password"
            value={
              confirmPassword || ""
            }
            onChange={(e) =>
              setConfirmPassword(
                e.target.value
              )
            }
            className="w-full bg-pink-50 border border-pink-100 rounded-2xl px-5 py-4 outline-none focus:border-pink-400"
          />

        </div>

        {/* SIGNUP BUTTON */}

        <button
          onClick={
            handleSignup
          }
          disabled={loading}
          className="w-full bg-pink-500 hover:bg-pink-600 disabled:bg-pink-300 text-white py-4 rounded-2xl font-bold text-lg transition shadow-lg"
        >

          {loading
            ? "Creating Account..."
            : "Sign Up"}

        </button>

        {/* LOGIN LINK */}

        <p className="text-center text-zinc-500 mt-6">

          Already have an account?{" "}

          <Link
            href="/login"
            className="text-pink-500 font-bold hover:text-pink-600"
          >

            Login

          </Link>

        </p>

      </div>

    </div>
  );
}