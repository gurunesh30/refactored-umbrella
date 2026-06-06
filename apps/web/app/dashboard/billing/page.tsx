import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CreditCard, Download, ArrowRight, CheckCircle2, Zap, ShieldCheck, Globe, Clock } from "lucide-react"

// Placeholder data – in real app this would be fetched from API
const plan = {
  name: "Pro Enterprise",
  price: "$49",
  period: "/month",
  renewal: "Dec 01, 2024",
  status: "Active",
}

const paymentMethod = {
  brand: "Visa",
  last4: "4242",
  exp: "12/26",
  holder: "John Doe",
}

const invoices = [
  { id: "INV-2024-001", date: "Nov 01, 2024", amount: "$49.00", status: "Paid", method: "Visa **** 4242" },
  { id: "INV-2024-002", date: "Oct 01, 2024", amount: "$49.00", status: "Paid", method: "Visa **** 4242" },
  { id: "INV-2024-003", date: "Sep 01, 2024", amount: "$49.00", status: "Paid", method: "Visa **** 4242" },
]

export default function BillingPage() {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-6xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">Billing & Subscription</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2 text-lg">Manage your plan, payment methods, and billing history.</p>
        </div>
        <Button className="h-11 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200 dark:shadow-none transition-all">
          Upgrade Plan
        </Button>
      </div>

      <div className="grid gap-8 lg:grid-cols-12">
        {/* Left Column: Plan and Payment */}
        <div className="lg:col-span-7 space-y-8">
          {/* Current Plan Card */}
          <Card className="border-none shadow-md bg-white dark:bg-slate-900 ring-1 ring-slate-200/60 dark:ring-slate-800/60 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8 bg-indigo-500/5 rounded-full blur-3xl" />
            <CardHeader className="border-b border-slate-50 dark:border-slate-800 pb-6">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl font-bold">Subscription Plan</CardTitle>
                  <CardDescription className="mt-1">You are currently on the Pro Enterprise plan.</CardDescription>
                </div>
                <Badge className="bg-emerald-50 text-emerald-700 hover:bg-emerald-50 dark:bg-emerald-900/30 dark:text-emerald-400 border-none font-bold px-3 py-1 rounded-full text-[10px] uppercase tracking-wider">
                  {plan.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-8">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-slate-400 uppercase tracking-widest">Monthly Price</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-black text-slate-900 dark:text-white">{plan.price}</span>
                    <span className="text-xl font-medium text-slate-400">{plan.period}</span>
                  </div>
                </div>
                <div className="space-y-4 w-full md:w-auto">
                  <div className="flex items-center gap-3 text-sm font-medium text-slate-600 dark:text-slate-300">
                    <Clock className="h-4 w-4 text-indigo-500" />
                    <span>Next renewal on <span className="text-slate-900 dark:text-white font-bold">{plan.renewal}</span></span>
                  </div>
                  <div className="flex gap-3">
                    <Button variant="outline" className="flex-1 rounded-xl h-11 font-bold border-slate-200">Switch Plan</Button>
                    <Button className="flex-1 rounded-xl h-11 font-bold bg-slate-900 dark:bg-slate-100 dark:text-slate-900">Manage</Button>
                  </div>
                </div>
              </div>

              <div className="mt-10 pt-8 border-t border-slate-50 dark:border-slate-800">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-6">Plan Features</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { text: "Unlimited projects", icon: Zap },
                    { text: "Advanced security", icon: ShieldCheck },
                    { text: "Global CDN", icon: Globe },
                    { text: "Priority support", icon: CheckCircle2 },
                  ].map((feature, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="p-1.5 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                        <feature.icon className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
                      </div>
                      <span className="text-sm font-medium text-slate-600 dark:text-slate-300">{feature.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Method Card */}
          <Card className="border-none shadow-md bg-white dark:bg-slate-900 ring-1 ring-slate-200/60 dark:ring-slate-800/60">
            <CardHeader className="border-b border-slate-50 dark:border-slate-800">
              <CardTitle className="text-xl font-bold">Payment Method</CardTitle>
              <CardDescription>Manage your credit cards and billing information.</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row items-center justify-between p-6 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 gap-6">
                <div className="flex items-center gap-5">
                  <div className="h-12 w-16 bg-slate-900 rounded-lg flex items-center justify-center text-white font-black italic shadow-lg">
                    {paymentMethod.brand}
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white">•••• •••• •••• {paymentMethod.last4}</p>
                    <p className="text-xs text-slate-500 font-medium">Expires {paymentMethod.exp} • {paymentMethod.holder}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <Button variant="ghost" className="flex-1 sm:flex-none text-xs font-bold h-9 px-4 rounded-xl">Remove</Button>
                  <Button variant="outline" className="flex-1 sm:flex-none text-xs font-bold h-9 px-4 rounded-xl border-slate-200">Replace Card</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Invoices & Usage */}
        <div className="lg:col-span-5 space-y-8">
          <Card className="border-none shadow-md bg-white dark:bg-slate-900 ring-1 ring-slate-200/60 dark:ring-slate-800/60 overflow-hidden">
            <CardHeader className="border-b border-slate-50 dark:border-slate-800">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-bold">Billing History</CardTitle>
                <Button variant="ghost" size="sm" className="h-8 text-xs font-bold text-indigo-600">View All</Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-slate-50 dark:divide-slate-800">
                {invoices.map((inv) => (
                  <div key={inv.id} className="group flex items-center justify-between p-6 hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                    <div className="space-y-1">
                      <p className="text-sm font-bold text-slate-900 dark:text-white">{inv.id}</p>
                      <p className="text-xs text-slate-500 font-medium">{inv.date} • {inv.method}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm font-black text-slate-900 dark:text-white">{inv.amount}</p>
                        <Badge className="bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-none font-bold text-[9px] h-4 px-1.5 uppercase tracking-tighter">
                          {inv.status}
                        </Badge>
                      </div>
                      <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity">
                        <Download className="h-4 w-4 text-slate-400" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md bg-indigo-600 text-white overflow-hidden relative group">
            <div className="absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
            <CardContent className="pt-8 pb-8 relative z-10 text-center">
              <div className="mx-auto w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-indigo-100" />
              </div>
              <h4 className="text-xl font-black mb-2">Need more power?</h4>
              <p className="text-indigo-100 text-sm mb-6 max-w-[240px] mx-auto font-medium">Get custom limits, dedicated support, and enterprise features.</p>
              <Button className="w-full bg-white text-indigo-600 hover:bg-indigo-50 font-black rounded-xl h-12 text-sm shadow-xl shadow-indigo-900/20 transition-all">
                Contact Sales
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

