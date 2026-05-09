'use client'

import { useState } from 'react'

import { useRouter } from 'next/navigation'

import { supabase } from '@/lib/supabase'

export default function LoginPage() {

  const router = useRouter()

  const [email, setEmail] =
    useState('')

  const [password, setPassword] =
    useState('')

  const [loading, setLoading] =
    useState(false)

  const [isSignup, setIsSignup] =
    useState(false)

  const handleAuth = async () => {

    setLoading(true)

    try {

      if (isSignup) {

        const { error } =
          await supabase.auth.signUp({

            email,
            password,

          })

        if (error) {

          alert(error.message)

        } else {

          alert(
            'Signup successful!'
          )

        }

      } else {

        const { error } =
          await supabase.auth.signInWithPassword({

            email,
            password,

          })

        if (error) {

          alert(error.message)

        } else {

          router.push('/dashboard')

        }

      }

    } catch (error) {

      alert('Something went wrong')

    }

    setLoading(false)

  }

  return (

    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-rose-100 flex items-center justify-center p-5">

      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-10">

        {/* TITLE */}
        <h1 className="text-5xl font-black text-center text-pink-700">

          SK Trading

        </h1>

        <p className="text-center text-pink-500 mt-3">

          Welcome Back Trader 🚀

        </p>

        {/* EMAIL */}
        <div className="mt-8">

          <label className="font-semibold text-gray-700">

            Email

          </label>

          <input
            type="email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            placeholder="you@example.com"
            className="w-full mt-2 px-5 py-4 rounded-2xl border border-pink-100 bg-pink-50 outline-none"
          />

        </div>

        {/* PASSWORD */}
        <div className="mt-5">

          <label className="font-semibold text-gray-700">

            Password

          </label>

          <input
            type="password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            placeholder="••••••••"
            className="w-full mt-2 px-5 py-4 rounded-2xl border border-pink-100 bg-pink-50 outline-none"
          />

        </div>

        {/* BUTTON */}
        <button
          onClick={handleAuth}
          disabled={loading}
          className="w-full mt-8 bg-gradient-to-r from-pink-500 to-rose-500 text-white py-4 rounded-2xl font-black text-lg shadow-lg"
        >

          {loading
            ? 'Please wait...'
            : isSignup
            ? 'Create Account'
            : 'Login'}

        </button>

        {/* TOGGLE */}
        <p className="text-center text-gray-600 mt-6">

          {isSignup
            ? 'Already have account?'
            : "Don't have account?"}

          <button
            onClick={() =>
              setIsSignup(!isSignup)
            }
            className="text-pink-600 font-bold ml-2"
          >

            {isSignup
              ? 'Login'
              : 'Sign Up'}

          </button>

        </p>

      </div>

    </div>

  )

}