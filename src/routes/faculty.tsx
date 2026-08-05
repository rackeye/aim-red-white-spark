import { createFileRoute } from "@tanstack/react-router";
import { Award, BookMarked } from "lucide-react";

import { faculty } from "@/lib/site-data";

export const Route = createFileRoute("/faculty")({
  head: () => ({
    meta: [
      { title: "Our Faculty — Experienced Teachers | MY AIM HUB OF EDUCATION" },
      {
        name: "description",
        content:
          "Meet the teaching team of MY AIM HUB OF EDUCATION — subject specialists for Physics, Chemistry, Maths, Biology, Commerce and foundation classes.",
      },
      { property: "og:title", content: "Our Faculty | MY AIM HUB OF EDUCATION" },
      {
        property: "og:description",
        content: "Subject specialists with 8 to 14 years of classroom experience.",
      },
    ],
  }),
  component: FacultyPage,
});

function FacultyPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <div className="grid-paper absolute inset-0 opacity-70" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
          <span className="text-xs font-bold tracking-[0.2em] text-primary uppercase">Faculty</span>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-black text-balance sm:text-5xl">
            Teachers who stay till the last doubt is cleared
          </h1>
          <p className="mt-5 max-w-2xl leading-relaxed text-muted-foreground">
            Each subject is handled by a specialist, not a generalist. Same teacher, same batch, all
            year — so nobody starts from zero in the middle of a session.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {faculty.map((f) => (
            <article key={f.name} className="surface-card rounded-2xl p-7">
              <div className="flex items-center gap-4">
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl gradient-primary font-display text-lg font-black text-primary-foreground">
                  {f.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)}
                </span>
                <div className="min-w-0">
                  <h2 className="truncate font-display text-lg font-bold">{f.name}</h2>
                  <p className="truncate text-sm text-muted-foreground">{f.subject}</p>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-between border-t border-border pt-5 text-sm">
                <span className="flex items-center gap-2 text-muted-foreground">
                  <Award className="h-4 w-4 text-primary" /> {f.exp} experience
                </span>
                <span className="flex items-center gap-2 text-primary">
                  <BookMarked className="h-4 w-4" /> Mentor
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
