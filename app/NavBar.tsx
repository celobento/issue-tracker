"use client";
import { Box } from "@radix-ui/themes";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBug } from "react-icons/fa";

const NavBar = () => {
  const { status, data: session } = useSession();
  const currentPath = usePathname();
  const links = [
    { href: "/", label: "Dashboard" },
    { href: "/issues/list", label: "Issues" },
  ];
  return (
    <nav className={`flex space-x-6 border-b px-5 mb-5 items-center h-14 `}>
      <Link href="/">
        <FaBug />
      </Link>
      <ul className={`flex space-x-6`}>
        {links.map((link) => (
          <li key={link.href}>
            <Link
              className={classNames({
                "text-stone-900": currentPath === link.href,
                "text-stone-500": currentPath !== link.href,
                "hover:text-stone-900 transition-colors": true,
              })}
              href={link.href}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
      <Box>
        {status === "authenticated" && (
          <Link href="/api/auth/signout">Log out</Link>
        )}
        {status === "unauthenticated" && (
          <Link href="/api/auth/signin">Log in</Link>
        )}
      </Box>
    </nav>
  );
};

export default NavBar;
