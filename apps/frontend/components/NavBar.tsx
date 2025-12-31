"use client"

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavLink } from "@/components/NavLink";
import { useRouter } from "next/navigation";

const publicNavLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
];

const dashboardLink = { name: "Dashboard", path: "/dashboard" };

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn ] = useState(false);
  const router = useRouter()

  useEffect(()=>{
    const checkAuth = ()=>{
      const token = localStorage.getItem("token")
      setIsLoggedIn(!!token)
    }
    checkAuth()

    const interval = setInterval(checkAuth, 2*1000)

    window.addEventListener("storage", checkAuth);

    return ()=>{
      clearInterval(interval)
      window.removeEventListener("storage", checkAuth)
    }

  }, [])

  // Combine public links with dashboard if logged in
  const navLinks = isLoggedIn 
    ? [...publicNavLinks, dashboardLink]
    : publicNavLinks;

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav className="glass-strong mx-4 mt-4 rounded-2xl px-6 py-4 lg:mx-auto lg:max-w-6xl">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative">
              <div className="absolute inset-0 rounded-lg gradient-primary blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
              <div className="relative flex h-10 w-10 items-center justify-center rounded-lg gradient-primary">
                <Activity className="h-5 w-5 text-primary-foreground" />
              </div>
            </div>
            <span className="text-xl font-bold gradient-text">UptimeGuard</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                href={link.path}
                className="text-sm font-medium transition-colors hover:text-primary text-muted-foreground"
                activeClassName="text-primary"
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            {isLoggedIn ? (
                <Button size="sm" className="gradient-primary text-primary-foreground hover-glow" onClick={()=>{
                  localStorage.removeItem("token");
                  router.push("/")
                }}>
                  Logout
                </Button>
            ) : (
              <>
                <Link href="/signin">
                  <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                    Sign In
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button size="sm" className="gradient-primary text-primary-foreground hover-glow">
                    Start Free Trial
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-border/30">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  href={link.path}
                  onClick={() => setIsOpen(false)}
                  className="text-sm font-medium transition-colors hover:text-primary py-2 text-muted-foreground"
                  activeClassName="text-primary"
                >
                  {link.name}
                </NavLink>
              ))}
              {isLoggedIn ? (
                <div className="pt-4 border-t border-border/30">
                  <Link href="/dashboard" onClick={() => setIsOpen(false)}>
                    <Button size="sm" className="w-full gradient-primary text-primary-foreground">
                      Dashboard
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col gap-2 pt-4 border-t border-border/30">
                  <Link href="/signin" onClick={() => setIsOpen(false)}>
                    <Button variant="ghost" size="sm" className="w-full justify-start text-muted-foreground">
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/signup" onClick={() => setIsOpen(false)}>
                    <Button size="sm" className="w-full gradient-primary text-primary-foreground">
                      Start Free Trial
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
