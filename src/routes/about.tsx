import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, HeartHandshake, ShieldCheck, Timer } from "lucide-react";

import studentImage from "@/assets/student-study.jpg";
import { Button } from "@/components/ui/button";
import { stats } from "@/lib/site-data";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — 12 Years of Teaching | MY AIM HUB OF EDUCATION" },
      {
        name: "description",
        content:
          "MY AIM HUB OF EDUCATION is a neighbourhood coaching institute for Class 1–12 built on small batches, honest feedback and consistent board results.",
      },
      { property: "og:title", content: "About MY AIM HUB OF EDUCATION" },
      {
        property: "og:description",
        content: "Our story, values and the way we teach Class 1 to 12.",
      },
    ],
  }),
  component: AboutPage,
});

const values = [
  {
    icon: ShieldCheck,
    title: "Honesty over hype",
    text: "We never promise ranks. We promise attendance, effort and a clear report of where your child stands.",
  },
  {
    icon: Timer,
    title: "Discipline of routine",
    text: "Fixed timings, fixed homework check, fixed test day. Consistency is the whole strategy.",
  },
  {
    icon: HeartHandshake,
    title: "Respect for every learner",
    text: "Slow learners get extra time, fast learners get harder sheets. Nobody is left behind or bored.",
  },
];

function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <div className="grid-paper absolute inset-0 opacity-70" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
          <span className="label-caps text-primary">About us</span>
          <h1 className="mt-3 max-w-3xl font-display text-5xl text-balance sm:text-6xl">
            A coaching hub built by teachers, run for students
          </h1>
          <p className="mt-5 max-w-2xl leading-relaxed text-muted-foreground">
            MY AIM HUB OF EDUCATION started in a single room with nine students. Twelve years later
            we run ten programs from Class 1 to Class 12 — and the batch size is still capped at 18.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2">
        <div className="overflow-hidden border border-border">
          <img
            src={studentImage}
            alt="Student studying with notes at MY AIM HUB OF EDUCATION"
            width={1200}
            height={1200}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </div>
        <div>
          <h2 className="font-display text-4xl text-balance">Our teaching promise</h2>
          <ul className="mt-7 space-y-4">
            {[
              "Syllabus completed at least two months before boards",
              "Written performance report after every monthly test",
              "Free doubt sessions on Saturday for all batches",
              "Printed notes and PYQ banks included in the fee",
              "Monthly one-to-one call with parents",
            ].map((item) => (
              <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                {item}
              </li>
            ))}
          </ul>
          <Button asChild variant="hero" size="lg" className="mt-9">
            <Link to="/courses">Explore our programs</Link>
          </Button>
        </div>
      </section>

      <section className="border-y border-border bg-secondary/50">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:grid-cols-4 sm:px-6">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-display text-4xl text-primary">{s.value}</p>
              <p className="mt-2 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <h2 className="font-display text-4xl text-balance">What we stand for</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {values.map((v) => (
            <article key={v.title} className="surface-card rounded-md p-7">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary-soft text-primary">
                <v.icon className="h-6 w-6" />
              </span>
              <h3 className="mt-5 font-display text-lg font-bold">{v.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{v.text}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
