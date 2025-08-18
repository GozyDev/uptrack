"use client";

import auth, {
  loginWithGitHub,
  loginWithGoogle,
  signInWithCredential,
} from "@/app/action/auth";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { FiUser, FiMail, FiLock, FiArrowRight, FiLoader } from "react-icons/fi";
import Image from "next/image";
import { useRouter } from "next/navigation";


export default function SignInComponent() {
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setloading] = useState(false);
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      setloading(true);
      const res = await signInWithCredential(username, password);
      router.push("/profile")
    } catch (error) {
      console.log(error);
      alert("somthing went wrong ");
    } finally {
      setloading(false);
    }
  }

  return (
    <section className="w-full flex min-h-screen bg-gray-50 items-center justify-center  ">
      <div className="w-full max-w-md mx-auto bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
        <div className="text-center mb-8">
          <div className="mx-auto w-full  rounded-full flex items-center justify-center">
            <Image
              src="/uptrackLogo.png"
              alt="uptrackLogo"
              width={500}
              height={0}
              className=" w-[100px] border-white"
            />
          </div>
          <h2 className="text-xl font-bold text-gray-800">
            Sign In to Your Account
          </h2>
        </div>

        <div className="space-y-5">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* User Name Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                User Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiUser className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <a
                  href="#"
                  className="text-sm text-orange-600 hover:text-orange-800 hover:underline"
                >
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>

            <button
              disabled={loading}
              type="submit"
              className="bg-gradient-to-r from-orange-600 to-orange-800 text-white w-full py-3 text-lg rounded-lg cursor-pointer hover:from-orange-700 hover:to-orange-900 transition-all shadow-md flex items-center justify-center gap-2"
              onClick={(e) => handleSubmit(e)}
            >
              {!loading ? (
                <>
                  Sign In <FiArrowRight className="w-5 h-5" />
                </>
              ) : (
                <>
                  Signing In <FiLoader className="animate-spin" />{" "}
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative flex items-center py-2">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="flex-shrink mx-4 text-gray-500 text-sm">
              Or continue with
            </span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          {/* Sign-In Buttons */}
          <div className="flex flex-col gap-3">
            <button
              onClick={() => loginWithGitHub()}
              className="w-full flex items-center justify-center gap-3 px-5 py-3.5 rounded-lg text-gray-800 bg-gray-50 border border-gray-300 hover:bg-gray-100 transition-colors"
            >
              <FaGithub className="w-5 h-5" />
              <span className="font-medium">Continue in with GitHub</span>
            </button>

            <button
              onClick={() => loginWithGoogle()}
              className="w-full flex items-center justify-center gap-3 px-5 py-3.5 rounded-lg text-gray-800 bg-gray-50 border border-gray-300 hover:bg-gray-100 transition-colors"
            >
              <FcGoogle className="w-5 h-5" />
              <span className="font-medium">Continue in with Google</span>
            </button>
          </div>

          {/* Sign up link */}
          <div className="text-center mt-6">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <a
                href="/signup"
                className="font-medium text-orange-600 hover:text-orange-800 hover:underline"
              >
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
