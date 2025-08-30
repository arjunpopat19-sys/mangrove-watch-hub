-- Create the admin accounts in auth.users table
-- These users will be created with admin role in profiles table

-- First, let's add a column to track if a user can promote others to admin
ALTER TABLE public.profiles ADD COLUMN can_promote_admins BOOLEAN DEFAULT FALSE;

-- Update the handle_new_user function to support admin role assignment
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER 
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, first_name, last_name, role, can_promote_admins)
  VALUES (
    NEW.id, 
    NEW.email,
    NEW.raw_user_meta_data ->> 'first_name',
    NEW.raw_user_meta_data ->> 'last_name',
    CASE 
      WHEN NEW.email IN ('meet278@gmail.com', 'tempuseuse21@gmail.com', 'arjunpopat19@gmail.com') 
      THEN 'admin'::app_role 
      ELSE 'user'::app_role 
    END,
    CASE 
      WHEN NEW.email IN ('meet278@gmail.com', 'tempuseuse21@gmail.com', 'arjunpopat19@gmail.com') 
      THEN TRUE 
      ELSE FALSE 
    END
  );
  RETURN NEW;
END;
$$;

-- Create function for admins to promote users to admin
CREATE OR REPLACE FUNCTION public.promote_user_to_admin(_user_id uuid, _promoted_by uuid)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Check if the promoter has admin privileges and can promote
  IF NOT EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = _promoted_by 
    AND role = 'admin'::app_role 
    AND can_promote_admins = TRUE
  ) THEN
    RETURN FALSE;
  END IF;
  
  -- Promote the user
  UPDATE public.profiles 
  SET role = 'admin'::app_role 
  WHERE user_id = _user_id;
  
  RETURN TRUE;
END;
$$;

-- Update RLS policies for the new can_promote_admins functionality
CREATE POLICY "Users can view profile promotion status"
ON public.profiles
FOR SELECT
USING (auth.uid() = user_id OR has_role(auth.uid(), 'admin'));

-- Add policy for updating profiles (promoting users)
CREATE POLICY "Admins can update other profiles for promotion"
ON public.profiles
FOR UPDATE
USING (
  auth.uid() = user_id OR 
  (has_role(auth.uid(), 'admin') AND EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() AND can_promote_admins = TRUE
  ))
);

-- Ensure incident_reports can be viewed by admins
CREATE POLICY "Admins can view all incident reports"
ON public.incident_reports
FOR SELECT
USING (has_role(auth.uid(), 'admin') OR auth.uid() = user_id);