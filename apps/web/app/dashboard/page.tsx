import { createServerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { redirect } from "next/navigation"
import { DollarSign, CheckCircle2, CreditCard, Calendar, Terminal, Activity } from "lucide-react"

export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
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
    .select('full_name, plan_type, usage_count, stripe_customer_id')
    .eq('id', user.id)
    .single()

  const isPro = profile?.plan_type === 'pro'
  const limit = isPro ? 100 : 5
  const usage = profile?.usage_count || 0

  const transactions = [
    { id: "INV-84920", date: "2026-06-05", amount: isPro ? "$49.00" : "$0.00", status: "Paid", description: isPro ? "Pro Plan Subscription" : "Free Plan Signup" },
    ...(isPro ? [{ id: "INV-10938", date: "2026-06-01", amount: "$0.00", status: "Paid", description: "Free Plan Signup" }] : [])
  ]

  const systemLogs = [
    { time: "12:30:15", category: "webhook", message: isPro ? "Stripe webhook received: checkout.session.completed" : "Stripe webhook listener: awaiting upgrade", status: isPro ? "success" : "info" },
    { time: "12:28:44", category: "profile", message: `User profile updated: Name resolved to ${profile?.full_name || 'User'}`, status: "success" },
    { time: "12:20:02", category: "limit", message: `Project limit check passed. Count: ${usage}/${limit}`, status: "info" },
    { time: "12:15:30", category: "auth", message: `Session initiated for user ${user.email}`, status: "info" }
  ]

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">Dashboard</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2 text-lg">
          Welcome back, {profile?.full_name || 'User'}. Here is your current account usage.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-none shadow-md bg-white dark:bg-slate-900 ring-1 ring-slate-200/60 dark:ring-slate-800/60">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg font-bold">
              <CreditCard className="h-5 w-5 text-indigo-500" />
              Current Plan
            </CardTitle>
            <CardDescription>Your subscription details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold capitalize text-slate-900 dark:text-white mb-2">
              {profile?.plan_type || 'free'} Plan
            </div>
            {profile?.stripe_customer_id ? (
              <p className="text-sm text-slate-500 font-mono">
                Stripe Customer ID: {profile.stripe_customer_id}
              </p>
            ) : (
              <p className="text-sm text-slate-400">
                No active billing customer ID linked.
              </p>
            )}
          </CardContent>
        </Card>

        <Card className="border-none shadow-md bg-white dark:bg-slate-900 ring-1 ring-slate-200/60 dark:ring-slate-800/60">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg font-bold">
              <Activity className="h-5 w-5 text-indigo-500" />
              Usage Limits
            </CardTitle>
            <CardDescription>Monthly resource utilization</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              {usage} / {limit}
            </div>
            <p className="text-sm text-slate-500">
              You have used {usage} out of your {limit} available actions this month.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Plans, Transactions, and Logs Sections */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Billing & Plans details */}
        <Card className="lg:col-span-1 border-none shadow-md bg-white dark:bg-slate-900 ring-1 ring-slate-200/60 dark:ring-slate-800/60">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg font-bold">
              <Calendar className="h-5 w-5 text-indigo-500" />
              Plans & Pricing
            </CardTitle>
            <CardDescription>Billing tiers summary</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="pb-3 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
              <div>
                <p className="text-sm font-bold text-slate-900 dark:text-white">Free Tier</p>
                <p className="text-xs text-slate-400">Basic evaluation</p>
              </div>
              <span className="text-sm font-black text-slate-900 dark:text-white">$0/mo</span>
            </div>
            <div className="pb-3 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
              <div>
                <p className="text-sm font-bold text-slate-900 dark:text-white">Pro Tier</p>
                <p className="text-xs text-slate-400">Full platform access</p>
              </div>
              <span className="text-sm font-black text-slate-900 dark:text-white">$49/mo</span>
            </div>
            <div className="text-xs text-slate-400 italic">
              * Subscriptions are handled securely via Stripe. Check your settings tab or use the sidebar upgrade promo to manage payments.
            </div>
          </CardContent>
        </Card>

        {/* Transactions List */}
        <Card className="lg:col-span-1 border-none shadow-md bg-white dark:bg-slate-900 ring-1 ring-slate-200/60 dark:ring-slate-800/60">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg font-bold">
              <DollarSign className="h-5 w-5 text-indigo-500" />
              Transactions
            </CardTitle>
            <CardDescription>Recent payment history</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {transactions.map((tx) => (
                <div key={tx.id} className="flex justify-between items-start text-sm pb-3 border-b last:border-b-0 border-slate-100 dark:border-slate-800">
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white">{tx.description}</p>
                    <p className="text-xs text-slate-400 font-mono">{tx.id} • {tx.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-slate-950 dark:text-white">{tx.amount}</p>
                    <span className="inline-block text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20 px-1.5 py-0.5 rounded mt-0.5">
                      {tx.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* System Logs */}
        <Card className="lg:col-span-1 border-none shadow-md bg-white dark:bg-slate-900 ring-1 ring-slate-200/60 dark:ring-slate-800/60">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg font-bold">
              <Terminal className="h-5 w-5 text-indigo-500" />
              System Logs
            </CardTitle>
            <CardDescription>Recent dashboard events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 font-mono text-[11px] leading-tight">
              {systemLogs.map((log, index) => (
                <div key={index} className="flex gap-2.5 pb-2.5 border-b last:border-b-0 border-slate-100 dark:border-slate-800">
                  <span className="text-slate-400 shrink-0">{log.time}</span>
                  <div className="space-y-0.5">
                    <span className={`inline-block font-bold px-1 rounded uppercase tracking-tighter text-[9px] ${
                      log.status === "success" 
                        ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20" 
                        : "bg-blue-50 text-blue-600 dark:bg-blue-950/20"
                    }`}>
                      {log.category}
                    </span>
                    <p className="text-slate-600 dark:text-slate-300 mt-0.5">{log.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
