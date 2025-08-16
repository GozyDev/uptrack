"use client";

import { loginWithGitHub, loginWithGoogle } from "@/app/action/auth";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { FiUser, FiMail } from "react-icons/fi";
import Image from "next/image";
export default function SignInComponent() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  return (
    <div className="w-full max-w-md mx-auto bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
      <div className="text-center mb-8">
        <div className="mx-auto w-max rounded-full flex items-center justify-center">
          <Image src='/uptrackLogo.png' alt="uptrackLogo" width={100} height={100} className=""></Image>
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Sign In to Your Account</h2>
        <p className="text-gray-600 mt-2">Access your personalized dashboard</p>
      </div>

      <div className="space-y-5">
        {/* User Name Input */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiUser className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="john doe"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Email Input */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiMail className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="email"
            placeholder="example@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Divider */}
        <div className="relative flex items-center py-2">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="flex-shrink mx-4 text-gray-500 text-sm">Or continue with</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* Sign-In Buttons */}
        <div className="flex flex-col gap-3">
          <button
            onClick={() => loginWithGitHub()}
            className="w-full flex items-center justify-center gap-3 px-5 py-3.5 rounded-lg text-gray-800 bg-gray-50 border border-gray-300 hover:bg-gray-100 transition-colors"
          >
            <FaGithub className="w-5 h-5" />
            <span className="font-medium">Sign in with GitHub</span>
          </button>

          <button
            onClick={() => loginWithGoogle()}
            className="w-full flex items-center justify-center gap-3 px-5 py-3.5 rounded-lg text-gray-800 bg-gray-50 border border-gray-300 hover:bg-gray-100 transition-colors"
          >
            <FcGoogle className="w-5 h-5" />
            <span className="font-medium">Sign in with Google</span>
          </button>
        </div>
      </div>

      <div className="mt-6 text-center text-sm text-gray-500">
        By signing in, you agree to our <a href="#" className="text-blue-600 hover:underline">Terms</a> and <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
      </div>
    </div>
  );
};