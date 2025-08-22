"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";  

import {
  Home,
  FileText,
  User,
  Briefcase,
  Settings,
  LogOut,
} from "lucide-react";
import { useEffect, useState } from "react";
import { getUserCredencial } from "@/app/action/auth";

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    name: "Upload Resume",
    href: "/uploadresume",
    icon: FileText,
  },
  {
    name: "Profile",
    href: "/profile",
    icon: User,
  },
  {
    name: "Jobs",
    href: "/jobs",
    icon: Briefcase,
  },
];
type User = {
  name: string | null;
  email: string | null;
  image: string | null;
};
export default function DesktopNavbar() {
  const pathname = usePathname();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [user, setUser] = useState<User | undefined>();
  const [loading , setLoading] = useState(true)


  console.log(user);

  useEffect(() => {
    const getUser = async () => {
      const user = await getUserCredencial();
      setUser(user as User);
      setLoading(false)
    };
    getUser();
  }, []);
  if(loading){
    return <h1>Alex</h1>
  }

  return (
    <div className="flex flex-col bg-gradient-to-b from-blue-900   to-blue-800 text-white w-64 h-screen">
      {/* Logo */}
      <div className="flex items-center  h-20 px-3 border-b border-blue-700">
        <h1 className="text-xl font-bold">
          <Image
            src="/hirelence.png"
            alt="logo"
            width={130}
            height={130}
          ></Image>
        </h1>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1     px-3 py-6 space-y-2">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.name} href={item.href}>
              <div
                className={`flex  mb-1 items-center px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? "bg-blue-700 text-white shadow-lg"
                    : "text-blue-100 hover:bg-blue-700/50 hover:text-white"
                }`}
              >
                <item.icon className="w-5 h-5 mr-3" />
                <span className="font-medium">{item.name}</span>
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Settings & Logout */}
      <div className="px-3 py-4 border-t border-blue-700">
        <div
          className="flex items-center px-3 py-3 rounded-lg text-blue-100 hover:bg-blue-700/50 hover:text-white cursor-pointer transition-all duration-200"
          onClick={() => setIsSettingsOpen(!isSettingsOpen)}
        >
          <Settings className="w-5 h-5 mr-3" />
          <span className="font-medium">Settings</span>
        </div>

        <div className="flex items-center px-3 py-3 rounded-lg text-blue-100 hover:bg-red-600/30 hover:text-white cursor-pointer transition-all duration-200 mt-2">
          <LogOut className="w-5 h-5 mr-3" />
          <span className="font-medium">Logout</span>
        </div>
      </div>

      {/* User Profile */}
      <div className="px-3 py-4 border-t border-blue-700">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center mr-3">
           <Image src={user?.image ?? "/default-avatar.png"} alt="profile image" width={30} height={30} className="w-full rounded-full"></Image>
          </div>
          <div>
            <p className="font-medium text-sm">{user?.name}</p>
            <p className="text-xs text-blue-200">{user?.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
