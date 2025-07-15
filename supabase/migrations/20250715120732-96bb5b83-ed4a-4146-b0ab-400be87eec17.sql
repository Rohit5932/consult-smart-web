
-- Add foreign key constraint to link user_data.user_id to profiles.id
ALTER TABLE public.user_data 
ADD CONSTRAINT user_data_user_id_fkey 
FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE;
