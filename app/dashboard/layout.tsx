import Link from "next/link"
import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  CreditCard, 
  Search, 
  Bell, 
  Plus,
  Menu,
  Moon,
  Sun,
  LogOut,
  ChevronRight
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar } from "@/components/ui/avatar"
import { createServerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { OrganizationSwitcher } from "@/components/organization-switcher"

interface Profile {
  id: string
  full_name: string | null
  organization_id: string | null
  role: string
  organizations: {
    id: string
    name: string
    slug: string
  }
}

export const dynamic = 'force-dynamic'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
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

  // Fetch user profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('organization_id, full_name, role')
    .eq('id', user.id)
    .single()

  // No redirect here - middleware handles it. 
  // We just fetch the org details for the UI.
  const { data: organization } = await supabase
    .from('organizations')
    .select('*')
    .eq('id', profile?.organization_id || '')
    .single()

  const currentOrg = organization

  return (
    <div className="flex min-h-screen bg-slate-50/50 dark:bg-slate-950">
      {/* Vertical Sidebar (Desktop) */}
      <aside className="hidden md:flex w-64 flex-col border-r bg-white dark:bg-slate-900 sticky top-0 h-screen">
        <div className="p-4 border-b">
          <OrganizationSwitcher 
            currentOrg={currentOrg} 
            userOrgs={currentOrg ? [currentOrg] : []} 
          />
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1">
          <Link 
            href="/dashboard" 
            className="flex items-center gap-3 px-3 py-2 rounded-lg bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 font-medium"
          >
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </Link>
          <Link 
            href={`/dashboard/team`} 
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            <Users className="h-4 w-4" />
            Team
          </Link>
          <Link 
            href={`/dashboard/billing`} 
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            <CreditCard className="h-4 w-4" />
            Billing
          </Link>
          <Link 
            href={`/dashboard/settings`} 
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            <Settings className="h-4 w-4" />
            Settings
          </Link>
        </nav>

        <div className="p-4 border-t">
          <div className="flex items-center gap-3 px-2 py-2">
            <Avatar fallback={profile.full_name?.charAt(0) || "U"} className="h-9 w-9" />
            <div className="flex-1 overflow-hidden text-sm">
              <p className="font-medium truncate">{profile.full_name || "User"}</p>
              <p className="text-xs text-slate-500 truncate capitalize">{profile.role || "Member"}</p>
            </div>
            <form action="/auth/signout" method="post">
              <Button variant="ghost" size="icon" className="h-8 w-8" type="submit">
                <LogOut className="h-4 w-4 text-slate-400" />
              </Button>
            </form>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Horizontal Header */}
        <header className="h-16 border-b bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-10 flex items-center justify-between px-4 md:px-8">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
            
            <div className="hidden md:flex items-center gap-2 text-sm text-slate-500">
              <Link href="/dashboard" className="hover:text-slate-900 dark:hover:text-slate-100">Home</Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-slate-900 dark:text-slate-100 font-medium">{currentOrg?.name || 'Loading...'}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <div className="relative hidden sm:block">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
              <input 
                type="search" 
                placeholder="Search..." 
                className="pl-9 h-10 w-64 rounded-full bg-slate-100 dark:bg-slate-800 border-none text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
            
            <Button variant="outline" size="sm" className="hidden sm:flex items-center gap-2 rounded-full px-4">
              <Plus className="h-4 w-4" />
              New Project
            </Button>

            <div className="h-8 w-px bg-slate-200 dark:bg-slate-800 mx-1 hidden sm:block"></div>

            <Button variant="ghost" size="icon" className="rounded-full">
              <Bell className="h-5 w-5 text-slate-600 dark:text-slate-400" />
            </Button>
            
            <Button variant="ghost" size="icon" className="rounded-full">
              <Sun className="h-5 w-5 dark:hidden text-slate-600" />
              <Moon className="h-5 w-5 hidden dark:block text-slate-400" />
            </Button>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
