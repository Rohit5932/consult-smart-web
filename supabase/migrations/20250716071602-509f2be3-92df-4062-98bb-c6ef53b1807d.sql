
-- Drop the existing foreign key constraint that references auth.users
ALTER TABLE public.user_data 
DROP CONSTRAINT IF EXISTS user_data_user_id_fkey;

-- Add new foreign key constraint to link user_data.user_id to profiles.id
ALTER TABLE public.user_data 
ADD CONSTRAINT user_data_user_id_fkey 
FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE;
