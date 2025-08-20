import Link from "next/link";

const navbar = [
  {
    name: "dashboard",
    href: "/dashboard",
  },
  {
    name: "upload resume",
    href: "/uploadresume",
  },
  {
    name: "profile",
    href: "/profile",
  },
];

export default function DesktopNavbar() {
  return (
    <>
      <ul className="flex flex-col gap-4">
        {navbar.map((nav) => (
          <Link key={nav.name} href={nav.href}>
            <li>{nav.name}</li>
          </Link>
        ))}
      </ul>
    </>
  );
}
