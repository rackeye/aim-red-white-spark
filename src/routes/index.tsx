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
      <section className="relative overflow-hidden">
        <div className="grid-paper absolute inset-0 opacity-60" aria-hidden />
        <div
          className="absolute inset-x-0 top-0 h-px bg-border"
          aria-hidden
        />
        <div className="relative mx-auto grid max-w-7xl items-end gap-14 px-4 py-16 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:py-28">
          <div className="reveal-up">
            <span className="label-caps inline-flex items-center gap-2.5 text-primary">
              <span className="h-px w-8 bg-primary" aria-hidden />
              Admissions open · 2026–27
            </span>
            <h1 className="mt-7 font-display text-[2.75rem] leading-[0.98] text-balance sm:text-6xl lg:text-[4.5rem]">
              Where every student aims higher —{" "}
              <em className="serif-accent not-italic">
                <span className="italic">and actually gets there.</span>
              </em>
            </h1>
            <p className="mt-7 max-w-xl text-base leading-relaxed text-muted-foreground">
              MY AIM HUB OF EDUCATION coaches Class 1 to 10 in all subjects and Class 11–12 across
              Science, Commerce and Arts — small batches, daily practice and teachers who stay until
              the doubt is gone.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button asChild variant="hero" size="xl">
                <Link to="/contact">
                  Book a free demo class <ArrowRight />
                </Link>
              </Button>
              <Button asChild variant="outlineBrand" size="xl">
                <Link to="/courses">Browse all courses</Link>
              </Button>
            </div>
          </div>

          <div className="relative reveal-up">
            <div className="aspect-[4/5] overflow-hidden border border-border bg-card">
              <img
                src={heroImage}
                alt="Teacher explaining a concept to students at MY AIM HUB OF EDUCATION"
                width={1600}
                height={2000}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="mt-px flex items-center gap-3 border border-t-0 border-border bg-card px-5 py-4">
              <Star className="h-4 w-4 shrink-0 fill-current text-primary" />
              <p className="font-display text-xl leading-none">4.9 / 5</p>
              <p className="text-xs text-muted-foreground">rated by 620+ parents</p>
            </div>
          </div>
        </div>

        {/* Stat rule */}
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <dl className="grid grid-cols-2 border-t border-border sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="border-b border-border px-1 py-7 sm:border-b-0 sm:border-r sm:last:border-r-0 sm:px-6 sm:first:pl-0">
                <dt className="font-display text-4xl leading-none">{s.value}</dt>
                <dd className="label-caps mt-3 text-muted-foreground">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Marquee */}
      <section className="overflow-hidden border-y border-border bg-primary py-3.5">
        <div className="marquee-track whitespace-nowrap">
          {Array.from({ length: 2 }).map((_, i) => (
            <span key={i} className="flex shrink-0 items-center">
              {[
                "CBSE · ICSE · State Board",
                "Small batches of 18",
                "Weekly tests",
                "Printed study material",
                "Doubt sessions daily",
                "Parent progress calls",
              ].map((t) => (
                <span key={t} className="label-caps flex items-center gap-8 px-8 text-primary-foreground/90">
                  {t}
                  <span className="h-1 w-1 rounded-full bg-primary-foreground/50" aria-hidden />
                </span>
              ))}
            </span>
          ))}
        </div>
      </section>

      {/* Pillars */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
        <SectionHead
          align="left"
          eyebrow="Why MY AIM HUB"
          title="Coaching built around the student, not the crowd"
          text="Four things we refuse to compromise on, in every batch from Class 1 to Class 12."
        />
        <div className="mt-14 grid border-t border-border sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p, i) => (
            <article
              key={p.title}
              className="group border-b border-border px-0 py-9 transition-colors sm:px-8 sm:first:pl-0 lg:border-r lg:last:border-r-0"
            >
              <span className="label-caps text-muted-foreground/70">0{i + 1}</span>
              <p.icon className="mt-6 h-6 w-6 text-primary" />
              <h3 className="mt-5 font-display text-2xl leading-tight">{p.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Courses */}
      <section className="border-y border-border bg-secondary/60">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
          <SectionHead
            align="left"
            eyebrow="Programs"
            title="Class 1 to 12 — every class, every stream"
            text="Science (PCM & PCB), Commerce and Arts for senior secondary; complete subject coverage for juniors."
          />
          <div className="mt-14 grid gap-px bg-border md:grid-cols-2 lg:grid-cols-3">
            {featured.map((c) => (
              <article key={c.slug} className="flex flex-col bg-background p-8 transition-colors hover:bg-card">
                <span className="label-caps text-primary">{c.group}</span>
                <h3 className="mt-4 font-display text-3xl leading-tight">{c.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{c.subjects.join(" · ")}</p>
                <ul className="mt-6 space-y-2.5 text-sm text-muted-foreground">
                  {c.highlights.map((h) => (
                    <li key={h} className="flex gap-3">
                      <span className="mt-2 h-px w-3 shrink-0 bg-primary" />
                      {h}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto flex items-end justify-between border-t border-border pt-6 pt-8">
                  <div>
                    <p className="font-display text-2xl leading-none text-primary">{c.fee}</p>
                    <p className="mt-2 text-xs text-muted-foreground">{c.batch}</p>
                  </div>
                  <Button asChild variant="soft" size="sm">
                    <Link to="/courses">Details</Link>
                  </Button>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-12">
            <Button asChild variant="outlineBrand" size="lg">
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
