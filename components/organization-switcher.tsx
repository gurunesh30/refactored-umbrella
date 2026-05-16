'use client'

import { useState } from 'react'
import { ChevronsUpDown, Check, Plus, Building2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

interface Organization {
  id: string
  name: string
  slug: string
}

export function OrganizationSwitcher({ currentOrg, userOrgs }: { currentOrg: Organization, userOrgs: Organization[] }) {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  return (
    <div className="relative w-full">
      <Button
        variant="ghost"
        className="w-full justify-between hover:bg-slate-100 dark:hover:bg-slate-800 px-2 h-12 border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-all rounded-xl"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-3 overflow-hidden text-left">
          <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white shrink-0 shadow-lg shadow-indigo-200 dark:shadow-none">
            <Building2 className="h-4 w-4" />
          </div>
          <div className="flex flex-col leading-tight min-w-0">
            <span className="font-bold text-sm truncate">{currentOrg.name}</span>
            <span className="text-[10px] text-slate-500 font-medium uppercase tracking-tight">Free Plan</span>
          </div>
        </div>
        <ChevronsUpDown className="h-4 w-4 text-slate-400 shrink-0 ml-2" />
      </Button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)} 
          />
          <div className="absolute top-full left-0 mt-2 w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xl z-50 py-1.5 animate-in fade-in zoom-in-95 duration-150 ring-1 ring-black/5">
            <div className="px-3 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center justify-between">
              Your Organizations
              <span className="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-slate-500">{userOrgs.length}</span>
            </div>
            {userOrgs.map((org) => (
              <button
                key={org.id}
                className="w-full flex items-center justify-between px-3 py-2.5 text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group"
                onClick={() => {
                  // Switch logic could go here if multi-tenancy was enabled via a join table
                  setIsOpen(false)
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="h-6 w-6 rounded bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-900/20 group-hover:text-indigo-600 transition-colors">
                    <Building2 className="h-3 w-3" />
                  </div>
                  <span className="font-medium">{org.name}</span>
                </div>
                {org.id === currentOrg.id && <Check className="h-4 w-4 text-indigo-600" />}
              </button>
            ))}
            <div className="h-px bg-slate-100 dark:bg-slate-800 my-1.5" />
            <button
              className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors font-semibold group"
              onClick={() => {
                router.push('/onboarding')
                setIsOpen(false)
              }}
            >
              <div className="h-6 w-6 rounded bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                <Plus className="h-3 w-3" />
              </div>
              Create New Team
            </button>
          </div>
        </>
      )}
    </div>
  )
}
