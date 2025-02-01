"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const links = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/profile", label: "Profile" },
  { href: "/documents", label: "Documents" },
  { href: "/qr-code", label: "QR Code" },
]

export function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="flex space-x-4 mb-4">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={cn(
            "px-3 py-2 rounded-md text-sm font-medium",
            pathname === link.href ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white",
          )}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  )
}

