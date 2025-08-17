
import SignUpComponent from "@/components/SignUpCompenent";

export default function Page() {
console.log(process.env.NODE_ENV)

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <SignUpComponent />
    </div>
  );
}
