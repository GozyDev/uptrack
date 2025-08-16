"use client";

import { loginWithGitHub, loginWithGoogle, logout } from "@/app/action/auth";

const ButtonSignInGitHub = () => {
  return (
    <button
      onClick={() => loginWithGitHub()}
      className="px-5 py-3 rounded text-white bg-black"
    >
      Sign in with GitHub
    </button>
  );
};

const ButtonSignInGoogle = () => {
  return (
    <button
      onClick={() => loginWithGoogle()}
      className="px-5 py-3 rounded text-white bg-blue-600"
    >
      Sign in with Google
    </button>
  );
};

export const ButtonSignOut = () => {
  return (
    <button
      onClick={() => logout()}
      className="px-5 py-3 rounded text-white bg-red-700"
    >
      Sign out
    </button>
  );
};

export { ButtonSignInGitHub, ButtonSignInGoogle };
