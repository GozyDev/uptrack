import { auth } from "@/auth";
import Image from "next/image";
import Link from "next/link";
import { logout } from "../../action/auth";
import { redirect } from "next/navigation";

export default async function Profile() {
  const session = await auth();
  if(!session){
    redirect("/login")
  }
  const user = session?.user;

  return (
    <>
      {user ? (
        <div>
          <h1>Welcome back {user.name}</h1>
          <Image
            src={user.image || "/uptrackLogo.png"}
            alt="profile image"
            width={50}
            height={50}
            className="rounded-full"
          />

          <form
            action={async () => {
              "use server"
              await logout();
            }}
          >
            <button>logout</button>
          </form>
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
