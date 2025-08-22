"use client";

import { useState } from "react";
import { FiUser, FiMail, FiLock, FiArrowRight, FiLoader } from "react-icons/fi";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Image from "next/image";
import signUpWithCredential, {

  loginWithGoogle,
} from "@/app/action/auth";

export default function SignUpComponent() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setloading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle sign up logic here
    try {
      setloading(true);
      const response = await signUpWithCredential(name, email, password);
      console.log(response);
      alert(response.msg);
    } catch (error) {
      console.log(error);
      alert("Something went wrong ");
    } finally {
      setloading(false);
    }
  };

  return (
    <section className="w-full flex min-h-screen bg-gray-50 items-center justify-center py-12">
      <div className="w-full max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
        <div className="text-center mb-4">
          <div className="mx-auto w-full  rounded-full flex items-center justify-center">
            <Image
              src="/uptrackLogo.png"
              alt="uptrackLogo"
              width={500}
              height={0}
              className=" w-[100px] border-white"
            />
          </div>
          <h2 className="text-2xl font-bold  bg-gradient-to-l from-[#cf0000] to-[#000000] text-transparent bg-clip-text">
            Create Your Account
          </h2>
        </div>

        <div className="space-y-5">
          <form   className="space-y-5 flex flex-col gap-5">
            {/* Name Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiUser className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Use 8+ characters with a mix of letters, numbers & symbols
              </p>
            </div>

            <button
            disabled={loading}
              type="submit"
              className="bg-gradient-to-r from-orange-600 to-orange-800 text-white w-full py-3 text-lg rounded-lg cursor-pointer hover:from-orange-700 hover:to-orange-900 transition-all shadow-md flex items-center justify-center gap-2"
              onClick={(e)=>handleSubmit(e)}
            >
              {!loading ? (
                <>
                  Create Account <FiArrowRight className="w-5 h-5" />
                </>
              ) : (
                <>
                  Creating Account <FiLoader className="animate-spin" />{" "}
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative flex items-center py-2">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="flex-shrink mx-4 text-gray-500 text-sm">
              Or sign up with
            </span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          {/* Sign-Up Buttons */}
          <div className="flex flex-col gap-3">
        
            <button
              onClick={() => loginWithGoogle()}
              className="w-full flex items-center justify-center gap-3 px-5 py-3.5 rounded-lg text-gray-800 bg-gray-50 border border-gray-300 hover:bg-gray-100 transition-colors"
            >
              <FcGoogle className="w-5 h-5" />
              <span className="font-medium">Continue with Google</span>
            </button>
          </div>

          {/* Sign in link */}
          <div className="text-center mt-6">
            <p className="text-gray-600">
              Already have an account?{" "}
              <a
                href="/login"
                className="font-medium text-orange-600 hover:text-orange-800 hover:underline"
              >
                Sign in
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
