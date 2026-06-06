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
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header Section */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">Dashboard</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2 text-lg">Welcome back, John. Here's a snapshot of your workspace today.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex bg-white dark:bg-slate-900 border rounded-lg p-1 shadow-sm">
            <Button variant="ghost" size="sm" className="h-8 text-xs font-medium px-3 rounded-md">Today</Button>
            <Button variant="ghost" size="sm" className="h-8 text-xs font-medium px-3 rounded-md bg-slate-100 dark:bg-slate-800 shadow-sm">30 Days</Button>
            <Button variant="ghost" size="sm" className="h-8 text-xs font-medium px-3 rounded-md">All Time</Button>
          </div>
          <Button variant="outline" size="icon" className="h-10 w-10 rounded-xl shadow-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
            <RefreshCcw className="h-4 w-4" />
          </Button>
          <Button className="h-10 gap-2 px-5 rounded-xl bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200 dark:shadow-none transition-all">
            <Plus className="h-4 w-4" />
            New Report
          </Button>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[
          { title: "Total Users", value: "12,482", change: "+12.5%", icon: Users, color: "indigo", trend: "up" },
          { title: "Monthly Revenue", value: "$42,389.00", change: "+8.2%", icon: DollarSign, color: "emerald", trend: "up" },
          { title: "Active Sessions", value: "573", change: "-2.4%", icon: Activity, color: "amber", trend: "down" },
          { title: "Success Rate", value: "99.9%", change: "+0.1%", icon: CheckCircle2, color: "rose", trend: "up" },
        ].map((item, i) => (
          <Card key={i} className="group overflow-hidden border-none shadow-md hover:shadow-xl transition-all duration-300 bg-white dark:bg-slate-900 ring-1 ring-slate-200/60 dark:ring-slate-800/60 relative">
            <div className={`absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8 bg-${item.color}-500/5 rounded-full blur-3xl group-hover:bg-${item.color}-500/10 transition-colors`} />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
              <CardTitle className="text-sm font-semibold text-slate-500 uppercase tracking-wider">{item.title}</CardTitle>
              <div className={`p-2.5 bg-${item.color}-50 dark:bg-${item.color}-900/20 rounded-xl group-hover:scale-110 transition-transform duration-300`}>
                <item.icon className={`h-5 w-5 text-${item.color}-600 dark:text-${item.color}-400`} />
              </div>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">{item.value}</div>
              <div className="flex items-center gap-1.5 mt-2">
                <div className={`flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  item.trend === 'up' 
                    ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' 
                    : 'bg-rose-50 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400'
                }`}>
                  {item.trend === 'up' ? <ArrowUpRight className="h-3 w-3 mr-0.5" /> : <ArrowDownRight className="h-3 w-3 mr-0.5" />}
                  {item.change}
                </div>
                <span className="text-xs text-slate-400 font-medium">vs last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        {/* Main Chart Section */}
        <Card className="lg:col-span-8 border-none shadow-md bg-white dark:bg-slate-900 ring-1 ring-slate-200/60 dark:ring-slate-800/60 overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between border-b border-slate-50 dark:border-slate-800 pb-6">
            <div>
              <CardTitle className="text-xl font-bold">Activity Overview</CardTitle>
              <CardDescription className="text-slate-500 mt-1">Real-time engagement and growth metrics.</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="h-7 bg-slate-50 dark:bg-slate-800 border-none font-medium text-slate-600 dark:text-slate-400">
                Live Data
              </Badge>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="h-[350px] w-full bg-slate-50/50 dark:bg-slate-950/50 rounded-2xl border-2 border-dashed border-slate-100 dark:border-slate-800/50 flex flex-col items-center justify-center relative overflow-hidden group">
              <div className="relative z-20 text-center space-y-3">
                <div className="mx-auto w-12 h-12 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                  <Activity className="h-6 w-6 text-indigo-500" />
                </div>
                <div>
                  <p className="text-slate-900 dark:text-slate-100 font-semibold text-lg">Detailed Analytics</p>
                  <p className="text-slate-400 text-sm max-w-[240px]">Interactive charts are being generated based on your latest workspace activity.</p>
                </div>
                <Button variant="outline" size="sm" className="h-9 px-4 rounded-xl border-slate-200 hover:bg-white dark:hover:bg-slate-900">
                  Configure Chart
                </Button>
              </div>
              
              {/* Complex CSS-based decorative background */}
              <div className="absolute inset-0 z-10 pointer-events-none opacity-20">
                <svg className="w-full h-full" viewBox="0 0 800 400" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" style={{ stopColor: 'rgb(79, 70, 229)', stopOpacity: 0.1 }} />
                      <stop offset="50%" style={{ stopColor: 'rgb(79, 70, 229)', stopOpacity: 0.3 }} />
                      <stop offset="100%" style={{ stopColor: 'rgb(79, 70, 229)', stopOpacity: 0.1 }} />
                    </linearGradient>
                  </defs>
                  <path d="M0,300 C150,250 250,350 400,300 C550,250 650,350 800,300 L800,400 L0,400 Z" fill="url(#grad1)" />
                  <path d="M0,250 C200,150 400,350 600,200 C700,120 800,250 800,250 L800,400 L0,400 Z" fill="rgba(79, 70, 229, 0.05)" />
                  {/* Grid lines */}
                  {[0, 50, 100, 150, 200, 250, 300, 350, 400].map(y => (
                    <line key={y} x1="0" y1={y} x2="800" y2={y} stroke="currentColor" strokeWidth="1" className="text-slate-200 dark:text-slate-800" strokeDasharray="4 4" />
                  ))}
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions & Small Stats */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="border-none shadow-md bg-indigo-600 dark:bg-indigo-700 text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 w-40 h-40 -mr-10 -mt-10 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-24 h-24 -ml-12 -mb-12 bg-black/10 rounded-full blur-2xl" />
            <CardHeader className="relative z-10 pb-2">
              <CardTitle className="text-indigo-100 text-sm font-medium uppercase tracking-widest">Workspace Usage</CardTitle>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="text-4xl font-bold mb-4">78%</div>
              <div className="space-y-3">
                <div className="h-2 w-full bg-white/20 rounded-full overflow-hidden">
                  <div className="h-full bg-white rounded-full transition-all duration-1000 ease-out" style={{ width: '78%' }}></div>
                </div>
                <div className="flex justify-between text-xs font-medium text-indigo-100">
                  <span>3.2 GB of 5 GB used</span>
                  <span>Manage Storage</span>
                </div>
              </div>
              <Button className="w-full mt-6 bg-white text-indigo-600 hover:bg-indigo-50 font-bold rounded-xl h-11">
                Upgrade Plan
              </Button>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md bg-white dark:bg-slate-900 ring-1 ring-slate-200/60 dark:ring-slate-800/60">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-bold">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3">
              {[
                { label: "Invite Member", icon: Plus, color: "indigo", bg: "indigo" },
                { label: "Add Transaction", icon: DollarSign, color: "emerald", bg: "emerald" },
                { label: "System Health", icon: Activity, color: "amber", bg: "amber" },
              ].map((action, i) => (
                <Button key={i} variant="outline" className="justify-start h-14 px-4 gap-4 rounded-xl border-slate-100 hover:border-slate-200 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800 transition-all group">
                  <div className={`p-2 bg-${action.bg}-50 dark:bg-${action.bg}-900/20 rounded-lg group-hover:scale-110 transition-transform`}>
                    <action.icon className={`h-4 w-4 text-${action.color}-600 dark:text-${action.color}-400`} />
                  </div>
                  <span className="font-semibold text-slate-700 dark:text-slate-300">{action.label}</span>
                </Button>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recent Activity Table-like list */}
      <Card className="border-none shadow-md bg-white dark:bg-slate-900 ring-1 ring-slate-200/60 dark:ring-slate-800/60 overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between border-b border-slate-50 dark:border-slate-800 pb-6">
          <div>
            <CardTitle className="text-xl font-bold">Recent Transactions</CardTitle>
            <CardDescription className="text-slate-500 mt-1">Review the latest financial movements in your account.</CardDescription>
          </div>
          <Button variant="outline" size="sm" className="rounded-xl font-semibold px-4 h-9">Export CSV</Button>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50 dark:bg-slate-950/50 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  <th className="px-6 py-4">Transaction</th>
                  <th className="px-6 py-4">User</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                {[
                  { name: "Subscription Started", user: "Alex Rivera", time: "2 minutes ago", amount: "+$29.00", status: "success", initial: "A" },
                  { name: "New User Signup", user: "Sarah Chen", time: "1 hour ago", amount: "N/A", status: "default", initial: "S" },
                  { name: "Payment Failed", user: "Mike Johnson", time: "3 hours ago", amount: "-$49.00", status: "destructive", initial: "M" },
                  { name: "Team Member Invited", user: "Emma Wilson", time: "5 hours ago", amount: "N/A", status: "default", initial: "E" },
                  { name: "Plan Upgraded", user: "James Miller", time: "1 day ago", amount: "+$99.00", status: "success", initial: "J" },
                ].map((item, i) => (
                  <tr key={i} className="group hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold ${
                          item.status === 'success' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400' :
                          item.status === 'destructive' ? 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-400' :
                          'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                        }`}>
                          {item.initial}
                        </div>
                        <div>
                          <p className="font-semibold text-sm text-slate-900 dark:text-slate-100">{item.name}</p>
                          <p className="text-xs text-slate-500">Invoice #00{i+1}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400 font-medium">{item.user}</td>
                    <td className="px-6 py-4 text-sm text-slate-500">{item.time}</td>
                    <td className={`px-6 py-4 text-sm font-bold ${
                      item.amount.startsWith('+') ? 'text-emerald-600' : 
                      item.amount.startsWith('-') ? 'text-rose-600' : 'text-slate-900 dark:text-slate-100'
                    }`}>
                      {item.amount}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 border-t border-slate-50 dark:border-slate-800 text-center">
            <Button variant="ghost" className="text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/10 h-10 px-6 rounded-xl">
              View Complete Transaction History
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

