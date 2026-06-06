"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createBrowserClient } from "@supabase/auth-helpers-nextjs"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface SettingsFormProps {
  initialEmail: string
  initialName: string
  initialPhone: string
}

export default function SettingsForm({ initialEmail, initialName, initialPhone }: SettingsFormProps) {
  const router = useRouter()
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
  
  const [name, setName] = useState(initialName)
  const [email, setEmail] = useState(initialEmail)
  const [phone, setPhone] = useState(initialPhone)
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ type: "", text: "" })

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage({ type: "", text: "" })

    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser()
      if (userError || !user) throw new Error("Could not authenticate user.")

      // Update Profile Name
      if (name !== initialName) {
        const { error: profileError } = await supabase
          .from('profiles')
          .update({ full_name: name })
          .eq('id', user.id)
        
        if (profileError) throw profileError
      }

      // Update Auth Details
      const updates: any = {}
      if (email !== initialEmail) updates.email = email
      if (phone !== initialPhone) updates.phone = phone
      if (password) updates.password = password

      if (Object.keys(updates).length > 0) {
        const { error: authError } = await supabase.auth.updateUser(updates)
        if (authError) throw authError
      }

      setMessage({ type: "success", text: "Settings updated successfully." })
      setPassword("") // Clear password field after save
      router.refresh() // Refresh Server Components to show updated data
    } catch (error: any) {
      setMessage({ type: "error", text: error.message || "An error occurred." })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="border-none shadow-md bg-white dark:bg-slate-900 ring-1 ring-slate-200/60 dark:ring-slate-800/60">
      <form onSubmit={handleSave}>
        <CardHeader>
          <CardTitle>Account Details</CardTitle>
          <CardDescription>Update your personal information and credentials.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {message.text && (
            <div className={`p-3 rounded-md text-sm font-medium ${message.type === 'success' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
              {message.text}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input 
              id="name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              placeholder="John Doe" 
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input 
              id="email" 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="john@example.com" 
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input 
              id="phone" 
              type="tel" 
              value={phone} 
              onChange={(e) => setPhone(e.target.value)} 
              placeholder="+1 (555) 000-0000" 
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">New Password</Label>
            <Input 
              id="password" 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="Leave blank to keep current password" 
            />
          </div>
        </CardContent>
        <CardFooter className="bg-slate-50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800 rounded-b-xl px-6 py-4">
          <Button type="submit" disabled={loading} className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700">
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
