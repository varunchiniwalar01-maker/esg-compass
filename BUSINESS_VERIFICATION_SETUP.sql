-- ============================================================================
-- AUTOMATED BUSINESS VERIFICATION (SMART TRIGGER)
-- ============================================================================
-- This trigger handles the final step of auto-verification.
-- It maps the frontend 'autoVerified' flag directly to the database status.
-- ============================================================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (
    id, 
    email, 
    full_name,
    company_name,
    industry,
    company_type,
    company_size,
    user_role,
    gstin,
    business_reg_number,
    verification_status,
    is_business_verified
  )
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    NEW.raw_user_meta_data->>'company_name',
    NEW.raw_user_meta_data->>'industry',
    NEW.raw_user_meta_data->>'company_type',
    NEW.raw_user_meta_data->>'company_size',
    NEW.raw_user_meta_data->>'user_role',
    NEW.raw_user_meta_data->>'gstin',
    NEW.raw_user_meta_data->>'business_reg_number',
    NEW.raw_user_meta_data->>'phone_number',
    COALESCE(NEW.raw_user_meta_data->>'verification_status', 'pending'),
    COALESCE((NEW.raw_user_meta_data->>'is_business_verified')::boolean, FALSE)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Re-apply trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Success message
DO $$
BEGIN
  RAISE NOTICE '🚀 Automated Verification Trigger is now LIVE!';
END $$;
