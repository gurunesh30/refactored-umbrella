import Link from "next/link"
import { 
  LayoutDashboard, 
  Settings, 
  Search, 
  Bell, 
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
import NewProjectButton from "./NewProjectButton"
import UpgradeButton from "./UpgradeButton"

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

  // Fetch user profile including plan info
  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, plan_type')
    .eq('id', user.id)
    .single()

  const isPro = profile?.plan_type === 'pro'

  return (
    <div className="flex min-h-screen bg-[#f8fafc] dark:bg-slate-950 selection:bg-indigo-100 selection:text-indigo-700">
      {/* Vertical Sidebar (Desktop) */}
      <aside className="hidden md:flex w-72 flex-col border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 sticky top-0 h-screen z-20">
        <div className="p-8 pb-10">
          <div className="flex items-center gap-3.5 group cursor-pointer">
            <div className="h-11 w-11 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shrink-0 shadow-xl shadow-indigo-200 dark:shadow-none group-hover:rotate-6 transition-transform duration-300">
              <LayoutDashboard className="h-6 w-6" />
            </div>
            <div>
              <span className="font-black text-2xl tracking-tight bg-gradient-to-br from-slate-900 to-slate-600 dark:from-white dark:to-slate-400 bg-clip-text text-transparent">Umbrella</span>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Enterprise OS</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-1.5 mt-4">
          {[
            { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard, active: true },
            { name: "Settings", href: "/dashboard/settings", icon: Settings, active: false },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
            <Link 
              key={i}
              href={item.href} 
              className={`flex items-center gap-3.5 px-4 py-3 rounded-xl transition-all duration-200 group ${
                item.active 
                  ? "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 font-bold shadow-sm shadow-indigo-100 dark:shadow-none" 
                  : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-100"
              }`}
            >
              <Icon className={`h-5 w-5 transition-colors ${item.active ? "text-indigo-600" : "text-slate-400 group-hover:text-slate-600"}`} />
              <span className="text-[15px]">{item.name}</span>
              {item.active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-600 shadow-sm shadow-indigo-300" />}
            </Link>
          )})}
        </nav>

        <div className="p-6 mt-auto">
          {!isPro && (
            <div className="p-4 rounded-2xl bg-slate-900 dark:bg-indigo-950 text-white relative overflow-hidden group mb-6">
              <div className="relative z-10">
                <p className="text-xs font-bold text-indigo-300 mb-1">PRO PLAN</p>
                <h4 className="font-bold text-sm mb-3">Unlimited Access</h4>
                <UpgradeButton />
              </div>
              <div className="absolute -right-4 -bottom-4 h-24 w-24 bg-white/10 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-500"></div>
            </div>
          )}

          <div className="flex items-center gap-3 mt-8 px-2">
            <Avatar fallback={profile?.full_name?.charAt(0) || "U"} className="h-10 w-10 ring-2 ring-slate-100 dark:ring-slate-800 ring-offset-2" />
            <div className="flex-1 overflow-hidden text-sm">
              <p className="font-bold truncate text-slate-900 dark:text-white leading-tight">{profile?.full_name || "User"}</p>
              <p className="text-xs text-slate-400 truncate">Administrator</p>
            </div>
            <form action="/auth/signout" method="post">
              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-900/10 group" type="submit">
                <LogOut className="h-4 w-4 text-slate-400 group-hover:text-rose-500 transition-colors" />
              </Button>
            </form>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Horizontal Header */}
        <header className="h-20 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl sticky top-0 z-30 flex items-center justify-between px-6 md:px-10">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="md:hidden rounded-xl border border-slate-200">
              <Menu className="h-5 w-5" />
            </Button>
            
            <div className="hidden md:flex items-center gap-2 text-sm text-slate-400">
              <Link href="/dashboard" className="hover:text-slate-900 dark:hover:text-slate-100 transition-colors">Workspace</Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-slate-900 dark:text-slate-100 font-bold">Dashboard</span>
            </div>
          </div>

          <div className="flex items-center gap-3 md:gap-5">
            <div className="relative hidden lg:block group">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
              <input 
                type="search" 
                placeholder="Search resources, users..." 
                className="pl-10 pr-4 h-11 w-72 rounded-xl bg-slate-100/80 dark:bg-slate-800 border-none text-[13px] font-medium focus:ring-2 focus:ring-indigo-500/20 focus:bg-white dark:focus:bg-slate-800 transition-all outline-none"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-[10px] font-bold text-slate-400">⌘</kbd>
                <kbd className="px-1.5 py-0.5 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-[10px] font-bold text-slate-400">K</kbd>
              </div>
            </div>
            
            <div className="h-6 w-px bg-slate-200 dark:bg-slate-800 mx-1"></div>

            <div className="flex items-center gap-1.5">
              <Button variant="ghost" size="icon" className="rounded-xl relative hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                <Bell className="h-5 w-5 text-slate-500 dark:text-slate-400" />
                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white dark:border-slate-900"></span>
              </Button>
              
              <Button variant="ghost" size="icon" className="rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                <Sun className="h-5 w-5 dark:hidden text-slate-500" />
                <Moon className="h-5 w-5 hidden dark:block text-slate-400" />
              </Button>
            </div>

            <NewProjectButton />
          </div>
        </header>

        <main className="flex-1 p-6 md:p-10 lg:p-12 overflow-auto max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  )
}
