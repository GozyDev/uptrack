"use server";
import prisma from "@/lib/prisma";
import { hash } from "bcryptjs";

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
 const res =  await signIn("credentials", {
      email: username,
      password,
      redirect: false,
    });

    console.log("server action",res)
  } catch (error) {
    console.log(error);
  }
}
