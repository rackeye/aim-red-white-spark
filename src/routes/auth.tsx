import { createFileRoute, Link, useNavigate, useSearch } from "@tanstack/react-router";
import { GraduationCap, LogIn, UserPlus } from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";

type AuthSearch = { redirect?: string | undefined };

export const Route = createFileRoute("/auth")({
  validateSearch: (search: Record<string, unknown>): AuthSearch => ({
    redirect: typeof search["redirect"] === "string" ? search["redirect"] : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Student Login & Registration | MY AIM HUB OF EDUCATION" },
      {
        name: "description",
        content:
          "Create your student account to enrol in courses, fill the admission form online and pay fees securely by UPI QR.",
      },
      { property: "og:title", content: "Student Login | MY AIM HUB OF EDUCATION" },
      {
        property: "og:description",
        content: "Login or register to apply for admission and pay fees online.",
      },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const search = useSearch({ from: "/auth" });
  const dest = search.redirect && search.redirect.startsWith("/") ? search.redirect : "/dashboard";
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: dest, replace: true });
    });
  }, [dest, navigate]);

  async function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setBusy(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: String(fd.get("email")),
      password: String(fd.get("password")),
    });
    setBusy(false);
    if (error) {
      toast.error("Login failed", { description: error.message });
      return;
    }
    toast.success("Welcome back!");
    navigate({ to: dest, replace: true });
  }

  async function handleRegister(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setBusy(true);
    const { data, error } = await supabase.auth.signUp({
      email: String(fd.get("email")),
      password: String(fd.get("password")),
      options: {
        emailRedirectTo: window.location.origin,
        data: { full_name: String(fd.get("full_name")), phone: String(fd.get("phone")) },
      },
    });
    setBusy(false);
    if (error) {
      toast.error("Registration failed", { description: error.message });
      return;
    }
    if (!data.session) {
      toast.success("Check your email", {
        description: "Confirm your email address to activate your student account.",
      });
      return;
    }
    toast.success("Account created");
    navigate({ to: dest, replace: true });
  }

  async function handleGoogle() {
    setBusy(true);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    setBusy(false);
    if (result.error) {
      toast.error("Google sign-in failed");
      return;
    }
    if (result.redirected) return;
    navigate({ to: dest, replace: true });
  }

  return (
    <section className="relative overflow-hidden">
      <div className="grid-paper absolute inset-0 opacity-70" aria-hidden />
      <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_minmax(0,460px)] lg:py-20">
        <div className="self-center">
          <span className="text-xs font-bold tracking-[0.2em] text-primary uppercase">
            Student Portal
          </span>
          <h1 className="mt-3 font-display text-4xl font-black text-balance sm:text-5xl">
            Enrol online in three simple steps
          </h1>
          <ul className="mt-8 space-y-4 text-muted-foreground">
            {[
              "Create your student account",
              "Fill the admission form and choose your course",
              "Pay the fee by UPI QR and upload the screenshot",
            ].map((s, i) => (
              <li key={s} className="flex gap-3">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  {i + 1}
                </span>
                <span className="pt-0.5">{s}</span>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-sm text-muted-foreground">
            Prefer to talk first?{" "}
            <Link to="/contact" className="font-semibold text-primary underline-offset-4 hover:underline">
              Book a free demo class
            </Link>
          </p>
        </div>

        <div className="surface-card rounded-2xl p-7 sm:p-8">
          <div className="mb-6 flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary-soft text-primary">
              <GraduationCap className="h-5 w-5" />
            </span>
            <div>
              <h2 className="font-display text-xl font-bold">Student access</h2>
              <p className="text-xs text-muted-foreground">Login or create a new account</p>
            </div>
          </div>

          <Tabs defaultValue="login">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="mt-6">
              <form onSubmit={handleLogin} className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="l-email">Email</Label>
                  <Input id="l-email" name="email" type="email" required autoComplete="email" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="l-pass">Password</Label>
                  <Input
                    id="l-pass"
                    name="password"
                    type="password"
                    required
                    autoComplete="current-password"
                  />
                </div>
                <Button type="submit" variant="hero" size="lg" disabled={busy}>
                  <LogIn /> Login
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="register" className="mt-6">
              <form onSubmit={handleRegister} className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="r-name">Full name</Label>
                  <Input id="r-name" name="full_name" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="r-phone">Mobile number</Label>
                  <Input id="r-phone" name="phone" type="tel" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="r-email">Email</Label>
                  <Input id="r-email" name="email" type="email" required autoComplete="email" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="r-pass">Password</Label>
                  <Input
                    id="r-pass"
                    name="password"
                    type="password"
                    required
                    minLength={6}
                    autoComplete="new-password"
                  />
                </div>
                <Button type="submit" variant="hero" size="lg" disabled={busy}>
                  <UserPlus /> Create account
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
            <span className="h-px flex-1 bg-border" /> OR <span className="h-px flex-1 bg-border" />
          </div>

          <Button
            type="button"
            variant="outline"
            size="lg"
            className="w-full"
            disabled={busy}
            onClick={handleGoogle}
          >
            Continue with Google
          </Button>
        </div>
      </div>
    </section>
  );
}
