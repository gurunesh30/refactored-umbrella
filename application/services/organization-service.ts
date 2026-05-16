'use server'

import { createServerClient, type CookieOptions } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

async function getSupabase() {
  const cookieStore = await cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options })
          } catch (error) {
            // Handle edge case where cookies can't be set
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: '', ...options })
          } catch (error) {
            // Handle edge case where cookies can't be set
          }
        },
      },
    }
  )
}

export async function createOrganization(formData: FormData): Promise<{ success: boolean; error?: string }> {
  const name = formData.get('name') as string
  const slug = formData.get('slug') as string
  
  const supabase = await getSupabase()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { success: false, error: "Unauthorized" }

  // Call the SECURITY DEFINER RPC function — bypasses RLS
  const { data, error } = await supabase.rpc('create_organization', {
    org_name: name,
    org_slug: slug,
  })

  if (error) {
    console.error('Create Org RPC Error:', error)
    return { success: false, error: error.message }
  }

  // Clear the server-side cache so dashboard fetches fresh data
  revalidatePath('/dashboard', 'layout')
  revalidatePath('/onboarding')
  
  return { success: true }
}

export async function checkUserHasOrganization(): Promise<boolean> {
  const supabase = await getSupabase()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return false

  const { data: profile } = await supabase
    .from('profiles')
    .select('organization_id')
    .eq('id', user.id)
    .single()

  return !!profile?.organization_id
}

export async function switchOrganization(orgId: string) {
  const supabase = await getSupabase()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return

  const { error } = await supabase
    .from('profiles')
    .update({ organization_id: orgId })
    .eq('id', user.id)

  if (error) throw error
  
  redirect('/dashboard')
}

export async function inviteMember(email: string, role: string, organizationId: string) {
  const supabase = await getSupabase()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error("Unauthorized")

  const { error } = await supabase
    .from('invitations')
    .insert({
      email,
      role,
      organization_id: organizationId,
      inviter_id: user.id,
      status: 'pending'
    })

  if (error) throw error
}

export async function getPendingInvitations(organizationId: string) {
  const supabase = await getSupabase()
  const { data, error } = await supabase
    .from('invitations')
    .select('*')
    .eq('organization_id', organizationId)
    .eq('status', 'pending')

  if (error) throw error
  return data
}

export async function getTeamMembers(organizationId: string) {
  const supabase = await getSupabase()
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('organization_id', organizationId)

  if (error) throw error
  return data
}

export async function deleteInvitation(id: string) {
  const supabase = await getSupabase()
  const { error } = await supabase
    .from('invitations')
    .delete()
    .eq('id', id)

  if (error) throw error
}
