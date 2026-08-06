CREATE TYPE public.app_role AS ENUM ('admin','student');
CREATE TYPE public.admission_status AS ENUM ('pending','approved','rejected');
CREATE TYPE public.payment_status AS ENUM ('pending','verified','rejected');

-- PROFILES
CREATE TABLE public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text NOT NULL DEFAULT '',
  email text,
  phone text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- ROLES
CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE POLICY "Users read own profile" ON public.profiles FOR SELECT TO authenticated USING (auth.uid() = id OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "Users insert own profile" ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);
CREATE POLICY "Users update own profile" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id OR public.has_role(auth.uid(),'admin')) WITH CHECK (auth.uid() = id OR public.has_role(auth.uid(),'admin'));

CREATE POLICY "Read own roles" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id OR public.has_role(auth.uid(),'admin'));

-- COURSES
CREATE TABLE public.courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  level text NOT NULL DEFAULT '',
  course_group text NOT NULL DEFAULT 'Foundation',
  description text NOT NULL DEFAULT '',
  subjects text[] NOT NULL DEFAULT '{}',
  fee_monthly integer,
  fee_quarterly integer,
  fee_half_yearly integer,
  fee_yearly integer,
  batch_timing text NOT NULL DEFAULT '',
  is_active boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.courses TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.courses TO authenticated;
GRANT ALL ON public.courses TO service_role;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view active courses" ON public.courses FOR SELECT TO anon, authenticated USING (is_active OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "Admins manage courses" ON public.courses FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

-- ADMISSIONS
CREATE TABLE public.admissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id uuid REFERENCES public.courses(id) ON DELETE SET NULL,
  candidate_name text NOT NULL,
  date_of_birth date NOT NULL,
  gender text NOT NULL,
  nationality text NOT NULL DEFAULT 'Indian',
  religion text,
  category text,
  registration_date date NOT NULL DEFAULT current_date,
  aadhaar_no text,
  mother_name text,
  mother_occupation text,
  mother_income text,
  father_name text,
  father_occupation text,
  father_income text,
  address text NOT NULL,
  contact text NOT NULL,
  email text,
  status public.admission_status NOT NULL DEFAULT 'pending',
  admin_note text,
  reviewed_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.admissions TO authenticated;
GRANT ALL ON public.admissions TO service_role;
ALTER TABLE public.admissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Students read own admissions" ON public.admissions FOR SELECT TO authenticated USING (auth.uid() = user_id OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "Students create own admissions" ON public.admissions FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Students update own pending admissions" ON public.admissions FOR UPDATE TO authenticated USING ((auth.uid() = user_id AND status = 'pending') OR public.has_role(auth.uid(),'admin')) WITH CHECK ((auth.uid() = user_id) OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "Admins delete admissions" ON public.admissions FOR DELETE TO authenticated USING (public.has_role(auth.uid(),'admin'));

-- PAYMENTS
CREATE TABLE public.payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  admission_id uuid NOT NULL REFERENCES public.admissions(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  amount integer NOT NULL,
  plan text NOT NULL DEFAULT 'monthly',
  utr text,
  screenshot_path text,
  status public.payment_status NOT NULL DEFAULT 'pending',
  admin_note text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.payments TO authenticated;
GRANT ALL ON public.payments TO service_role;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Students read own payments" ON public.payments FOR SELECT TO authenticated USING (auth.uid() = user_id OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "Students create own payments" ON public.payments FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Update payments" ON public.payments FOR UPDATE TO authenticated USING ((auth.uid() = user_id AND status = 'pending') OR public.has_role(auth.uid(),'admin')) WITH CHECK ((auth.uid() = user_id) OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "Admins delete payments" ON public.payments FOR DELETE TO authenticated USING (public.has_role(auth.uid(),'admin'));

-- PAYMENT SETTINGS
CREATE TABLE public.payment_settings (
  id integer PRIMARY KEY DEFAULT 1,
  upi_id text NOT NULL DEFAULT '',
  payee_name text NOT NULL DEFAULT 'MY AIM HUB OF EDUCATION',
  qr_image_url text,
  instructions text NOT NULL DEFAULT 'Scan the QR with any UPI app, pay the fee, then upload the payment screenshot and UTR number below.',
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT payment_settings_single_row CHECK (id = 1)
);
GRANT SELECT ON public.payment_settings TO anon, authenticated;
GRANT ALL ON public.payment_settings TO service_role;
GRANT INSERT, UPDATE ON public.payment_settings TO authenticated;
ALTER TABLE public.payment_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read payment settings" ON public.payment_settings FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admins manage payment settings" ON public.payment_settings FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

INSERT INTO public.payment_settings (id, upi_id) VALUES (1, '9125724483@upi');

-- timestamps + profile trigger
CREATE OR REPLACE FUNCTION public.set_updated_at() RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

CREATE TRIGGER trg_profiles_updated BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER trg_courses_updated BEFORE UPDATE ON public.courses FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER trg_admissions_updated BEFORE UPDATE ON public.admissions FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER trg_payments_updated BEFORE UPDATE ON public.payments FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE OR REPLACE FUNCTION public.handle_new_user() RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email, phone)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name',''), NEW.email, NEW.raw_user_meta_data->>'phone')
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'student') ON CONFLICT DO NOTHING;
  RETURN NEW;
END; $$;

CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- SEED COURSES
INSERT INTO public.courses (slug,title,level,course_group,description,subjects,fee_monthly,fee_quarterly,fee_half_yearly,fee_yearly,batch_timing,sort_order) VALUES
('class-1-5','Class 1–5 Junior Foundation','Primary','Foundation','Concept-first learning with activity based classes and daily practice.','{"English","Hindi","Maths","EVS"}',700,2000,3800,7000,'Mon–Sat · 3:30 PM – 5:00 PM',1),
('class-6-8','Class 6–8 Foundation Booster','Middle School','Foundation','Strong NCERT base with weekly tests and doubt sessions.','{"Maths","Science","English","SST","Hindi"}',900,2600,5000,9000,'Mon–Sat · 4:00 PM – 6:00 PM',2),
('class-9','Class 9 Board Base','Secondary','Secondary','Complete CBSE/ICSE syllabus with chapter tests.','{"Maths","Science","English","SST"}',1200,3400,6500,12000,'Mon–Sat · 6:00 PM – 8:00 PM',3),
('class-10','Class 10 Board Champions','Secondary','Secondary','Board-focused revision, PYQs and full length model papers.','{"Maths","Science","English","SST"}',1400,4000,7600,14000,'Mon–Sat · 6:00 PM – 8:30 PM',4),
('class-11-12-pcm','Class 11–12 Science (PCM)','Senior Secondary','Senior Secondary','Physics, Chemistry, Maths with board + competitive orientation.','{"Physics","Chemistry","Maths","English"}',1800,5200,10000,18000,'Mon–Sat · 7:00 AM – 9:30 AM',5),
('class-11-12-pcb','Class 11–12 Science (PCB)','Senior Secondary','Senior Secondary','Physics, Chemistry, Biology with NEET-oriented practice.','{"Physics","Chemistry","Biology","English"}',1800,5200,10000,18000,'Mon–Sat · 7:00 AM – 9:30 AM',6),
('class-11-12-commerce','Class 11–12 Commerce','Senior Secondary','Senior Secondary','Accounts, Business Studies and Economics with practical case work.','{"Accountancy","Business Studies","Economics","Maths"}',1500,4300,8200,15000,'Mon–Sat · 10:00 AM – 12:30 PM',7),
('class-11-12-arts','Class 11–12 Arts / Humanities','Senior Secondary','Senior Secondary','History, Political Science, Geography and Sociology with answer-writing practice.','{"History","Political Science","Geography","Sociology","English"}',1200,3400,6500,12000,'Mon–Sat · 12:30 PM – 3:00 PM',8);