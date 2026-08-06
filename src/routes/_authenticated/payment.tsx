import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute, Link, useSearch } from "@tanstack/react-router";
import { QrCode, Upload } from "lucide-react";
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
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@/hooks/useAuth";

type PaymentSearch = { admission?: string | undefined };

export const Route = createFileRoute("/_authenticated/payment")({
  validateSearch: (search: Record<string, unknown>): PaymentSearch => ({
    admission: typeof search["admission"] === "string" ? search["admission"] : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Pay Fees Online | MY AIM HUB OF EDUCATION" },
      {
        name: "description",
        content: "Scan the UPI QR code, pay your course fee and upload the payment screenshot.",
      },
      { property: "og:title", content: "Pay Fees Online" },
      { property: "og:description", content: "Secure UPI QR fee payment for enrolled students." },
    ],
  }),
  component: PaymentPage,
});

const plans = [
  { value: "monthly", label: "Monthly", key: "fee_monthly" },
  { value: "quarterly", label: "Quarterly", key: "fee_quarterly" },
  { value: "half_yearly", label: "Half-yearly", key: "fee_half_yearly" },
  { value: "yearly", label: "Yearly", key: "fee_yearly" },
] as const;

function PaymentPage() {
  const { user } = useSession();
  const qc = useQueryClient();
  const search = useSearch({ from: "/_authenticated/payment" });
  const [plan, setPlan] = useState<string>("monthly");
  const [file, setFile] = useState<File | null>(null);

  const { data: settings } = useQuery({
    queryKey: ["payment-settings"],
    queryFn: async () => {
      const { data, error } = await supabase.from("payment_settings").select("*").eq("id", 1).maybeSingle();
      if (error) throw error;
      if (data?.qr_image_url && !data.qr_image_url.startsWith("http")) {
        const signed = await supabase.storage
          .from("site-assets")
          .createSignedUrl(data.qr_image_url, 3600);
        return { ...data, qrUrl: signed.data?.signedUrl ?? null };
      }
      return { ...data, qrUrl: data?.qr_image_url ?? null };
    },
  });

  const { data: admission } = useQuery({
    queryKey: ["admission", search.admission],
    enabled: !!search.admission,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("admissions")
        .select("id, candidate_name, status, courses(title, fee_monthly, fee_quarterly, fee_half_yearly, fee_yearly)")
        .eq("id", search.admission!)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  });

  const course = admission?.courses;
  const planKey = plans.find((p) => p.value === plan)?.key ?? "fee_monthly";
  const suggested = course ? (course[planKey] ?? "") : "";

  const submit = useMutation({
    mutationFn: async (form: FormData) => {
      let path: string | null = null;
      if (file) {
        const ext = file.name.split(".").pop() ?? "jpg";
        path = `${user!.id}/${Date.now()}.${ext}`;
        const { error: upErr } = await supabase.storage.from("payment-proofs").upload(path, file);
        if (upErr) throw upErr;
      }
      const { error } = await supabase.from("payments").insert({
        admission_id: search.admission!,
        user_id: user!.id,
        amount: Number(form.get("amount")),
        plan,
        utr: String(form.get("utr") || ""),
        screenshot_path: path,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Payment submitted", {
        description: "Our office will verify your payment and confirm the admission.",
      });
      setFile(null);
      qc.invalidateQueries({ queryKey: ["my-admissions"] });
    },
    onError: (e: Error) => toast.error("Could not submit payment", { description: e.message }),
  });

  if (!search.admission) {
    return (
      <section className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6">
        <h1 className="font-display text-2xl font-bold">Select an application first</h1>
        <p className="mt-3 text-muted-foreground">
          Open your dashboard and choose the admission you want to pay for.
        </p>
        <Button asChild variant="hero" className="mt-6">
          <Link to="/dashboard">Go to dashboard</Link>
        </Button>
      </section>
    );
  }

  return (
    <section className="mx-auto grid max-w-6xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-2">
      <div className="surface-card rounded-2xl p-7 sm:p-9">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary-soft text-primary">
            <QrCode className="h-5 w-5" />
          </span>
          <div>
            <h1 className="font-display text-xl font-bold">Scan &amp; pay</h1>
            <p className="text-xs text-muted-foreground">{settings?.payee_name}</p>
          </div>
        </div>

        <div className="mt-6 aspect-square w-full overflow-hidden rounded-xl border border-border bg-secondary/40">
          {settings?.qrUrl ? (
            <img
              src={settings.qrUrl}
              alt="UPI payment QR code for MY AIM HUB OF EDUCATION"
              className="h-full w-full object-contain p-4"
            />
          ) : (
            <div className="grid h-full place-items-center p-6 text-center text-sm text-muted-foreground">
              QR code not uploaded yet. Use the UPI ID below to pay.
            </div>
          )}
        </div>

        <div className="mt-5 rounded-xl bg-secondary p-4">
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">UPI ID</p>
          <p className="mt-1 font-display text-lg font-extrabold text-primary">{settings?.upi_id}</p>
        </div>
        <p className="mt-4 text-sm text-muted-foreground">{settings?.instructions}</p>
      </div>

      <form
        className="surface-card rounded-2xl p-7 sm:p-9"
        onSubmit={(e: FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          submit.mutate(new FormData(e.currentTarget));
        }}
      >
        <h2 className="font-display text-xl font-bold">Submit payment details</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {admission?.candidate_name} · {course?.title ?? "Course"}
        </p>

        <div className="mt-6 grid gap-5">
          <div className="grid gap-2">
            <Label htmlFor="plan">Fee plan</Label>
            <Select value={plan} onValueChange={setPlan}>
              <SelectTrigger id="plan">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {plans.map((p) => (
                  <SelectItem key={p.value} value={p.value}>
                    {p.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="amount">Amount paid (₹)</Label>
            <Input
              id="amount"
              name="amount"
              type="number"
              min={1}
              required
              key={String(suggested)}
              defaultValue={suggested ?? ""}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="utr">UPI reference / UTR number</Label>
            <Input id="utr" name="utr" placeholder="12-digit transaction reference" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="proof">Payment screenshot</Label>
            <Input
              id="proof"
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            />
          </div>
        </div>

        <Button type="submit" variant="hero" size="xl" className="mt-8 w-full" disabled={submit.isPending}>
          <Upload /> Submit payment
        </Button>
        <p className="mt-4 text-xs text-muted-foreground">
          Your screenshot is stored privately and is only visible to you and the office staff.
        </p>
      </form>
    </section>
  );
}
