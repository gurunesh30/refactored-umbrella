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

  const signUp = async (email: string, password: string, fullName: string) => {
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
      // 2. Create the Profile only (No Org yet)
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: authData.user.id,
          full_name: fullName,
          role: 'member', // Default role until they create/join an org
        })

      if (profileError) throw profileError

      return { data: authData, error: null }
    } catch (err) {
      return { data: authData, error: err instanceof Error ? err : new Error(String(err)) }
    }
  }

  return { loginWithPassword, signUp }
}
