import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Check, Plus, Save, ShieldCheck, ShieldMinus, Trash2, X } from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useIsAdmin, useSession } from "@/hooks/useAuth";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Admin Panel | MY AIM HUB OF EDUCATION" },
      {
        name: "description",
        content: "Manage admissions, courses, payments and payment settings for the institute.",
      },
      { property: "og:title", content: "Admin Panel" },
      { property: "og:description", content: "Institute management console." },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const { user } = useSession();
  const { data: isAdmin, isLoading } = useIsAdmin(user?.id);

  if (isLoading) return <p className="p-16 text-center text-muted-foreground">Checking access…</p>;
  if (!isAdmin) {
    return (
      <section className="mx-auto max-w-2xl px-4 py-20 text-center">
        <h1 className="font-display text-2xl font-bold">Admins only</h1>
        <p className="mt-3 text-muted-foreground">
          This area is restricted to institute staff accounts.
        </p>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <span className="text-xs font-bold tracking-[0.2em] text-primary uppercase">Admin</span>
      <h1 className="mt-2 font-display text-3xl font-black sm:text-4xl">Institute control panel</h1>

      <Tabs defaultValue="admissions" className="mt-8">
        <TabsList className="flex-wrap">
          <TabsTrigger value="admissions">Admissions</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="settings">Payment QR</TabsTrigger>
        </TabsList>
        <TabsContent value="admissions" className="mt-6">
          <AdmissionsTab />
        </TabsContent>
        <TabsContent value="payments" className="mt-6">
          <PaymentsTab />
        </TabsContent>
        <TabsContent value="courses" className="mt-6">
          <CoursesTab />
        </TabsContent>
        <TabsContent value="users" className="mt-6">
          <UsersTab currentUserId={user?.id} />
        </TabsContent>
        <TabsContent value="settings" className="mt-6">
          <SettingsTab />
        </TabsContent>
      </Tabs>
    </section>
  );
}

/* ---------------- Admissions ---------------- */

function AdmissionsTab() {
  const qc = useQueryClient();
  const [filter, setFilter] = useState<"all" | "pending" | "approved" | "rejected">("all");

  const { data } = useQuery({
    queryKey: ["admin-admissions"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("admissions")
        .select("*, courses(title)")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const update = useMutation({
    mutationFn: async (vars: { id: string; status: "approved" | "rejected"; note?: string | undefined }) => {
      const { error } = await supabase
        .from("admissions")
        .update({
          status: vars.status,
          admin_note: vars.note ?? null,
          reviewed_at: new Date().toISOString(),
        })
        .eq("id", vars.id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Admission updated");
      qc.invalidateQueries({ queryKey: ["admin-admissions"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("admissions").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Admission removed");
      qc.invalidateQueries({ queryKey: ["admin-admissions"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const list = (data ?? []).filter((a) => filter === "all" || a.status === filter);

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {(["all", "pending", "approved", "rejected"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={
              "rounded-full border px-4 py-1.5 text-sm font-semibold capitalize transition-colors " +
              (filter === f
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card text-muted-foreground hover:border-primary/40")
            }
          >
            {f}
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-4">
        {list.length === 0 && <p className="text-muted-foreground">No admissions here yet.</p>}
        {list.map((a) => (
          <article key={a.id} className="surface-card rounded-2xl p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h3 className="font-display text-lg font-bold">{a.candidate_name}</h3>
                <p className="text-sm text-muted-foreground">
                  {a.courses?.title ?? "—"} · {a.contact} · {a.email}
                </p>
              </div>
              <span className="rounded-full bg-secondary px-3 py-1 text-xs font-bold uppercase">
                {a.status}
              </span>
            </div>

            <dl className="mt-4 grid gap-x-6 gap-y-2 text-sm text-muted-foreground sm:grid-cols-2 lg:grid-cols-3">
              <Info label="Date of birth" value={a.date_of_birth} />
              <Info label="Gender" value={a.gender} />
              <Info label="Category" value={a.category} />
              <Info label="Nationality" value={a.nationality} />
              <Info label="Religion" value={a.religion} />
              <Info label="Aadhaar" value={a.aadhaar_no} />
              <Info label="Father" value={`${a.father_name ?? "—"} (${a.father_occupation ?? "—"})`} />
              <Info label="Mother" value={`${a.mother_name ?? "—"} (${a.mother_occupation ?? "—"})`} />
              <Info label="Address" value={a.address} />
            </dl>

            <div className="mt-5 flex flex-wrap gap-2">
              <Button size="sm" variant="hero" onClick={() => update.mutate({ id: a.id, status: "approved" })}>
                <Check /> Approve
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  const note = window.prompt("Reason for rejection (optional)") ?? undefined;
                  update.mutate({ id: a.id, status: "rejected", note });
                }}
              >
                <X /> Reject
              </Button>
              <Button size="sm" variant="ghost" onClick={() => remove.mutate(a.id)}>
                <Trash2 /> Delete
              </Button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string | null }) {
  return (
    <div>
      <dt className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground/70">
        {label}
      </dt>
      <dd className="text-foreground">{value || "—"}</dd>
    </div>
  );
}

/* ---------------- Payments ---------------- */

function PaymentsTab() {
  const qc = useQueryClient();
  const { data } = useQuery({
    queryKey: ["admin-payments"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("payments")
        .select("*, admissions(candidate_name, courses(title))")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const setStatus = useMutation({
    mutationFn: async (vars: { id: string; status: "verified" | "rejected" }) => {
      const { error } = await supabase.from("payments").update({ status: vars.status }).eq("id", vars.id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Payment updated");
      qc.invalidateQueries({ queryKey: ["admin-payments"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  async function viewProof(path: string) {
    const { data, error } = await supabase.storage.from("payment-proofs").createSignedUrl(path, 600);
    if (error || !data) {
      toast.error("Could not open screenshot");
      return;
    }
    window.open(data.signedUrl, "_blank", "noopener");
  }

  return (
    <div className="grid gap-4">
      {(data ?? []).length === 0 && <p className="text-muted-foreground">No payments submitted yet.</p>}
      {data?.map((p) => (
        <article key={p.id} className="surface-card flex flex-wrap items-center justify-between gap-4 rounded-2xl p-6">
          <div>
            <h3 className="font-display text-lg font-bold">
              ₹{p.amount} · {p.plan}
            </h3>
            <p className="text-sm text-muted-foreground">
              {p.admissions?.candidate_name} · {p.admissions?.courses?.title ?? "—"} · UTR:{" "}
              {p.utr || "—"}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-secondary px-3 py-1 text-xs font-bold uppercase">
              {p.status}
            </span>
            {p.screenshot_path && (
              <Button size="sm" variant="outline" onClick={() => viewProof(p.screenshot_path!)}>
                View screenshot
              </Button>
            )}
            <Button size="sm" variant="hero" onClick={() => setStatus.mutate({ id: p.id, status: "verified" })}>
              <Check /> Verify
            </Button>
            <Button size="sm" variant="ghost" onClick={() => setStatus.mutate({ id: p.id, status: "rejected" })}>
              <X /> Reject
            </Button>
          </div>
        </article>
      ))}
    </div>
  );
}

/* ---------------- Courses ---------------- */

const emptyCourse = {
  slug: "",
  title: "",
  level: "",
  course_group: "Foundation",
  description: "",
  subjects: "",
  fee_monthly: "",
  fee_quarterly: "",
  fee_half_yearly: "",
  fee_yearly: "",
  batch_timing: "",
};

function CoursesTab() {
  const qc = useQueryClient();
  const { data } = useQuery({
    queryKey: ["admin-courses"],
    queryFn: async () => {
      const { data, error } = await supabase.from("courses").select("*").order("sort_order");
      if (error) throw error;
      return data;
    },
  });

  const create = useMutation({
    mutationFn: async (form: FormData) => {
      const num = (k: string) => {
        const v = String(form.get(k) ?? "");
        return v ? Number(v) : null;
      };
      const { error } = await supabase.from("courses").insert({
        slug: String(form.get("slug")),
        title: String(form.get("title")),
        level: String(form.get("level") ?? ""),
        course_group: String(form.get("course_group") ?? "Foundation"),
        description: String(form.get("description") ?? ""),
        subjects: String(form.get("subjects") ?? "")
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        fee_monthly: num("fee_monthly"),
        fee_quarterly: num("fee_quarterly"),
        fee_half_yearly: num("fee_half_yearly"),
        fee_yearly: num("fee_yearly"),
        batch_timing: String(form.get("batch_timing") ?? ""),
        sort_order: (data?.length ?? 0) + 1,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Course added");
      qc.invalidateQueries({ queryKey: ["admin-courses"] });
      qc.invalidateQueries({ queryKey: ["courses-active"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const toggle = useMutation({
    mutationFn: async (vars: { id: string; is_active: boolean }) => {
      const { error } = await supabase
        .from("courses")
        .update({ is_active: vars.is_active })
        .eq("id", vars.id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-courses"] }),
    onError: (e: Error) => toast.error(e.message),
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("courses").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Course removed");
      qc.invalidateQueries({ queryKey: ["admin-courses"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
      <div className="grid gap-4">
        {data?.map((c) => (
          <article key={c.id} className="surface-card flex flex-wrap items-center justify-between gap-4 rounded-2xl p-6">
            <div className="min-w-0">
              <h3 className="font-display text-lg font-bold">{c.title}</h3>
              <p className="text-sm text-muted-foreground">
                {c.course_group} · {c.batch_timing || "timing not set"} · ₹{c.fee_monthly ?? "—"}/month
              </p>
              <p className="mt-1 text-xs text-muted-foreground">{c.subjects.join(", ")}</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Switch
                  checked={c.is_active}
                  onCheckedChange={(v) => toggle.mutate({ id: c.id, is_active: v })}
                />
                <span className="text-xs font-semibold text-muted-foreground">
                  {c.is_active ? "Listed" : "Hidden"}
                </span>
              </div>
              <Button size="sm" variant="ghost" onClick={() => remove.mutate(c.id)}>
                <Trash2 />
              </Button>
            </div>
          </article>
        ))}
      </div>

      <form
        className="surface-card h-fit rounded-2xl p-6"
        onSubmit={(e: FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          create.mutate(new FormData(e.currentTarget));
          e.currentTarget.reset();
        }}
      >
        <h3 className="font-display text-lg font-bold">Add a course</h3>
        <div className="mt-4 grid gap-4">
          {Object.keys(emptyCourse).map((k) =>
            k === "description" ? (
              <div key={k} className="grid gap-2">
                <Label htmlFor={k}>Description</Label>
                <Textarea id={k} name={k} rows={2} />
              </div>
            ) : (
              <div key={k} className="grid gap-2">
                <Label htmlFor={k} className="capitalize">
                  {k.replace(/_/g, " ")}
                </Label>
                <Input
                  id={k}
                  name={k}
                  required={k === "slug" || k === "title"}
                  placeholder={k === "subjects" ? "Maths, Science, English" : undefined}
                />
              </div>
            ),
          )}
        </div>
        <Button type="submit" variant="hero" className="mt-6 w-full" disabled={create.isPending}>
          <Plus /> Add course
        </Button>
      </form>
    </div>
  );
}

/* ---------------- Users ---------------- */

function UsersTab({ currentUserId }: { currentUserId?: string | undefined }) {
  const qc = useQueryClient();
  const { data } = useQuery({
    queryKey: ["admin-users"],
    queryFn: async () => {
      const [{ data: profiles, error }, { data: roles, error: rErr }] = await Promise.all([
        supabase.from("profiles").select("*").order("created_at", { ascending: false }),
        supabase.from("user_roles").select("user_id, role"),
      ]);
      if (error) throw error;
      if (rErr) throw rErr;
      return (profiles ?? []).map((p) => ({
        ...p,
        isAdmin: (roles ?? []).some((r) => r.user_id === p.id && r.role === "admin"),
      }));
    },
  });

  const setAdmin = useMutation({
    mutationFn: async (vars: { userId: string; make: boolean }) => {
      if (vars.make) {
        const { error } = await supabase
          .from("user_roles")
          .insert({ user_id: vars.userId, role: "admin" });
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("user_roles")
          .delete()
          .eq("user_id", vars.userId)
          .eq("role", "admin");
        if (error) throw error;
      }
    },
    onSuccess: () => {
      toast.success("Access updated");
      qc.invalidateQueries({ queryKey: ["admin-users"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <div className="grid gap-3">
      {data?.map((u) => (
        <div
          key={u.id}
          className="surface-card flex flex-wrap items-center justify-between gap-3 rounded-2xl p-5"
        >
          <div>
            <p className="font-semibold">{u.full_name || "Unnamed student"}</p>
            <p className="text-sm text-muted-foreground">
              {u.email} {u.phone ? `· ${u.phone}` : ""}
            </p>
          </div>
          {u.id === currentUserId ? (
            <span className="text-xs font-bold uppercase text-primary">You (admin)</span>
          ) : (
            <Button
              size="sm"
              variant={u.isAdmin ? "ghost" : "outline"}
              onClick={() => setAdmin.mutate({ userId: u.id, make: !u.isAdmin })}
            >
              {u.isAdmin ? <ShieldMinus /> : <ShieldCheck />}
              {u.isAdmin ? "Remove admin" : "Make admin"}
            </Button>
          )}
        </div>
      ))}
    </div>
  );
}

/* ---------------- Settings ---------------- */

function SettingsTab() {
  const qc = useQueryClient();
  const { data } = useQuery({
    queryKey: ["payment-settings-admin"],
    queryFn: async () => {
      const { data, error } = await supabase.from("payment_settings").select("*").eq("id", 1).maybeSingle();
      if (error) throw error;
      return data;
    },
  });

  const [upi, setUpi] = useState("");
  const [payee, setPayee] = useState("");
  const [instructions, setInstructions] = useState("");

  useEffect(() => {
    if (data) {
      setUpi(data.upi_id);
      setPayee(data.payee_name);
      setInstructions(data.instructions);
    }
  }, [data]);

  const save = useMutation({
    mutationFn: async (file: File | null) => {
      let qrPath = data?.qr_image_url ?? null;
      if (file) {
        const ext = file.name.split(".").pop() ?? "png";
        qrPath = `qr/upi-qr.${ext}`;
        const { error: upErr } = await supabase.storage
          .from("site-assets")
          .upload(qrPath, file, { upsert: true });
        if (upErr) throw upErr;
      }
      const { error } = await supabase
        .from("payment_settings")
        .update({ upi_id: upi, payee_name: payee, instructions, qr_image_url: qrPath })
        .eq("id", 1);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Payment settings saved");
      qc.invalidateQueries({ queryKey: ["payment-settings-admin"] });
      qc.invalidateQueries({ queryKey: ["payment-settings"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const [file, setFile] = useState<File | null>(null);

  return (
    <form
      className="surface-card max-w-xl rounded-2xl p-7"
      onSubmit={(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        save.mutate(file);
      }}
    >
      <h3 className="font-display text-lg font-bold">UPI QR &amp; payment details</h3>
      <div className="mt-5 grid gap-5">
        <div className="grid gap-2">
          <Label htmlFor="upi">UPI ID</Label>
          <Input id="upi" value={upi} onChange={(e) => setUpi(e.target.value)} required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="payee">Payee name</Label>
          <Input id="payee" value={payee} onChange={(e) => setPayee(e.target.value)} required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="instr">Instructions shown to students</Label>
          <Textarea
            id="instr"
            rows={3}
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="qr">Upload QR image</Label>
          <Input
            id="qr"
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          />
          <p className="text-xs text-muted-foreground">
            Current: {data?.qr_image_url ? "QR uploaded" : "no QR uploaded yet"}
          </p>
        </div>
      </div>
      <Button type="submit" variant="hero" className="mt-6" disabled={save.isPending}>
        <Save /> Save settings
      </Button>
    </form>
  );
}
