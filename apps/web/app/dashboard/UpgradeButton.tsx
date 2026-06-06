"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { createStripeSession } from "./billing/actions"

export default function UpgradeButton() {
  const [loading, setLoading] = useState(false)

  const handleUpgrade = async () => {
    setLoading(true)
    try {
      const result = await createStripeSession()
      if (result.url) {
        window.location.href = result.url
      }
    } catch (error: any) {
      alert(error.message || "Failed to start checkout. Please check your Stripe configuration.")
      setLoading(false)
    }
  }

  return (
    <Button 
      onClick={handleUpgrade}
      disabled={loading}
      size="sm" 
      className="w-full h-8 bg-indigo-500 hover:bg-indigo-400 text-xs font-bold rounded-lg border-none shadow-lg shadow-indigo-900/20"
    >
      {loading ? "Redirecting..." : "Upgrade Now"}
    </Button>
  )
}
