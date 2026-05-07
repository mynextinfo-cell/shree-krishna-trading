'use client'

import { useState } from 'react'

import { useRouter } from 'next/navigation'

import { supabase } from '@/lib/supabase'

export default function AuthPage() {

  const router = useRouter()

  const [isLogin, setIsLogin] = useState(true)

  const [email, setEmail] = useState('')

  const [password, setPassword] = useState('')

  const [loading, setLoading] = useState(false)

  // HANDLE AUTH
  const handleAuth = async () => {

    if (!email || !password) {

      alert('Please fill all fields')

      return

    }

    setLoading(true)

    try {

      // LOGIN
      if (isLogin) {

        const { error } = await supabase.auth.signInWithPassword({

          email,

          password

        })

        if (error) {

          alert(error.message)

          setLoading(false)

          return

        }

        alert('Login Successful ✅')

        // REDIRECT TO DASHBOARD
        router.push('/dashboard')

      }

      // SIGNUP
      else {

        const {

          data,
          error

        } = await supabase.auth.signUp({

          email,

          password

        })

        if (error) {

          alert(error.message)

          setLoading(false)

          return

        }

        // CREATE PROFILE
        if (data.user) {

          await supabase

            .from('profiles')

            .insert([{

              id: data.user.id,

              email: data.user.email,

              role: 'user'

            }])

        }

        alert(

          'Account Created Successfully ✅'

        )

        // REDIRECT TO DASHBOARD
        router.push('/dashboard')

      }

    } catch (error) {

      console.log(error)

      alert('Something went wrong')

    }

    setLoading(false)

  }

  return (

    <main className="min-h-screen flex items-center justify-center bg-black text-white p-6">

      {/* CARD */}
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-3xl p-10 shadow-2xl">

        {/* COMPANY */}
        <div className="text-center mb-10">

          <h1 className="text-4xl font-bold text-pink-500 mb-3">

            Shree Krishna Trading

          </h1>

          <p className="text-gray-400">

            Trust Commitment Growth

          </p>

        </div>

        {/* TITLE */}
        <h2 className="text-3xl font-bold mb-8 text-center">

          {isLogin

            ? 'Login to Dashboard'

            : 'Create New Account'}

        </h2>

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl p-4 mb-5 text-white"
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl p-4 mb-6 text-white"
        />

        {/* BUTTON */}
        <button
          onClick={handleAuth}
          disabled={loading}
          className="w-full bg-pink-600 hover:bg-pink-700 transition rounded-2xl py-4 font-bold text-lg"
        >

          {loading

            ? 'Please wait...'

            : isLogin

              ? 'Login'

              : 'Create Account'}

        </button>

        {/* TOGGLE */}
        <div className="mt-8 text-center">

          <button
            onClick={() =>
              setIsLogin(!isLogin)
            }
            className="text-pink-400 hover:text-pink-300 transition"
          >

            {isLogin

              ? 'Create new account'

              : 'Already have an account? Login'}

          </button>

        </div>

      </div>

    </main>

  )

}