import { createFileRoute, Link } from "@tanstack/react-router";
import { CalendarDays, IndianRupee, Layers } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { courseGroups, courses } from "@/lib/site-data";

export const Route = createFileRoute("/courses")({
  head: () => ({
    meta: [
      { title: "All Courses — Class 1 to 12 | MY AIM HUB OF EDUCATION" },
      {
        name: "description",
        content:
          "Explore every program: Class 1–5, 6–8 foundation, Class 9–10 boards and Class 11–12 Science, Commerce and Arts with fees, timings and subjects.",
      },
      { property: "og:title", content: "All Courses — Class 1 to 12 | MY AIM HUB OF EDUCATION" },
      {
        property: "og:description",
        content:
          "Fees, batch timings and subjects for every class and stream taught at MY AIM HUB OF EDUCATION.",
      },
    ],
  }),
  component: CoursesPage,
});

function CoursesPage() {
  const [filter, setFilter] = useState<(typeof courseGroups)[number]>("All");
  const list = filter === "All" ? courses : courses.filter((c) => c.group === filter);

  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <div className="grid-paper absolute inset-0 opacity-70" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
          <span className="label-caps text-primary">Courses</span>
          <h1 className="mt-3 max-w-3xl font-display text-5xl text-balance sm:text-6xl">
            Every class. Every stream. One clear plan.
          </h1>
          <p className="mt-5 max-w-2xl leading-relaxed text-muted-foreground">
            Ten structured programs covering Class 1 to 12 — including Science (PCM & PCB),
            Commerce and Arts for senior secondary students.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="flex flex-wrap gap-2">
          {courseGroups.map((g) => (
            <button
              key={g}
              onClick={() => setFilter(g)}
              className={
                "rounded-full border px-5 py-2 text-sm font-semibold transition-colors " +
                (filter === g
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-primary")
              }
            >
              {g}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {list.map((c) => (
            <article key={c.slug} className="surface-card flex flex-col rounded-md p-7">
              <span className="w-fit rounded-full bg-primary-soft px-3 py-1 text-[11px] font-bold tracking-wider text-primary uppercase">
                {c.level}
              </span>
              <h2 className="mt-4 font-display text-xl font-bold">{c.title}</h2>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {c.subjects.map((s) => (
                  <span
                    key={s}
                    className="rounded-md border border-border bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground"
                  >
                    {s}
                  </span>
                ))}
              </div>

              <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
                {c.highlights.map((h) => (
                  <li key={h} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    {h}
                  </li>
                ))}
              </ul>

              <dl className="mt-6 grid gap-2.5 border-t border-border pt-5 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <CalendarDays className="h-4 w-4 shrink-0 text-primary" />
                  <span className="min-w-0">{c.batch}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Layers className="h-4 w-4 shrink-0 text-primary" />
                  <span>{c.subjects.length} subjects · max 18 students</span>
                </div>
                <div className="flex items-center gap-2 font-display text-lg font-extrabold text-primary">
                  <IndianRupee className="h-4 w-4 shrink-0" />
                  <span>{c.fee.replace("₹", "")}</span>
                </div>
              </dl>

              <Button asChild variant="hero" className="mt-6 w-full" size="lg">
                <Link to="/contact">Enquire about this batch</Link>
              </Button>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
