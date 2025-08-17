"use server";
import prisma from "@/lib/prisma";

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

export default async function signUpWithCredential(
  name: string,
  email: string,
  password: string
) {
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });
  if (existingUser) {
    return { msg: "user already exist", status: "failed" };
  }
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password,
    },
  });

  return { user, status: "success", msg: "created successfully" };
}
