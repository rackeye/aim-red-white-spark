DROP POLICY "Anyone can view active courses" ON public.courses;
CREATE POLICY "Public can view active courses" ON public.courses FOR SELECT TO anon USING (is_active);
CREATE POLICY "Users can view courses" ON public.courses FOR SELECT TO authenticated USING (is_active OR public.has_role(auth.uid(),'admin'));

REVOKE ALL ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated, service_role;