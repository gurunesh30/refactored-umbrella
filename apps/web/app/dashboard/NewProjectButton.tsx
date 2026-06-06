"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { createNewProject } from "./actions"

export default function NewProjectButton() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ type: "", text: "" })

  const handleClick = async () => {
    setLoading(true)
    setMessage({ type: "", text: "" })

    try {
      const result = await createNewProject()

      if (result.success) {
        setMessage({ type: "success", text: result.message || "Project created!" })
      } else {
        setMessage({ type: "error", text: result.error || "Failed to create project." })
      }
    } catch (error: any) {
      setMessage({ type: "error", text: error.message || "An unexpected error occurred." })
    } finally {
      setLoading(false)
      // Auto-clear message after 4 seconds
      setTimeout(() => setMessage({ type: "", text: "" }), 4000)
    }
  }

  return (
    <div className="relative">
      <Button 
        onClick={handleClick}
        disabled={loading}
        className="hidden sm:flex items-center gap-2 rounded-xl px-5 h-11 bg-slate-900 dark:bg-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 font-bold shadow-lg shadow-slate-200 dark:shadow-none transition-all"
      >
        <Plus className="h-4 w-4" />
        {loading ? "Creating..." : "New Project"}
      </Button>
      {message.text && (
        <div className={`absolute top-14 right-0 z-50 px-4 py-2.5 rounded-xl text-xs font-semibold shadow-lg whitespace-nowrap animate-in fade-in slide-in-from-top-2 ${
          message.type === 'success' 
            ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200' 
            : 'bg-rose-50 text-rose-700 ring-1 ring-rose-200'
        }`}>
          {message.text}
        </div>
      )}
    </div>
  )
}
