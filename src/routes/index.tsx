import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  CalendarCheck,
  ClipboardCheck,
  GraduationCap,
  LineChart,
  Quote,
  Sparkles,
  Star,
  Target,
  Users,
} from "lucide-react";

import heroImage from "@/assets/hero-classroom.jpg";
import studentImage from "@/assets/student-study.jpg";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { courses, faqs, stats, testimonials } from "@/lib/site-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MY AIM HUB OF EDUCATION — Coaching for Class 1 to 12" },
      {
        name: "description",
        content:
          "Result-focused coaching for Class 1–10 and Class 11–12 Science, Commerce and Arts. Small batches, daily practice sheets and personal mentoring.",
      },
      { property: "og:title", content: "MY AIM HUB OF EDUCATION — Coaching for Class 1 to 12" },
      {
        property: "og:description",
        content:
          "Class 1–10 and Class 11–12 all streams. Small batches, weekly tests and doubt sessions that actually move marks.",
      },
    ],
  }),
  component: HomePage,
});

const pillars = [
  {
    icon: Users,
    title: "Batches of 18, not 80",
    text: "Every student is known by name, tracked chapter by chapter and pushed at their own pace.",
  },
  {
    icon: ClipboardCheck,
    title: "Test every week",
    text: "Chapter tests, monthly units and full board model papers with a written performance report.",
  },
  {
    icon: BookOpen,
    title: "Material included",
    text: "Printed notes, practice sheets and previous-year question banks with no extra charges.",
  },
  {
    icon: LineChart,
    title: "Parent progress calls",
    text: "A monthly one-to-one call so parents know exactly where their child stands.",
  },
];

const steps = [
  { icon: CalendarCheck, title: "Book a free demo", text: "Attend two classes before deciding." },
  { icon: Target, title: "Level assessment", text: "A short diagnostic decides your batch." },
  { icon: GraduationCap, title: "Start your batch", text: "Fixed timing, fixed mentor, fixed goal." },
];

function HomePage() {
  const featured = courses.slice(0, 6);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="grid-paper absolute inset-0 opacity-70" aria-hidden />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:py-24">
          <div className="reveal-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary-soft px-4 py-1.5 text-xs font-bold tracking-wider text-primary uppercase">
              <Sparkles className="h-3.5 w-3.5" /> Admissions open · 2026–27
            </span>
            <h1 className="mt-6 font-display text-4xl leading-[1.05] font-black text-balance sm:text-5xl lg:text-6xl">
              Where every student <span className="text-gradient-primary">aims higher</span> and
              actually gets there.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              MY AIM HUB OF EDUCATION coaches Class 1 to 10 in all subjects and Class 11–12 across
              Science, Commerce and Arts — with small batches, daily practice and teachers who stay
              until the doubt is gone.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button asChild variant="hero" size="xl">
                <Link to="/contact">
                  Book a free demo class <ArrowRight />
                </Link>
              </Button>
              <Button asChild variant="outlineBrand" size="xl">
                <Link to="/courses">Browse all courses</Link>
              </Button>
            </div>

            <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-7 sm:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label}>
                  <dt className="font-display text-3xl font-black text-primary">{s.value}</dt>
                  <dd className="mt-1 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                    {s.label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative reveal-up">
            <div className="absolute -inset-4 -z-10 rounded-[2rem] gradient-primary opacity-15 blur-2xl" />
            <div className="aspect-[4/3] overflow-hidden rounded-[1.75rem] border border-border shadow-[var(--shadow-lift)]">
              <img
                src={heroImage}
                alt="Teacher explaining a concept to students at MY AIM HUB OF EDUCATION"
                width={1600}
                height={1200}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 left-4 flex items-center gap-3 rounded-2xl border border-border bg-card px-5 py-4 shadow-[var(--shadow-lift)] sm:left-8">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary">
                <Star className="h-5 w-5 fill-current" />
              </span>
              <div className="min-w-0">
                <p className="font-display text-lg leading-none font-extrabold">4.9 / 5</p>
                <p className="mt-1 text-xs text-muted-foreground">Rated by 620+ parents</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <SectionHead
          eyebrow="Why MY AIM HUB"
          title="Coaching built around the student, not the crowd"
          text="Four things we refuse to compromise on, in every batch from Class 1 to Class 12."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p) => (
            <article key={p.title} className="surface-card rounded-2xl p-7">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary-soft text-primary">
                <p.icon className="h-6 w-6" />
              </span>
              <h3 className="mt-5 font-display text-lg font-bold">{p.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{p.text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Courses */}
      <section className="border-y border-border bg-secondary/50">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
          <SectionHead
            eyebrow="Programs"
            title="Class 1 to 12 — every class, every stream"
            text="Science (PCM & PCB), Commerce and Arts for senior secondary; complete subject coverage for juniors."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featured.map((c) => (
              <article key={c.slug} className="surface-card flex flex-col rounded-2xl p-7">
                <span className="w-fit rounded-full bg-primary-soft px-3 py-1 text-[11px] font-bold tracking-wider text-primary uppercase">
                  {c.group}
                </span>
                <h3 className="mt-4 font-display text-xl font-bold">{c.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{c.subjects.join(" · ")}</p>
                <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
                  {c.highlights.map((h) => (
                    <li key={h} className="flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      {h}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex items-end justify-between border-t border-border pt-5">
                  <div>
                    <p className="font-display text-lg font-extrabold text-primary">
                      {c.fees.monthly ?? c.fees.quarterly ?? c.fees.yearly}
                    </p>
                    <p className="text-xs text-muted-foreground">{c.batch}</p>
                  </div>
                  <Button asChild variant="soft" size="sm">
                    <Link to="/courses">Details</Link>
                  </Button>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button asChild variant="hero" size="lg">
              <Link to="/courses">
                See all 10 programs <ArrowRight />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Method / image split */}
      <section className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2">
        <div className="order-2 lg:order-1">
          <SectionHead
            align="left"
            eyebrow="How it works"
            title="Three steps from enquiry to your first class"
            text="No long forms, no pressure. Sit in a class, see the teaching, then decide."
          />
          <ol className="mt-10 space-y-6">
            {steps.map((s, i) => (
              <li key={s.title} className="flex gap-5">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl gradient-primary text-primary-foreground">
                  <s.icon className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <h3 className="font-display text-lg font-bold">
                    <span className="text-primary">0{i + 1}.</span> {s.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <div className="relative order-1 lg:order-2">
          <div className="aspect-square overflow-hidden rounded-[1.75rem] border border-border shadow-[var(--shadow-lift)]">
            <img
              src={studentImage}
              alt="Student practising with notes and question bank"
              width={1200}
              height={1200}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="border-y border-border bg-secondary/50">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
          <SectionHead
            eyebrow="Results & voices"
            title="What our students say after their boards"
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <figure key={t.name} className="surface-card rounded-2xl p-7">
                <Quote className="h-7 w-7 text-primary" />
                <blockquote className="mt-4 text-sm leading-relaxed text-foreground">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-6 border-t border-border pt-4">
                  <p className="font-display font-bold">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.detail}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
        <SectionHead eyebrow="FAQ" title="Questions parents ask us most" />
        <Accordion type="single" collapsible className="mt-10">
          {faqs.map((f) => (
            <AccordionItem key={f.q} value={f.q}>
              <AccordionTrigger className="text-left font-display text-base font-bold">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-[1.75rem] gradient-primary px-6 py-14 text-center sm:px-12">
          <h2 className="font-display text-3xl font-black text-balance text-primary-foreground sm:text-4xl">
            Two free demo classes. Zero obligation.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-primary-foreground/85 sm:text-base">
            Tell us your class and stream — we will suggest the right batch and timing for you.
          </p>
          <Button asChild size="xl" variant="secondary" className="mt-8">
            <Link to="/contact">
              Enquire now <ArrowRight />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}

export function SectionHead({
  eyebrow,
  title,
  text,
  align = "center",
}: {
  eyebrow: string;
  title: string;
  text?: string;
  align?: "center" | "left";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <span className="text-xs font-bold tracking-[0.2em] text-primary uppercase">{eyebrow}</span>
      <h2 className="mt-3 font-display text-3xl font-black text-balance sm:text-4xl">{title}</h2>
      {text && <p className="mt-4 leading-relaxed text-muted-foreground">{text}</p>}
    </div>
  );
}
