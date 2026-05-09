'use client'

import {
  User,
  Bell,
  Lock,
  Moon,
  Save,
  Camera,
  ShieldCheck,
} from 'lucide-react'

import {
  useState,
} from 'react'

export default function SettingsPage() {

  const [name, setName] =
    useState(
      'Sanjay Mondal'
    )

  const [email, setEmail] =
    useState(
      'sanjay@example.com'
    )

  const [notifications, setNotifications] =
    useState(true)

  const [darkMode, setDarkMode] =
    useState(false)

  const [password, setPassword] =
    useState('')

  const handleSave = () => {

    alert(
      'Settings saved successfully 🚀'
    )

  }

  return (

    <div className="min-h-screen bg-[#fff7fa] p-8">

      {/* HEADER */}
      <div className="flex items-center gap-5 mb-10">

        <div className="bg-white p-5 rounded-3xl shadow-md border border-pink-100">

          <User
            className="text-pink-600"
            size={42}
          />

        </div>

        <div>

          <h1 className="text-6xl font-black text-pink-700">

            Settings

          </h1>

          <p className="text-pink-500 text-2xl mt-2">

            Manage Your Trading Account

          </p>

        </div>

      </div>

      {/* PROFILE SECTION */}
      <div className="bg-white rounded-3xl p-8 shadow-md border border-pink-100 mb-10">

        <div className="flex items-center justify-between mb-8">

          <div className="flex items-center gap-5">

            <div className="w-28 h-28 rounded-full bg-pink-100 flex items-center justify-center">

              <User
                className="text-pink-600"
                size={50}
              />

            </div>

            <div>

              <h2 className="text-4xl font-black text-gray-800">

                Profile Information

              </h2>

              <p className="text-gray-500 text-lg mt-2">

                Update your account details

              </p>

            </div>

          </div>

          <button className="flex items-center gap-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 py-4 rounded-2xl font-bold text-lg shadow-lg">

            <Camera size={22} />

            Upload Photo

          </button>

        </div>

        {/* FORM */}
        <div className="grid grid-cols-2 gap-8">

          {/* NAME */}
          <div>

            <label className="font-bold text-lg text-gray-700">

              Full Name

            </label>

            <input
              type="text"
              value={name}
              onChange={(e) =>
                setName(
                  e.target.value
                )
              }
              className="w-full mt-3 px-5 py-4 rounded-2xl border border-pink-100 bg-pink-50 outline-none"
            />

          </div>

          {/* EMAIL */}
          <div>

            <label className="font-bold text-lg text-gray-700">

              Email Address

            </label>

            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
              className="w-full mt-3 px-5 py-4 rounded-2xl border border-pink-100 bg-pink-50 outline-none"
            />

          </div>

        </div>

      </div>

      {/* SECURITY SECTION */}
      <div className="bg-white rounded-3xl p-8 shadow-md border border-pink-100 mb-10">

        <div className="flex items-center gap-4 mb-8">

          <Lock
            className="text-red-500"
            size={38}
          />

          <h2 className="text-4xl font-black text-gray-800">

            Security

          </h2>

        </div>

        {/* PASSWORD */}
        <div>

          <label className="font-bold text-lg text-gray-700">

            Change Password

          </label>

          <input
            type="password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            placeholder="New Password"
            className="w-full mt-3 px-5 py-4 rounded-2xl border border-pink-100 bg-pink-50 outline-none"
          />

        </div>

      </div>

      {/* PREFERENCES */}
      <div className="bg-white rounded-3xl p-8 shadow-md border border-pink-100 mb-10">

        <div className="flex items-center gap-4 mb-8">

          <ShieldCheck
            className="text-blue-600"
            size={38}
          />

          <h2 className="text-4xl font-black text-gray-800">

            Preferences

          </h2>

        </div>

        <div className="space-y-8">

          {/* NOTIFICATION */}
          <div className="flex items-center justify-between bg-[#fff1f7] p-6 rounded-2xl">

            <div className="flex items-center gap-4">

              <Bell
                className="text-pink-600"
                size={30}
              />

              <div>

                <h3 className="text-2xl font-black text-gray-800">

                  Notifications

                </h3>

                <p className="text-gray-500">

                  Enable market alerts & updates

                </p>

              </div>

            </div>

            <button
              onClick={() =>
                setNotifications(
                  !notifications
                )
              }
              className={`w-20 h-10 rounded-full transition ${
                notifications
                  ? 'bg-green-500'
                  : 'bg-gray-300'
              }`}
            >

              <div
                className={`w-8 h-8 bg-white rounded-full mt-1 transition ${
                  notifications
                    ? 'ml-11'
                    : 'ml-1'
                }`}
              />

            </button>

          </div>

          {/* DARK MODE */}
          <div className="flex items-center justify-between bg-[#fff1f7] p-6 rounded-2xl">

            <div className="flex items-center gap-4">

              <Moon
                className="text-indigo-600"
                size={30}
              />

              <div>

                <h3 className="text-2xl font-black text-gray-800">

                  Dark Mode

                </h3>

                <p className="text-gray-500">

                  Switch between light and dark theme

                </p>

              </div>

            </div>

            <button
              onClick={() =>
                setDarkMode(
                  !darkMode
                )
              }
              className={`w-20 h-10 rounded-full transition ${
                darkMode
                  ? 'bg-indigo-600'
                  : 'bg-gray-300'
              }`}
            >

              <div
                className={`w-8 h-8 bg-white rounded-full mt-1 transition ${
                  darkMode
                    ? 'ml-11'
                    : 'ml-1'
                }`}
              />

            </button>

          </div>

        </div>

      </div>

      {/* SAVE BUTTON */}
      <button
        onClick={handleSave}
        className="flex items-center gap-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-8 py-5 rounded-2xl font-black text-2xl shadow-lg"
      >

        <Save size={28} />

        Save Settings

      </button>

    </div>

  )

}