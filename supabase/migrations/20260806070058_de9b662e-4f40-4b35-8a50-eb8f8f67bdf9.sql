CREATE POLICY "Users upload own payment proofs" ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'payment-proofs' AND (storage.foldername(name))[1] = auth.uid()::text);
CREATE POLICY "Users read own payment proofs" ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id = 'payment-proofs' AND ((storage.foldername(name))[1] = auth.uid()::text OR public.has_role(auth.uid(),'admin')));
CREATE POLICY "Users update own payment proofs" ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'payment-proofs' AND (storage.foldername(name))[1] = auth.uid()::text);

CREATE POLICY "Signed-in users read site assets" ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id = 'site-assets');
CREATE POLICY "Admins manage site assets" ON storage.objects FOR ALL TO authenticated
  USING (bucket_id = 'site-assets' AND public.has_role(auth.uid(),'admin'))
  WITH CHECK (bucket_id = 'site-assets' AND public.has_role(auth.uid(),'admin'));