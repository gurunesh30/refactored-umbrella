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

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-slate-50/50 dark:bg-slate-950">
      {/* Vertical Sidebar (Desktop) */}
      <aside className="hidden md:flex w-64 flex-col border-r bg-white dark:bg-slate-900 sticky top-0 h-screen">
        <div className="p-6">
          <Link href="/dashboard" className="flex items-center gap-2 font-bold text-xl tracking-tight">
            <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
              <Plus className="h-5 w-5 rotate-45" />
            </div>
            <span>Umbrella</span>
          </Link>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          <Link 
            href="/dashboard" 
            className="flex items-center gap-3 px-3 py-2 rounded-lg bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 font-medium"
          >
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </Link>
          <Link 
            href="/dashboard/team" 
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            <Users className="h-4 w-4" />
            Team
          </Link>
          <Link 
            href="/dashboard/billing" 
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            <CreditCard className="h-4 w-4" />
            Billing
          </Link>
          <Link 
            href="/dashboard/settings" 
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            <Settings className="h-4 w-4" />
            Settings
          </Link>
        </nav>

        <div className="p-4 border-t">
          <div className="flex items-center gap-3 px-2 py-2">
            <Avatar fallback="JD" className="h-9 w-9" />
            <div className="flex-1 overflow-hidden text-sm">
              <p className="font-medium truncate">John Doe</p>
              <p className="text-xs text-slate-500 truncate">Pro Plan</p>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <LogOut className="h-4 w-4 text-slate-400" />
            </Button>
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
              <span>Home</span>
              <ChevronRight className="h-3 w-3" />
              <span className="text-slate-900 dark:text-slate-100 font-medium">Dashboard</span>
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
