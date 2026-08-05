import { createFileRoute } from "@tanstack/react-router";
import { Clock, Mail, MapPin, Phone, Send } from "lucide-react";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { courses } from "@/lib/site-data";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Admission Enquiry & Contact | MY AIM HUB OF EDUCATION" },
      {
        name: "description",
        content:
          "Book a free demo class or ask about batches, fees and timings at MY AIM HUB OF EDUCATION. Call +91 90000 00000 or send an enquiry.",
      },
      { property: "og:title", content: "Contact MY AIM HUB OF EDUCATION" },
      {
        property: "og:description",
        content: "Book two free demo classes and find the right batch for your class and stream.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [course, setCourse] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    toast.success("Enquiry noted", {
      description: "Our counsellor will call you within 24 hours to schedule your demo class.",
    });
    e.currentTarget.reset();
    setCourse("");
  }

  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <div className="grid-paper absolute inset-0 opacity-70" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
          <span className="text-xs font-bold tracking-[0.2em] text-primary uppercase">Contact</span>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-black text-balance sm:text-5xl">
            Book your two free demo classes
          </h1>
          <p className="mt-5 max-w-2xl leading-relaxed text-muted-foreground">
            Share your class and stream — we will suggest the right batch, timing and fee plan.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.15fr_1fr]">
        <form onSubmit={handleSubmit} className="surface-card rounded-2xl p-7 sm:p-9">
          <h2 className="font-display text-2xl font-bold">Admission enquiry</h2>
          <div className="mt-7 grid gap-5 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="name">Student name</Label>
              <Input id="name" name="name" required placeholder="Full name" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Mobile number</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                required
                pattern="[0-9+ ]{10,15}"
                placeholder="+91 90000 00000"
              />
            </div>
            <div className="grid gap-2 sm:col-span-2">
              <Label htmlFor="email">Email (optional)</Label>
              <Input id="email" name="email" type="email" placeholder="you@example.com" />
            </div>
            <div className="grid gap-2 sm:col-span-2">
              <Label htmlFor="course">Interested program</Label>
              <Select value={course} onValueChange={setCourse}>
                <SelectTrigger id="course">
                  <SelectValue placeholder="Select a class or stream" />
                </SelectTrigger>
                <SelectContent>
                  {courses.map((c) => (
                    <SelectItem key={c.slug} value={c.slug}>
                      {c.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2 sm:col-span-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                name="message"
                rows={4}
                placeholder="Tell us your school, current marks or preferred timing."
              />
            </div>
          </div>
          <Button type="submit" variant="hero" size="xl" className="mt-8 w-full sm:w-auto">
            Send enquiry <Send />
          </Button>
          <p className="mt-4 text-xs text-muted-foreground">
            This is a demo form — enquiries are not stored anywhere yet.
          </p>
        </form>

        <aside className="space-y-6">
          {[
            {
              icon: MapPin,
              title: "Visit the centre",
              lines: ["2nd Floor, Shiksha Complex", "Station Road, Your City – 000000"],
            },
            {
              icon: Phone,
              title: "Call or WhatsApp",
              lines: ["+91 90000 00000", "+91 90000 00001"],
            },
            { icon: Mail, title: "Email", lines: ["info@myaimhub.in", "admissions@myaimhub.in"] },
            {
              icon: Clock,
              title: "Office hours",
              lines: ["Monday – Saturday · 8:00 AM – 8:00 PM", "Sunday · 10:00 AM – 1:00 PM"],
            },
          ].map((item) => (
            <div key={item.title} className="surface-card flex gap-4 rounded-2xl p-6">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary">
                <item.icon className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <h3 className="font-display font-bold">{item.title}</h3>
                {item.lines.map((l) => (
                  <p key={l} className="mt-1 text-sm text-muted-foreground">
                    {l}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </aside>
      </section>
    </>
  );
}
