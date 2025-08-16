
import { auth } from "@/auth";
import Image from "next/image";
import Link from "next/link";

export default async function Profile() {
  const session = await auth();
  const user = session?.user;

  return (
    <>
      {user ? (
        <div>
          <h1>Welcome back {user.name}</h1>
          <Image src={user.image || ""} alt="profile image" width={50} height={50} className="rounded-full" />
        </div>
      ) : (
        <div>
          <h1>Not authenticated</h1>
          <Link href="/login">login</Link>
        </div>
      )}
    </>
  );
}
