import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { CreditCard, FilePlus2, LogOut, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useIsAdmin, useSession } from "@/hooks/useAuth";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({
    meta: [
      { title: "My Dashboard | MY AIM HUB OF EDUCATION" },
      {
        name: "description",
        content: "Track your admission status, enrolled course and fee payments in one place.",
      },
      { property: "og:title", content: "Student Dashboard | MY AIM HUB OF EDUCATION" },
      { property: "og:description", content: "Your admissions, courses and payments." },
    ],
  }),
  component: DashboardPage,
});

const statusStyles: Record<string, string> = {
  pending: "bg-amber-100 text-amber-800",
  approved: "bg-emerald-100 text-emerald-800",
  rejected: "bg-destructive/10 text-destructive",
  verified: "bg-emerald-100 text-emerald-800",
};

function DashboardPage() {
  const { user } = useSession();
  const { data: isAdmin } = useIsAdmin(user?.id);
  const navigate = useNavigate();
  const qc = useQueryClient();

  const { data: admissions, isLoading } = useQuery({
    queryKey: ["my-admissions", user?.id],
    enabled: !!user?.id,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("admissions")
        .select("*, courses(title, slug), payments(id, amount, status, plan, created_at)")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const signOut = useMutation({
    mutationFn: async () => {
      await qc.cancelQueries();
      qc.clear();
      await supabase.auth.signOut();
    },
    onSuccess: () => {
      toast.success("Signed out");
      navigate({ to: "/auth", replace: true });
    },
  });

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="text-xs font-bold tracking-[0.2em] text-primary uppercase">Dashboard</span>
          <h1 className="mt-2 font-display text-3xl font-black sm:text-4xl">
            Hello, {user?.user_metadata?.["full_name"] ?? user?.email}
          </h1>
        </div>
        <div className="flex flex-wrap gap-2">
          {isAdmin && (
            <Button asChild variant="outline">
              <Link to="/admin">
                <ShieldCheck /> Admin panel
              </Link>
            </Button>
          )}
          <Button asChild variant="hero">
            <Link to="/enroll">
              <FilePlus2 /> New admission
            </Link>
          </Button>
          <Button variant="ghost" onClick={() => signOut.mutate()}>
            <LogOut /> Sign out
          </Button>
        </div>
      </div>

      <div className="mt-10 grid gap-6">
        {isLoading && <p className="text-muted-foreground">Loading your applications…</p>}
        {!isLoading && admissions?.length === 0 && (
          <div className="surface-card rounded-2xl p-10 text-center">
            <h2 className="font-display text-xl font-bold">No admission form yet</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Fill the online admission form to enrol in the course of your choice.
            </p>
            <Button asChild variant="hero" size="lg" className="mt-6">
              <Link to="/enroll">Start admission form</Link>
            </Button>
          </div>
        )}

        {admissions?.map((a) => (
          <article key={a.id} className="surface-card rounded-2xl p-7">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h2 className="font-display text-xl font-bold">{a.candidate_name}</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {a.courses?.title ?? "Course not selected"} · applied{" "}
                  {new Date(a.created_at).toLocaleDateString("en-IN")}
                </p>
              </div>
              <span
                className={`rounded-full px-3 py-1 text-xs font-bold uppercase ${statusStyles[a.status]}`}
              >
                {a.status}
              </span>
            </div>

            {a.admin_note && (
              <p className="mt-4 rounded-lg bg-secondary p-3 text-sm text-muted-foreground">
                <strong className="text-foreground">Note from office:</strong> {a.admin_note}
              </p>
            )}

            <div className="mt-5 border-t border-border pt-5">
              <h3 className="text-sm font-bold">Payments</h3>
              {a.payments.length === 0 ? (
                <p className="mt-2 text-sm text-muted-foreground">No payment submitted yet.</p>
              ) : (
                <ul className="mt-3 grid gap-2">
                  {a.payments.map((p) => (
                    <li
                      key={p.id}
                      className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-border bg-secondary/40 px-3 py-2 text-sm"
                    >
                      <span className="font-semibold">
                        ₹{p.amount} · {p.plan}
                      </span>
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold uppercase ${statusStyles[p.status]}`}>
                        {p.status}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
              <Button asChild variant="soft" className="mt-4">
                <Link to="/payment" search={{ admission: a.id }}>
                  <CreditCard /> Pay fee by UPI QR
                </Link>
              </Button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
