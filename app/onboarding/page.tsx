'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Plus, Loader2 } from 'lucide-react'
import { createOrganization, checkUserHasOrganization } from '@/application/services/organization-service'

export default function OnboardingPage() {
  const [name, setName] = useState('')
  const [slug, setSlug] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  // Auto-generate slug from name
  useEffect(() => {
    setSlug(
      name
        .toLowerCase()
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, '')
    )
  }, [name])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    const formData = new FormData()
    formData.append('name', name)
    formData.append('slug', slug)

    const result = await createOrganization(formData)

    if (result.success) {
      // Hard navigate — bypasses all Next.js caching
      window.location.href = '/dashboard'
    } else {
      setError(result.error || 'Something went wrong. Please try again.')
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50/50 dark:bg-slate-950">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50/50 dark:bg-slate-950 p-4">
      <Card className="w-full max-w-md border-slate-200 dark:border-slate-800 shadow-xl">
        <CardHeader className="space-y-1">
          <div className="h-12 w-12 rounded-xl bg-indigo-600 flex items-center justify-center text-white mb-4">
            <Plus className="h-6 w-6 rotate-45" />
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight">Create your Organization</CardTitle>
          <CardDescription className="text-slate-500 dark:text-slate-400">
            Every great team starts with an Umbrella. Name yours to get started.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4 pt-4">
            {error && (
              <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm border border-red-100 dark:border-red-900/50">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="name">Organization Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="Acme Corp"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">Organization Slug</Label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-slate-400 text-sm">umbrella.com/</span>
                <Input
                  id="slug"
                  name="slug"
                  required
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="pl-28 h-11 bg-slate-50/50 dark:bg-slate-900/50"
                />
              </div>
              <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                This is your unique URL identifier
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4 pt-6">
            <Button 
              type="submit" 
              className="w-full h-11 bg-indigo-600 hover:bg-indigo-700 text-white transition-all shadow-lg shadow-indigo-200 dark:shadow-none"
              disabled={isSubmitting || !name || !slug}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                'Launch Organization'
              )}
            </Button>
            <p className="text-xs text-center text-slate-400">
              You can change these details later in settings.
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
