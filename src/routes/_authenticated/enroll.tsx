import { useMutation, useQuery } from "@tanstack/react-query";
import { createFileRoute, useNavigate, useSearch } from "@tanstack/react-router";
import { Send } from "lucide-react";
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
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@/hooks/useAuth";

type EnrollSearch = { course?: string | undefined };

export const Route = createFileRoute("/_authenticated/enroll")({
  validateSearch: (search: Record<string, unknown>): EnrollSearch => ({
    course: typeof search["course"] === "string" ? search["course"] : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Online Admission Form | MY AIM HUB OF EDUCATION" },
      {
        name: "description",
        content:
          "Fill the official admission form online — candidate details, parent details, address and course selection.",
      },
      { property: "og:title", content: "Online Admission Form" },
      { property: "og:description", content: "Apply for admission in a few minutes." },
    ],
  }),
  component: EnrollPage,
});

const genders = ["Male", "Female", "Other"];
const categories = ["General", "OBC", "SC", "ST", "EWS"];

function EnrollPage() {
  const { user } = useSession();
  const navigate = useNavigate();
  const search = useSearch({ from: "/_authenticated/enroll" });

  const { data: courses } = useQuery({
    queryKey: ["courses-active"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("courses")
        .select("id, slug, title, fee_monthly")
        .eq("is_active", true)
        .order("sort_order");
      if (error) throw error;
      return data;
    },
  });

  const [courseId, setCourseId] = useState("");
  const [gender, setGender] = useState("");
  const [category, setCategory] = useState("General");

  const preselect = courses?.find((c) => c.slug === search.course)?.id;
  const selectedCourse = courseId || preselect || "";

  const submit = useMutation({
    mutationFn: async (form: FormData) => {
      const payload = {
        user_id: user!.id,
        course_id: selectedCourse || null,
        candidate_name: String(form.get("candidate_name")),
        date_of_birth: String(form.get("date_of_birth")),
        gender,
        nationality: String(form.get("nationality") || "Indian"),
        religion: String(form.get("religion") || ""),
        category,
        aadhaar_no: String(form.get("aadhaar_no") || ""),
        mother_name: String(form.get("mother_name") || ""),
        mother_occupation: String(form.get("mother_occupation") || ""),
        mother_income: String(form.get("mother_income") || ""),
        father_name: String(form.get("father_name") || ""),
        father_occupation: String(form.get("father_occupation") || ""),
        father_income: String(form.get("father_income") || ""),
        address: String(form.get("address")),
        contact: String(form.get("contact")),
        email: String(form.get("email") || user?.email || ""),
      };
      const { data, error } = await supabase.from("admissions").insert(payload).select("id").single();
      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      toast.success("Admission form submitted", {
        description: "Now pay the fee by UPI QR to complete your enrolment.",
      });
      navigate({ to: "/payment", search: { admission: data.id } });
    },
    onError: (e: Error) => toast.error("Could not submit", { description: e.message }),
  });

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!gender) {
      toast.error("Please select gender");
      return;
    }
    if (!selectedCourse) {
      toast.error("Please select a course");
      return;
    }
    submit.mutate(new FormData(e.currentTarget));
  }

  return (
    <section className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
      <span className="text-xs font-bold tracking-[0.2em] text-primary uppercase">Admission</span>
      <h1 className="mt-2 font-display text-3xl font-black sm:text-4xl">Registration form</h1>
      <p className="mt-3 text-muted-foreground">
        All fields marked with * are required. Details are verified at the centre during document
        submission.
      </p>

      <form onSubmit={onSubmit} className="surface-card mt-8 rounded-2xl p-7 sm:p-9">
        <h2 className="font-display text-lg font-bold">Candidate details</h2>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <Field id="candidate_name" label="Candidate's name *" required />
          <div className="grid gap-2">
            <Label htmlFor="date_of_birth">Date of birth *</Label>
            <Input id="date_of_birth" name="date_of_birth" type="date" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="gender">Gender *</Label>
            <Select value={gender} onValueChange={setGender}>
              <SelectTrigger id="gender">
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                {genders.map((g) => (
                  <SelectItem key={g} value={g}>
                    {g}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Field id="nationality" label="Nationality" defaultValue="Indian" />
          <Field id="religion" label="Religion" />
          <div className="grid gap-2">
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger id="category">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Field id="aadhaar_no" label="Aadhaar number" placeholder="12-digit number" />
          <div className="grid gap-2">
            <Label htmlFor="course">Course applying for *</Label>
            <Select value={selectedCourse} onValueChange={setCourseId}>
              <SelectTrigger id="course">
                <SelectValue placeholder="Select a course" />
              </SelectTrigger>
              <SelectContent>
                {courses?.map((c) => (
                  <SelectItem key={c.id} value={c.id}>
                    {c.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <h2 className="mt-9 font-display text-lg font-bold">Parent / guardian details</h2>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <Field id="father_name" label="Father's name" />
          <Field id="father_occupation" label="Father's occupation" />
          <Field id="father_income" label="Father's annual income" />
          <Field id="mother_name" label="Mother's name" />
          <Field id="mother_occupation" label="Mother's occupation" />
          <Field id="mother_income" label="Mother's annual income" />
        </div>

        <h2 className="mt-9 font-display text-lg font-bold">Contact details</h2>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <Field id="contact" label="Contact number *" required type="tel" />
          <Field id="email" label="Email" type="email" defaultValue={user?.email ?? ""} />
          <div className="grid gap-2 sm:col-span-2">
            <Label htmlFor="address">Full address *</Label>
            <Textarea id="address" name="address" rows={3} required />
          </div>
        </div>

        <Button
          type="submit"
          variant="hero"
          size="xl"
          className="mt-8 w-full sm:w-auto"
          disabled={submit.isPending}
        >
          Submit & continue to payment <Send />
        </Button>
      </form>
    </section>
  );
}

function Field({
  id,
  label,
  ...rest
}: { id: string; label: string } & React.ComponentProps<typeof Input>) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} name={id} {...rest} />
    </div>
  );
}
