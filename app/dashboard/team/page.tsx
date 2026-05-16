import { createServerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { TeamManagement } from '@/components/team-management'
import { getTeamMembers, getPendingInvitations } from '@/application/services/organization-service'

export default async function TeamPage() {
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

  if (!user) {
    redirect('/login')
  }

  // Fetch current user profile to get organization_id
  const { data: profile } = await supabase
    .from('profiles')
    .select('organization_id')
    .eq('id', user.id)
    .single()

  if (!profile?.organization_id) {
    redirect('/onboarding')
  }

  const members = await getTeamMembers(profile.organization_id) as any[]
  const invitations = await getPendingInvitations(profile.organization_id) as any[]

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Team Management</h1>
          <p className="text-slate-500 dark:text-slate-400">
            Manage your organization members and pending invitations.
          </p>
        </div>
      </div>
      
      <TeamManagement 
        organizationId={profile.organization_id} 
        initialMembers={members} 
        initialInvitations={invitations} 
      />
    </div>
  )
}
