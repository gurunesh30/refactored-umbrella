"use server"

import { createServerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { revalidatePath } from "next/cache"

export async function createNewProject() {
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error("Not authenticated")

  // Fetch the current profile to check usage limits
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('plan_type, usage_count')
    .eq('id', user.id)
    .single()

  if (profileError || !profile) {
    throw new Error("Failed to load profile data.")
  }

  const maxLimit = profile.plan_type === 'pro' ? 100 : 5
  const currentUsage = profile.usage_count || 0

  if (currentUsage >= maxLimit) {
    return { 
      success: false, 
      error: `You've reached your ${profile.plan_type} plan limit of ${maxLimit} projects. Please upgrade to continue.` 
    }
  }

  // Increment usage count
  const { error: updateError } = await supabase
    .from('profiles')
    .update({ usage_count: currentUsage + 1 })
    .eq('id', user.id)

  if (updateError) {
    throw new Error("Failed to update usage count: " + updateError.message)
  }

  revalidatePath('/dashboard')

  return { 
    success: true, 
    message: `Project created! (${currentUsage + 1}/${maxLimit} used)` 
  }
}
