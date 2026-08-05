import { Link } from "@tanstack/react-router";
import { Menu, Phone, X } from "lucide-react";
import { useState } from "react";

import { BrandLogo } from "@/components/site/BrandLogo";
import { Button } from "@/components/ui/button";
import { brand } from "@/lib/brand";

const nav = [
  { to: "/", label: "Home" },
  { to: "/courses", label: "Courses" },
  { to: "/special-courses", label: "Special" },
  { to: "/toppers", label: "Toppers" },
  { to: "/activities", label: "Activities" },
  { to: "/faculty", label: "Faculty" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-xl">
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-3 sm:px-6 lg:py-4">
        <Link to="/" className="flex min-w-0 items-center gap-3">
          <BrandLogo className="h-11 w-11 shadow-[var(--shadow-soft)]" />
          <span className="min-w-0">
            <span className="block truncate font-display text-base leading-tight font-extrabold tracking-tight sm:text-lg">
              {brand.name}
            </span>
            <span className="block truncate text-[11px] font-semibold tracking-[0.22em] text-primary uppercase">
              {brand.tagline}
            </span>
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <nav className="hidden items-center gap-0.5 xl:flex">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="rounded-lg px-3 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:bg-primary-soft hover:text-primary"
                activeProps={{ className: "bg-primary-soft text-primary" }}
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
            className="xl:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-border bg-background px-4 pb-5 xl:hidden">
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
            href={`tel:${brand.phone.replace(/\s/g, "")}`}
            className="mt-2 flex items-center gap-2 rounded-lg bg-primary-soft px-3 py-3 text-sm font-semibold text-primary"
          >
            <Phone className="h-4 w-4" /> {brand.phone}
          </a>
        </nav>
      )}
    </header>
  );
}
