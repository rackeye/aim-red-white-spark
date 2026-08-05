import { Link } from "@tanstack/react-router";
import { GraduationCap, Menu, Phone, X } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";

const nav = [
  { to: "/", label: "Home" },
  { to: "/courses", label: "Courses" },
  { to: "/faculty", label: "Faculty" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-xl">
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-3 sm:px-6 lg:py-4">
        <Link to="/" className="flex min-w-0 items-center gap-3">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-sm bg-primary text-primary-foreground">
            <GraduationCap className="h-5 w-5" />
          </span>
          <span className="min-w-0">
            <span className="block truncate font-display text-xl leading-tight tracking-tight sm:text-2xl">
              MY AIM HUB
            </span>
            <span className="label-caps block truncate text-[10px] text-muted-foreground">
              of Education
            </span>
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <nav className="hidden items-center gap-1 lg:flex">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="rounded-sm px-3.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                activeProps={{ className: "text-foreground" }}
                activeOptions={{ exact: item.to === "/" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <Button asChild variant="hero" size="lg" className="hidden sm:inline-flex">
            <Link to="/contact">Book Free Demo</Link>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-border bg-background px-4 pb-5 lg:hidden">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-3 text-sm font-semibold text-foreground hover:bg-primary-soft hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
          <a
            href="tel:+919000000000"
            className="mt-2 flex items-center gap-2 rounded-lg bg-primary-soft px-3 py-3 text-sm font-semibold text-primary"
          >
            <Phone className="h-4 w-4" /> +91 90000 00000
          </a>
        </nav>
      )}
    </header>
  );
}
