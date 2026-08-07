CREATE INDEX IF NOT EXISTS idx_admissions_user_created ON public.admissions (user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_admissions_status ON public.admissions (status, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_admissions_course ON public.admissions (course_id);
CREATE INDEX IF NOT EXISTS idx_payments_admission ON public.payments (admission_id);
CREATE INDEX IF NOT EXISTS idx_payments_user_created ON public.payments (user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_payments_status ON public.payments (status, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_courses_active_sort ON public.courses (is_active, sort_order);
CREATE INDEX IF NOT EXISTS idx_user_roles_user_role ON public.user_roles (user_id, role);
CREATE INDEX IF NOT EXISTS idx_profiles_created ON public.profiles (created_at DESC);