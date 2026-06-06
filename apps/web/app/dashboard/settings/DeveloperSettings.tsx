"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { linkStripeId } from "./actions"

export default function DeveloperSettings() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ type: "", text: "" })

  const handleLinkStripe = async () => {
    // With user permission check
    const confirmed = window.confirm("Are you sure you want to link the Stripe ID from your environment variables to your account?")
    if (!confirmed) return

    setLoading(true)
    setMessage({ type: "", text: "" })

    try {
      await linkStripeId()
      setMessage({ type: "success", text: "Stripe ID successfully linked from environment variables!" })
      router.refresh()
    } catch (error: any) {
      setMessage({ type: "error", text: error.message || "Failed to link Stripe ID." })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="border-none shadow-md bg-white dark:bg-slate-900 ring-1 ring-slate-200/60 dark:ring-slate-800/60 mt-6">
      <CardHeader>
        <CardTitle>Developer Options</CardTitle>
        <CardDescription>Advanced settings for local development and testing.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {message.text && (
          <div className={`p-3 rounded-md text-sm font-medium ${message.type === 'success' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
            {message.text}
          </div>
        )}
        <p className="text-sm text-slate-500">
          For testing purposes, you can automatically link your account to the Stripe Customer ID defined in your local <code>.env</code> file.
        </p>
      </CardContent>
      <CardFooter className="bg-slate-50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800 rounded-b-xl px-6 py-4">
        <Button 
          type="button" 
          variant="outline" 
          onClick={handleLinkStripe} 
          disabled={loading}
          className="w-full sm:w-auto"
        >
          {loading ? "Linking..." : "Link Developer Stripe ID"}
        </Button>
      </CardFooter>
    </Card>
  )
}
