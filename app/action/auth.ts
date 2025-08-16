"use server";

import { signIn, signOut } from "@/auth";

// GitHub login
export async function loginWithGitHub() {
  await signIn("github");
}

// Google login
export async function loginWithGoogle() {
  await signIn("google");
}

// Logout (no provider needed)
export async function logout() {
  await signOut();
}
