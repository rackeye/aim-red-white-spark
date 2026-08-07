import { createFileRoute, Link } from "@tanstack/react-router";
import { CalendarHeart, Sparkles } from "lucide-react";

import activitiesImage from "@/assets/activities.jpg";
import { Button } from "@/components/ui/button";
import { activities } from "@/lib/site-data";

export const Route = createFileRoute("/activities")({
  head: () => ({
    meta: [
      { title: "Student Activities & Events | MY AIM HUB OF EDUCATION" },
      {
        name: "description",
        content:
          "Weekly tests, doubt marathons, science exhibitions, quiz leagues, olympiad workshops and career counselling at MY AIM HUB OF EDUCATION.",
      },
      { property: "og:title", content: "Student Activities & Events | MY AIM HUB OF EDUCATION" },
      {
        property: "og:description",
        content: "Beyond classes — tests, quizzes, exhibitions and counselling that build confident students.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ActivitiesPage,
});

function ActivitiesPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <div className="grid-paper absolute inset-0 opacity-70" aria-hidden />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-20">
          <div>
            <span className="text-xs font-bold tracking-[0.2em] text-primary uppercase">
              Activities
            </span>
            <h1 className="mt-3 font-display text-4xl font-black text-balance sm:text-5xl">
              Learning does not stop at the blackboard.
            </h1>
            <p className="mt-5 max-w-xl leading-relaxed text-muted-foreground">
              Tests, quizzes, exhibitions, counselling and motivation sessions run all year so
              students grow in confidence, not just in marks.
            </p>
            <Button asChild variant="hero" size="xl" className="mt-8">
              <Link to="/contact">Join the next batch</Link>
            </Button>
          </div>
          <div className="aspect-[4/3] overflow-hidden rounded-[1.75rem] border border-border shadow-[var(--shadow-lift)]">
            <img
              src={activitiesImage}
              alt="Students presenting a science exhibition model at MY AIM HUB OF EDUCATION"
              width={1400}
              height={934}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {activities.map((a) => (
            <article key={a.title} className="surface-card flex flex-col rounded-2xl p-7">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary-soft text-primary">
                <Sparkles className="h-6 w-6" />
              </span>
              <span className="mt-5 w-fit rounded-full bg-secondary px-2.5 py-1 text-[11px] font-bold tracking-wider text-secondary-foreground uppercase">
                {a.tag}
              </span>
              <h2 className="mt-3 font-display text-lg font-bold">{a.title}</h2>
              <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{a.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-4 sm:px-6">
        <div className="surface-card grid grid-cols-[minmax(0,1fr)] items-center gap-6 rounded-[1.75rem] p-8 sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:p-10">
          <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl gradient-primary text-primary-foreground">
            <CalendarHeart className="h-7 w-7" />
          </span>
          <div className="min-w-0">
            <h2 className="font-display text-xl font-bold">Annual activity calendar</h2>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Ask at the front desk for the printed calendar of tests, events and holidays.
            </p>
          </div>
          <Button asChild variant="outlineBrand" size="lg">
            <Link to="/contact">Request a copy</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
