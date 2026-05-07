'use client'

import { useState } from 'react'
import { supabase } from '../../lib/supabase'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function LoginPage() {

  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleLogin() {

    setLoading(true)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    setLoading(false)

    if (error) {
      alert(error.message)
    } else {
      router.push('/dashboard')
    }
  }

  async function handleSignup() {

    setLoading(true)

    const { error } = await supabase.auth.signUp({
      email,
      password
    })

    setLoading(false)

    if (error) {
      alert(error.message)
    } else {
      alert('Account created successfully 🚀')
    }
  }

  return (
    <main className="min-h-screen bg-black flex items-center justify-center p-6">

      <div className="w-full max-w-md bg-[#07142b] border border-gray-800 rounded-3xl p-8 shadow-2xl">

        {/* Logo */}
        <div className="flex justify-center mb-6">

          <Image
            src="/logo.png"
            alt="Shree Krishna Trading"
            width={120}
            height={120}
            className="rounded-2xl"
            priority
          />

        </div>

        {/* Company Name */}
        <div className="text-center mb-10">

          <h1 className="text-5xl font-bold text-white mb-3 leading-tight">
            Shree Krishna <br />
            Trading
          </h1>

          <p className="text-gray-400 text-lg">
            Professional Trading Journal Platform
          </p>

        </div>

        {/* Email */}
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-4 rounded-2xl bg-black border border-gray-700 text-white mb-5 outline-none focus:border-green-500"
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-4 rounded-2xl bg-black border border-gray-700 text-white mb-6 outline-none focus:border-green-500"
        />

        {/* Login Button */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 transition-all duration-300 p-4 rounded-2xl font-bold text-white mb-4"
        >
          {loading ? 'Please wait...' : 'Login'}
        </button>

        {/* Signup Button */}
        <button
          onClick={handleSignup}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 transition-all duration-300 p-4 rounded-2xl font-bold text-white"
        >
          Create Account
        </button>

      </div>

    </main>
  )
}