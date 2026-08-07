import { createFileRoute, Link } from "@tanstack/react-router";
import { Award, Medal, Trophy, Star } from "lucide-react";

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
        content: "100+ students above 90% since 2019. Meet the toppers of every batch.",
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
        <section key={year} className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-6">
            <h2 className="font-display text-3xl font-black sm:text-4xl">
              Batch of <span className="text-primary">{year}</span>
            </h2>
            <div className="flex items-center gap-2 rounded-full border border-primary/20 bg-primary-soft px-4 py-1.5 text-sm font-bold text-primary">
              <Star className="h-4 w-4 fill-primary" />
              <span>{toppers.filter((t) => t.year === year).length} Champions</span>
            </div>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {toppers
              .filter((t) => t.year === year)
              .map((t, i) => (
                <article 
                  key={t.name} 
                  className="surface-card group relative flex flex-col overflow-hidden rounded-[2rem] p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5"
                >
                  {/* Top section: Image + Score */}
                  <div className="flex items-start justify-between gap-4">
                    {/* Profile Image / Fallback */}
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border-2 border-border/50 shadow-sm transition-transform duration-300 group-hover:scale-105">
                      {t.image ? (
                        <img
                          src={t.image}
                          alt={t.name}
                          width={160}
                          height={160}
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center gradient-primary font-display text-2xl font-black text-primary-foreground">
                          {t.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .substring(0, 2)}
                        </div>
                      )}
                    </div>

                    {/* Score display */}
                    <div className="flex flex-col items-end text-right">
                      <div className="flex items-center gap-1.5 rounded-full bg-primary-soft px-3 py-1 text-primary">
                        {i === 0 ? (
                          <Trophy className="h-4 w-4 shrink-0" />
                        ) : i === 1 ? (
                          <Medal className="h-4 w-4 shrink-0" />
                        ) : (
                          <Award className="h-4 w-4 shrink-0" />
                        )}
                        <span className="text-[11px] font-bold uppercase tracking-wider">Score</span>
                      </div>
                      <p className="mt-2 font-display text-3xl font-black tracking-tight text-primary">
                        {t.score}
                      </p>
                    </div>
                  </div>

                  {/* Student Details */}
                  <div className="mt-5">
                    <h3 className="font-display text-xl font-bold text-foreground">{t.name}</h3>
                    <p className="mt-1 font-medium text-muted-foreground">{t.exam}</p>
                  </div>

                  {/* Achievement Note */}
                  <div className="mt-6 flex-1 rounded-xl border border-border/40 bg-secondary/50 p-4">
                    <p className="text-sm font-medium leading-relaxed text-secondary-foreground text-pretty">
                      "{t.note}"
                    </p>
                  </div>
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
