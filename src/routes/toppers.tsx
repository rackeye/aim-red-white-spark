import { createFileRoute, Link } from "@tanstack/react-router";
import { Award, Medal, Trophy } from "lucide-react";

import { Button } from "@/components/ui/button";
import { toppers, topperStats } from "@/lib/site-data";

export const Route = createFileRoute("/toppers")({
  head: () => ({
    meta: [
      { title: "Our Toppers & Results | MY AIM HUB OF EDUCATION" },
      {
        name: "description",
        content:
          "Board results and rank holders from MY AIM HUB OF EDUCATION — Class 10 and Class 12 Science, Commerce and Arts toppers year by year.",
      },
      { property: "og:title", content: "Our Toppers & Results | MY AIM HUB OF EDUCATION" },
      {
        property: "og:description",
        content: "180+ students above 90% since 2019. Meet the toppers of every batch.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ToppersPage,
});

function ToppersPage() {
  const years = [...new Set(toppers.map((t) => t.year))].sort((a, b) => Number(b) - Number(a));

  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <div className="grid-paper absolute inset-0 opacity-70" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
          <span className="text-xs font-bold tracking-[0.2em] text-primary uppercase">Toppers</span>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-black text-balance sm:text-5xl">
            Results that speak before we do.
          </h1>
          <p className="mt-5 max-w-2xl leading-relaxed text-muted-foreground">
            Every name here started with a demo class. Consistent practice, weekly tests and honest
            feedback did the rest.
          </p>
          <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-7 sm:grid-cols-4">
            {topperStats.map((s) => (
              <div key={s.label}>
                <dt className="font-display text-3xl font-black text-primary">{s.value}</dt>
                <dd className="mt-1 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                  {s.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {years.map((year) => (
        <section key={year} className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
            <h2 className="truncate font-display text-2xl font-black sm:text-3xl">
              Batch of <span className="text-primary">{year}</span>
            </h2>
            <span className="shrink-0 rounded-full bg-primary-soft px-3 py-1 text-xs font-bold text-primary">
              {toppers.filter((t) => t.year === year).length} toppers
            </span>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {toppers
              .filter((t) => t.year === year)
              .map((t, i) => (
                <article key={t.name} className="surface-card rounded-2xl p-7">
                  <div className="flex min-w-0 items-center gap-4">
                    <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl gradient-primary font-display text-lg font-black text-primary-foreground">
                      {t.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2)}
                    </span>
                    <div className="min-w-0">
                      <h3 className="truncate font-display text-lg font-bold">{t.name}</h3>
                      <p className="truncate text-xs text-muted-foreground">{t.exam}</p>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center gap-2 border-t border-border pt-5">
                    {i === 0 ? (
                      <Trophy className="h-5 w-5 shrink-0 text-primary" />
                    ) : i === 1 ? (
                      <Medal className="h-5 w-5 shrink-0 text-primary" />
                    ) : (
                      <Award className="h-5 w-5 shrink-0 text-primary" />
                    )}
                    <p className="font-display text-2xl font-black text-primary">{t.score}</p>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t.note}</p>
                </article>
              ))}
          </div>
        </section>
      ))}

      <section className="mx-auto max-w-7xl px-4 pb-4 sm:px-6">
        <div className="rounded-[1.75rem] gradient-primary px-6 py-12 text-center sm:px-12">
          <h2 className="font-display text-2xl font-black text-balance text-primary-foreground sm:text-3xl">
            Your name could be on this page next year.
          </h2>
          <Button asChild size="xl" variant="secondary" className="mt-7">
            <Link to="/contact">Book a free demo class</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
