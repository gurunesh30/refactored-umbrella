import { createBrowserClient } from '@supabase/auth-helpers-nextjs'

export const useAuth = () => {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const loginWithPassword = async (email: string, password: string) => {
    return await supabase.auth.signInWithPassword({
      email,
      password,
    })
  }

  const signUp = async (email: string, password: string, fullName: string, orgName: string) => {
    // 1. Sign up the user in Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        }
      }
    })

    if (authError) return { data: authData, error: authError }
    if (!authData.user) return { data: authData, error: new Error("User creation failed") }

    try {
      // 2. Create the Organization
      const { data: orgData, error: orgError } = await supabase
        .from('organizations')
        .insert({ name: orgName })
        .select()
        .single()

      if (orgError) throw orgError

      // 3. Create the Profile associated with the User and Organization
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: authData.user.id,
          full_name: fullName,
          organization_id: orgData.id,
          role: 'owner',
        })

      if (profileError) throw profileError

      return { data: authData, error: null }
    } catch (err: any) {
      // Note: In a real app, you might want to handle rollback or cleanup here
      return { data: authData, error: err }
    }
  }

  return { loginWithPassword, signUp }
}
