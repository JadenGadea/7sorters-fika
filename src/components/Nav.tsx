"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Hem" },
  { href: "/feed", label: "Flöde" },
  { href: "/min-samling", label: "Samling" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav className="sticky bottom-0 border-t border-gray-100 bg-white/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-md justify-around py-2">
        {links.map((link) => {
          const isActive =
            link.href === "/"
              ? pathname === "/"
              : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex flex-col items-center px-4 py-1 text-xs transition-colors ${
                isActive
                  ? "text-gray-900 font-semibold"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              <span className="text-lg mb-0.5">
                {link.href === "/" && "🏠"}
                {link.href === "/feed" && "📡"}
                {link.href === "/min-samling" && "⭐"}
              </span>
              {link.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
