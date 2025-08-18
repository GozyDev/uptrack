"use server";
import prisma from "@/lib/prisma";
import { hash } from "bcryptjs";

import { signIn, signOut } from "@/auth";

// GitHub login
export async function loginWithGitHub() {
  await signIn("github", {
    redirect: true,
    callbackUrl: "/profile", // redirect them here after Google login
  });
}

// Google login
export async function loginWithGoogle() {
  await signIn("google", {
    redirect: true,
    callbackUrl: "/profile", // redirect them here after Google login
  });
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
  const hashpassword = await hash(password, 10);
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashpassword,
    },
  });

  return { user, status: "success", msg: "created successfully" };
}

export async function signInWithCredential(username: string, password: string) {
  try {
    await signIn("credentials", {
      email: username,
      password,
      redirect: false,
      callbackUrl: "/profile", // where to go after login
    });
  } catch (error) {
    console.log(error);
  }
}
