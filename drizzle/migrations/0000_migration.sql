CREATE TABLE public.enquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  phone text NOT NULL,
  email text,
  enquiry_type text NOT NULL,
  product text,
  message text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT enquiries_name_len CHECK (char_length(name) BETWEEN 1 AND 100),
  CONSTRAINT enquiries_phone_len CHECK (char_length(phone) BETWEEN 7 AND 20),
  CONSTRAINT enquiries_email_len CHECK (email IS NULL OR char_length(email) <= 255),
  CONSTRAINT enquiries_type_len CHECK (char_length(enquiry_type) BETWEEN 1 AND 60),
  CONSTRAINT enquiries_product_len CHECK (product IS NULL OR char_length(product) <= 120),
  CONSTRAINT enquiries_message_len CHECK (char_length(message) BETWEEN 1 AND 1500)
);
GRANT INSERT ON public.enquiries TO anon, authenticated;
GRANT ALL ON public.enquiries TO service_role;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit an enquiry" ON public.enquiries FOR INSERT TO anon, authenticated WITH CHECK (true);