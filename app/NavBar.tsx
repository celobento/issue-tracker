"use client";
import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBug } from "react-icons/fa";

const NavBar = () => {
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
          <Link
            key={link.href}
            className={classNames({
              "text-stone-900": currentPath === link.href,
              "text-stone-500": currentPath !== link.href,
              "hover:text-stone-900 transition-colors": true,
            })}
            href={link.href}
          >
            {link.label}
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
