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
];

export default function DesktopNavbar() {
  return (
    <>
      <ul>
        {navbar.map((nav) => (
          <Link key={nav.name} href={nav.href}>
            <li>{nav.name}</li>
          </Link>
        ))}
      </ul>
    </>
  );
}
