import { auth } from "@/auth";
import SigningComponent from "@/components/SigningComponent";
import { redirect } from "next/navigation";

export default async function Page() {
  const sesssion = await auth()
  if(sesssion){
    redirect("/profile")
  }
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <SigningComponent />
    </div>
  );
}
