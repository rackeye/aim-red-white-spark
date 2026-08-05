import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Clock, IndianRupee, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { specialCourses } from "@/lib/site-data";

export const Route = createFileRoute("/special-courses")({
  head: () => ({
    meta: [
      { title: "Special Courses — Crash, JEE/NEET, Olympiad | MY AIM HUB OF EDUCATION" },
      {
        name: "description",
        content:
          "Short-term and skill programs: board crash course, JEE/NEET foundation, Olympiad & NTSE prep, spoken English, computer skills and summer camp.",
      },
      {
        property: "og:title",
        content: "Special Courses — Crash, JEE/NEET, Olympiad | MY AIM HUB OF EDUCATION",
      },
      {
        property: "og:description",
        content: "Six focused add-on programs with duration, fees and what is included.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SpecialCoursesPage,
});

function SpecialCoursesPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <div className="grid-paper absolute inset-0 opacity-70" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
          <span className="text-xs font-bold tracking-[0.2em] text-primary uppercase">
            Special courses
          </span>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-black text-balance sm:text-5xl">
            Focused programs for a specific goal.
          </h1>
          <p className="mt-5 max-w-2xl leading-relaxed text-muted-foreground">
            Add any of these to a regular batch — or take them on their own. Short duration, clear
            outcome, same teachers.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {specialCourses.map((c) => (
            <article key={c.slug} className="surface-card flex flex-col rounded-2xl p-7">
              <h2 className="font-display text-xl font-bold text-balance">{c.title}</h2>

              <dl className="mt-4 grid gap-2.5 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 shrink-0 text-primary" />
                  <span className="min-w-0">{c.audience}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 shrink-0 text-primary" />
                  <span>{c.duration}</span>
                </div>
              </dl>

              <ul className="mt-5 space-y-2.5 text-sm text-muted-foreground">
                {c.points.map((p) => (
                  <li key={p} className="flex gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span className="min-w-0">{p}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex items-center gap-1 border-t border-border pt-5 font-display text-lg font-extrabold text-primary">
                <IndianRupee className="h-4 w-4 shrink-0" />
                <span>{c.fee.replace("₹", "")}</span>
              </div>

              <Button asChild variant="hero" size="lg" className="mt-5 w-full">
                <Link to="/contact">Enquire now</Link>
              </Button>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
