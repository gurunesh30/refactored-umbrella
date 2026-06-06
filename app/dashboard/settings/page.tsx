"use client"

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Avatar } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { 
  User, 
  Lock, 
  Bell, 
  Shield, 
  Eye, 
  EyeOff, 
  Smartphone, 
  Mail, 
  Globe,
  Camera,
  Trash2,
  ChevronRight,
  Sparkles
} from "lucide-react"
import { useState } from "react"

export default function SettingsPage() {
  const [emailNotif, setEmailNotif] = useState(true)
  const [pushNotif, setPushNotif] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-5xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">Settings</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2 text-lg">Manage your account preferences and security settings.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-xl h-11 font-bold border-slate-200">Discard</Button>
          <Button className="h-11 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200 dark:shadow-none transition-all">
            Save Changes
          </Button>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-12">
        {/* Navigation / Sidebar */}
        <aside className="lg:col-span-3 space-y-2">
          {[
            { name: "General", icon: User, active: true },
            { name: "Security", icon: Lock, active: false },
            { name: "Notifications", icon: Bell, active: false },
            { name: "Privacy", icon: Shield, active: false },
          ].map((item, i) => (
            <button 
              key={i}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                item.active 
                  ? "bg-white dark:bg-slate-900 shadow-sm ring-1 ring-slate-200/60 dark:ring-slate-800/60 text-indigo-600 dark:text-indigo-400" 
                  : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
              }`}
            >
              <item.icon className="h-4 w-4" />
              {item.name}
              {item.active && <ChevronRight className="ml-auto h-3 w-3" />}
            </button>
          ))}
        </aside>

        {/* Content Area */}
        <div className="lg:col-span-9 space-y-8">
          {/* Profile Section */}
          <Card className="border-none shadow-md bg-white dark:bg-slate-900 ring-1 ring-slate-200/60 dark:ring-slate-800/60 overflow-hidden">
            <CardHeader className="border-b border-slate-50 dark:border-slate-800 pb-6">
              <CardTitle className="text-xl font-bold">Public Profile</CardTitle>
              <CardDescription>This information will be visible to other members of your workspace.</CardDescription>
            </CardHeader>
            <CardContent className="pt-8 space-y-8">
              <div className="flex flex-col sm:flex-row items-center gap-8">
                <div className="relative group">
                  <Avatar className="h-24 w-24 ring-4 ring-slate-50 dark:ring-slate-800 ring-offset-4 ring-offset-white dark:ring-offset-slate-900 shadow-xl">
                    <div className="h-full w-full flex items-center justify-center bg-indigo-600 text-white text-2xl font-black">JD</div>
                  </Avatar>
                  <button className="absolute bottom-0 right-0 p-2 bg-white dark:bg-slate-800 rounded-full shadow-lg border border-slate-100 dark:border-slate-700 hover:scale-110 transition-transform">
                    <Camera className="h-4 w-4 text-slate-600 dark:text-slate-400" />
                  </button>
                </div>
                <div className="space-y-2 text-center sm:text-left">
                  <h4 className="font-bold text-lg text-slate-900 dark:text-white">Profile Picture</h4>
                  <p className="text-sm text-slate-500 max-w-xs">PNG, JPG or GIF. Max size 2MB. Recommended 400x400.</p>
                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm" className="h-8 text-xs font-bold rounded-lg border-slate-200">Upload New</Button>
                    <Button variant="ghost" size="sm" className="h-8 text-xs font-bold rounded-lg text-rose-500 hover:text-rose-600 hover:bg-rose-50">Remove</Button>
                  </div>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="first_name" className="text-xs font-black uppercase tracking-widest text-slate-400">First Name</Label>
                  <Input id="first_name" defaultValue="John" className="h-11 rounded-xl border-slate-100 bg-slate-50/50 dark:bg-slate-950/50 focus:bg-white dark:focus:bg-slate-900 transition-all" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last_name" className="text-xs font-black uppercase tracking-widest text-slate-400">Last Name</Label>
                  <Input id="last_name" defaultValue="Doe" className="h-11 rounded-xl border-slate-100 bg-slate-50/50 dark:bg-slate-950/50 focus:bg-white dark:focus:bg-slate-900 transition-all" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="email" className="text-xs font-black uppercase tracking-widest text-slate-400">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input id="email" type="email" defaultValue="john@example.com" className="pl-10 h-11 rounded-xl border-slate-100 bg-slate-50/50 dark:bg-slate-950/50 focus:bg-white dark:focus:bg-slate-900 transition-all" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security Section */}
          <Card className="border-none shadow-md bg-white dark:bg-slate-900 ring-1 ring-slate-200/60 dark:ring-slate-800/60 overflow-hidden">
            <CardHeader className="border-b border-slate-50 dark:border-slate-800 pb-6">
              <CardTitle className="text-xl font-bold">Security</CardTitle>
              <CardDescription>Update your password and enable two-factor authentication.</CardDescription>
            </CardHeader>
            <CardContent className="pt-8 space-y-8">
              <div className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2 md:col-span-2">
                    <Label className="text-xs font-black uppercase tracking-widest text-slate-400">Current Password</Label>
                    <div className="relative">
                      <Input type={showPassword ? "text" : "password"} className="h-11 rounded-xl border-slate-100 bg-slate-50/50 dark:bg-slate-950/50 focus:bg-white dark:focus:bg-slate-900 transition-all" />
                      <button 
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase tracking-widest text-slate-400">New Password</Label>
                    <Input type="password" className="h-11 rounded-xl border-slate-100 bg-slate-50/50 dark:bg-slate-950/50 focus:bg-white dark:focus:bg-slate-900 transition-all" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase tracking-widest text-slate-400">Confirm New Password</Label>
                    <Input type="password" className="h-11 rounded-xl border-slate-100 bg-slate-50/50 dark:bg-slate-950/50 focus:bg-white dark:focus:bg-slate-900 transition-all" />
                  </div>
                </div>
                <Button variant="outline" className="rounded-xl h-10 font-bold border-slate-200">Update Password</Button>
              </div>

              <div className="pt-8 border-t border-slate-50 dark:border-slate-800">
                <div className="flex flex-col sm:flex-row items-center justify-between p-6 rounded-2xl border border-slate-100 dark:border-slate-800 bg-indigo-50/30 dark:bg-indigo-900/10 gap-6">
                  <div className="flex items-center gap-5">
                    <div className="h-12 w-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-200 dark:shadow-none">
                      <Smartphone className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white">Two-factor Authentication</p>
                      <p className="text-xs text-slate-500 font-medium max-w-[240px]">Add an extra layer of security to your account.</p>
                    </div>
                  </div>
                  <Button className="w-full sm:w-auto h-10 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-700 font-bold">Enable 2FA</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Preferences Section */}
          <Card className="border-none shadow-md bg-white dark:bg-slate-900 ring-1 ring-slate-200/60 dark:ring-slate-800/60">
            <CardHeader className="border-b border-slate-50 dark:border-slate-800 pb-6">
              <CardTitle className="text-xl font-bold">Communication</CardTitle>
              <CardDescription>Decide how you'd like to stay informed about your projects.</CardDescription>
            </CardHeader>
            <CardContent className="pt-8 space-y-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                  <div className="space-y-1">
                    <p className="font-bold text-slate-900 dark:text-white">Email Notifications</p>
                    <p className="text-xs text-slate-500 font-medium">Get updates on workspace activity via email.</p>
                  </div>
                  <Switch checked={emailNotif} onCheckedChange={setEmailNotif} />
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                  <div className="space-y-1">
                    <p className="font-bold text-slate-900 dark:text-white">Push Notifications</p>
                    <p className="text-xs text-slate-500 font-medium">Real-time alerts directly in your browser.</p>
                  </div>
                  <Switch checked={pushNotif} onCheckedChange={setPushNotif} />
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                  <div className="space-y-1">
                    <p className="font-bold text-slate-900 dark:text-white">Marketing Communications</p>
                    <p className="text-xs text-slate-500 font-medium">Stay updated on new features and pro tips.</p>
                  </div>
                  <Switch defaultChecked={false} />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <div className="pt-8">
            <div className="p-8 rounded-3xl bg-rose-50/50 dark:bg-rose-900/10 border-2 border-dashed border-rose-100 dark:border-rose-900/30">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="text-center sm:text-left">
                  <h4 className="font-black text-rose-600 dark:text-rose-400 text-lg mb-1">Danger Zone</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Permanently delete your account and all associated data.</p>
                </div>
                <Button variant="destructive" className="h-11 px-6 rounded-xl font-bold bg-rose-500 hover:bg-rose-600 shadow-lg shadow-rose-200 dark:shadow-none">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Account
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

