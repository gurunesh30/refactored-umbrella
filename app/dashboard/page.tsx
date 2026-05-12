import { 
  ArrowUpRight, 
  ArrowDownRight, 
  Users, 
  DollarSign, 
  Activity, 
  CheckCircle2, 
  RefreshCcw,
  Calendar,
  MoreVertical,
  Plus,
  ArrowRight,
  Settings
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function DashboardPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header Section */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Overview</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Welcome back, John. Here's what's happening today.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-9 gap-2">
            <Calendar className="h-4 w-4" />
            Last 30 Days
          </Button>
          <Button variant="outline" size="icon" className="h-9 w-9">
            <RefreshCcw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="overflow-hidden border-none shadow-sm bg-white dark:bg-slate-900 ring-1 ring-slate-200 dark:ring-slate-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Total Users</CardTitle>
            <div className="p-2 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
              <Users className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,482</div>
            <div className="flex items-center gap-1 mt-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
              <ArrowUpRight className="h-3 w-3" />
              <span>+12.5% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-none shadow-sm bg-white dark:bg-slate-900 ring-1 ring-slate-200 dark:ring-slate-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Monthly Revenue</CardTitle>
            <div className="p-2 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
              <DollarSign className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$42,389.00</div>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="success">Active</Badge>
              <span className="text-xs text-slate-400 font-normal">MRR Stable</span>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-none shadow-sm bg-white dark:bg-slate-900 ring-1 ring-slate-200 dark:ring-slate-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Active Sessions</CardTitle>
            <div className="p-2 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
              <Activity className="h-4 w-4 text-amber-600 dark:text-amber-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">573</div>
            <div className="mt-3 h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-amber-500 rounded-full" style={{ width: '65%' }}></div>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-none shadow-sm bg-white dark:bg-slate-900 ring-1 ring-slate-200 dark:ring-slate-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">System Status</CardTitle>
            <div className="p-2 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Healthy</div>
            <p className="text-xs text-slate-500 mt-1">All systems operational</p>
          </CardContent>
        </Card>
      </div>

      {/* Primary Visualization */}
      <Card className="border-none shadow-sm bg-white dark:bg-slate-900 ring-1 ring-slate-200 dark:ring-slate-800">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Activity Overview</CardTitle>
            <CardDescription>Revenue and user growth over the last 30 days.</CardDescription>
          </div>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full bg-slate-50 dark:bg-slate-950 rounded-xl border border-dashed border-slate-200 dark:border-slate-800 flex items-center justify-center relative overflow-hidden group">
            <div className="text-slate-400 text-sm flex flex-col items-center gap-2">
              <Activity className="h-8 w-8 opacity-20" />
              <span>Chart Visualization Placeholder</span>
            </div>
            
            {/* Simple CSS-based trend line placeholder */}
            <svg className="absolute bottom-0 left-0 w-full h-32 opacity-10 group-hover:opacity-20 transition-opacity" preserveAspectRatio="none" viewBox="0 0 100 100">
              <path d="M0,80 Q25,20 50,70 T100,30 L100,100 L0,100 Z" fill="currentColor" className="text-indigo-600" />
            </svg>
          </div>
        </CardContent>
      </Card>

      {/* Secondary Information Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4 border-none shadow-sm bg-white dark:bg-slate-900 ring-1 ring-slate-200 dark:ring-slate-800">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest events across your workspace.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[
                { name: "Subscription Started", user: "Alex Rivera", time: "2 minutes ago", amount: "+$29.00", status: "success" },
                { name: "New User Signup", user: "Sarah Chen", time: "1 hour ago", amount: "N/A", status: "default" },
                { name: "Payment Failed", user: "Mike Johnson", time: "3 hours ago", amount: "-$49.00", status: "destructive" },
                { name: "Team Member Invited", user: "Emma Wilson", time: "5 hours ago", amount: "N/A", status: "default" },
                { name: "Plan Upgraded", user: "James Miller", time: "1 day ago", amount: "+$99.00", status: "success" },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-4">
                    <div className={`h-2 w-2 rounded-full ${
                      item.status === 'success' ? 'bg-emerald-500' : 
                      item.status === 'destructive' ? 'bg-red-500' : 'bg-slate-300 dark:bg-slate-700'
                    }`} />
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-xs text-slate-500">{item.user} • {item.time}</p>
                    </div>
                  </div>
                  <div className="font-semibold text-slate-900 dark:text-slate-100">{item.amount}</div>
                </div>
              ))}
            </div>
            <Button variant="ghost" className="w-full mt-6 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 hover:bg-indigo-50 dark:hover:bg-indigo-900/10">
              View All Activity
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3 border-none shadow-sm bg-white dark:bg-slate-900 ring-1 ring-slate-200 dark:ring-slate-800">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Shortcuts to common tasks.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3">
            <Button variant="outline" className="justify-start h-12 gap-3 hover:border-indigo-200 hover:bg-indigo-50/50 dark:hover:bg-indigo-900/10 transition-all group">
              <div className="p-1.5 bg-indigo-50 dark:bg-indigo-900/20 rounded-md group-hover:bg-indigo-100">
                <Plus className="h-4 w-4 text-indigo-600" />
              </div>
              Invite Team Member
            </Button>
            <Button variant="outline" className="justify-start h-12 gap-3 hover:border-emerald-200 hover:bg-emerald-50/50 dark:hover:bg-emerald-900/10 transition-all group">
              <div className="p-1.5 bg-emerald-50 dark:bg-emerald-900/20 rounded-md group-hover:bg-emerald-100">
                <DollarSign className="h-4 w-4 text-emerald-600" />
              </div>
              Update Billing Plan
            </Button>
            <Button variant="outline" className="justify-start h-12 gap-3 hover:border-slate-200 hover:bg-slate-50 transition-all group">
              <div className="p-1.5 bg-slate-100 dark:bg-slate-800 rounded-md group-hover:bg-slate-200">
                <Settings className="h-4 w-4 text-slate-600" />
              </div>
              System Settings
            </Button>

            <div className="mt-4 p-4 rounded-xl bg-slate-900 dark:bg-indigo-950 text-white relative overflow-hidden">
              <div className="relative z-10">
                <p className="text-xs font-medium text-slate-400 mb-1">Documentation</p>
                <h4 className="font-semibold mb-2">Need help?</h4>
                <p className="text-xs text-slate-300 mb-3">Check out our guides on how to use the dashboard features.</p>
                <Button size="sm" variant="secondary" className="h-8 text-xs font-bold">
                  Read Guides
                </Button>
              </div>
              <div className="absolute -right-4 -bottom-4 h-24 w-24 bg-white/5 rounded-full blur-xl"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
