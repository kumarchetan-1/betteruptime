"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface NavLinkProps {
  href: string;
  className?: string;
  activeClassName?: string;
  onClick?: () => void;
  children: React.ReactNode;
}

/**
 * Simple NavLink component that highlights the active link
 * 
 * @example
 * <NavLink href="/dashboard" activeClassName="text-primary">
 *   Dashboard
 * </NavLink>
 */
export function NavLink({ 
  href, 
  className = "", 
  activeClassName = "text-primary",
  onClick,
  children 
}: NavLinkProps) {
  // Get current page URL (e.g., "/dashboard" or "/")
  const pathname = usePathname();
  
  // Check if this link is currently active
  const isActive = pathname === href;
  
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        className,
        // Apply activeClassName only when link is active
        isActive ? activeClassName : ""
      )}
    >
      {children}
    </Link>
  );
}