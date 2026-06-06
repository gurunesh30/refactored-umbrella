import { createServerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import SettingsForm from "./SettingsForm"
import DeveloperSettings from "./DeveloperSettings"

export const dynamic = 'force-dynamic'

export default async function SettingsPage() {
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
    redirect("/login")
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name')
    .eq('id', user.id)
    .single()

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-2xl">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">Settings</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2 text-lg">
          Manage your account settings and preferences.
        </p>
      </div>

      <SettingsForm 
        initialEmail={user.email || ""} 
        initialName={profile?.full_name || ""} 
        initialPhone={user.phone || ""}
      />

      <DeveloperSettings />
    </div>
  )
}
