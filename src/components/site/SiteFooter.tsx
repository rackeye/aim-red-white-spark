import { Link } from "@tanstack/react-router";
import { GraduationCap, Mail, MapPin, Phone } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-secondary/60">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl gradient-primary text-primary-foreground">
              <GraduationCap className="h-5 w-5" />
            </span>
            <span className="font-display text-lg font-extrabold">MY AIM HUB</span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
            A coaching institute built on discipline, doubt-clearing and honest results — Class 1 to
            12, every stream.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-bold tracking-wider uppercase">Explore</h4>
          <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
            {[
              { to: "/courses", label: "All Courses" },
              { to: "/faculty", label: "Our Faculty" },
              { to: "/about", label: "About Us" },
              { to: "/contact", label: "Admission Enquiry" },
            ].map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="transition-colors hover:text-primary">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold tracking-wider uppercase">Programs</h4>
          <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
            <li>Class 1 – 5 Junior Foundation</li>
            <li>Class 6 – 8 Foundation Booster</li>
            <li>Class 9 – 10 Board Champions</li>
            <li>Class 11 – 12 Science · Commerce · Arts</li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold tracking-wider uppercase">Reach us</h4>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li className="flex gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              2nd Floor, Shiksha Complex, Station Road, Your City
            </li>
            <li className="flex gap-2.5">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <a href="tel:+919000000000" className="hover:text-primary">
                +91 90000 00000
              </a>
            </li>
            <li className="flex gap-2.5">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <a href="mailto:info@myaimhub.in" className="hover:text-primary">
                info@myaimhub.in
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} MY AIM HUB OF EDUCATION. All rights reserved.
      </div>
    </footer>
  );
}
