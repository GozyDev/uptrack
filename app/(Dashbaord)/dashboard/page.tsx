import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Image from "next/image";

export default async function Page() {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }
  const { user } = session;
  return (
    <>
      <div className="flex items-center gap-1">
          <h1>{`Welcome to your dashboard ${user?.name}`}</h1>
          <Image
            src={user?.image || ""}
            alt="profile image"
            width={30}
            height={30}
            className="rounded-full"
          />
      </div>
    </>
  );
}
