'use client'

import { useState } from 'react'
import { Plus, Mail, User, X, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar } from '@/components/ui/avatar'
import { inviteMember, deleteInvitation } from '@/application/services/organization-service'

interface Member {
  id: string
  full_name: string | null
  role: string
}

interface Invitation {
  id: string
  email: string
  role: string
  status: string
}

export function TeamManagement({ 
  organizationId, 
  initialMembers, 
  initialInvitations 
}: { 
  organizationId: string
  initialMembers: Member[]
  initialInvitations: Invitation[]
}) {
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false)
  const [inviteEmail, setInviteEmail] = useState('')
  const [inviteRole, setInviteRole] = useState('member')
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const [members] = useState(initialMembers)
  const [invitations, setInvitations] = useState(initialInvitations)

  async function handleInvite(e: React.FormEvent) {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      await inviteMember(inviteEmail, inviteRole, organizationId)
      // Update local state for immediate feedback
      setInvitations([...invitations, { 
        id: Math.random().toString(), 
        email: inviteEmail, 
        role: inviteRole, 
        status: 'pending' 
      }])
      setInviteEmail('')
      setIsInviteModalOpen(false)
    } catch (err) {
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleUninvite(id: string) {
    try {
      await deleteInvitation(id)
      setInvitations(invitations.filter(inv => inv.id !== id))
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Button 
          onClick={() => setIsInviteModalOpen(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-200 dark:shadow-none"
        >
          <Plus className="mr-2 h-4 w-4" />
          Invite Member
        </Button>
      </div>

      {/* Team Members List */}
      <Card className="border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <CardHeader className="bg-slate-50/50 dark:bg-slate-900/50 border-b">
          <CardTitle className="text-lg font-bold flex items-center gap-2">
            <User className="h-5 w-5 text-indigo-600" />
            Active Team Members
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b text-[10px] text-slate-400 uppercase tracking-widest font-black bg-slate-50/30 dark:bg-slate-900/30">
                  <th className="px-6 py-4">User</th>
                  <th className="px-6 py-4">Role</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {members.map((member) => (
                  <tr key={member.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar fallback={member.full_name?.charAt(0) || 'U'} className="h-10 w-10 border-2 border-white dark:border-slate-800 shadow-sm" />
                        <div className="flex flex-col">
                          <span className="font-bold text-sm text-slate-900 dark:text-slate-100">{member.full_name || 'Unnamed User'}</span>
                          <span className="text-xs text-slate-500 font-medium">Joined recently</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={member.role === 'owner' ? 'default' : 'outline'} className="capitalize font-semibold">
                        {member.role}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button variant="ghost" size="sm" disabled={member.role === 'owner'} className="hover:bg-indigo-50 dark:hover:bg-indigo-900/20 text-indigo-600 font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                        Manage
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Pending Invitations Table */}
      <Card className="border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <CardHeader className="bg-slate-50/50 dark:bg-slate-900/50 border-b">
          <CardTitle className="text-lg font-bold flex items-center gap-2">
            <Mail className="h-5 w-5 text-amber-500" />
            Pending Invitations
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {invitations.length === 0 ? (
            <div className="p-12 text-center text-slate-400 font-medium">
              No pending invitations. Start growing your team!
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b text-[10px] text-slate-400 uppercase tracking-widest font-black bg-slate-50/30 dark:bg-slate-900/30">
                    <th className="px-6 py-4">Email</th>
                    <th className="px-6 py-4">Role</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {invitations.map((inv) => (
                    <tr key={inv.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors group">
                      <td className="px-6 py-4 text-sm font-bold text-slate-700 dark:text-slate-300">{inv.email}</td>
                      <td className="px-6 py-4">
                        <Badge variant="secondary" className="capitalize font-semibold">{inv.role}</Badge>
                      </td>
                      <td className="px-6 py-4">
                        <span className="flex items-center gap-1.5 text-[10px] font-black text-amber-600 bg-amber-50 dark:bg-amber-900/20 px-2.5 py-1 rounded-full w-fit uppercase tracking-wider border border-amber-100 dark:border-amber-900/50">
                          <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse shadow-sm shadow-amber-200" />
                          Pending
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 font-bold opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => handleUninvite(inv.id)}
                        >
                          <X className="h-4 w-4 mr-1" />
                          Revoke
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Invite Modal (Simplified Dialog) */}
      {isInviteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-md animate-in fade-in duration-300" onClick={() => setIsInviteModalOpen(false)} />
          <Card className="relative w-full max-w-md z-10 shadow-2xl border-slate-200 dark:border-slate-800 animate-in fade-in zoom-in-95 duration-200">
            <CardHeader className="space-y-1">
              <div className="h-10 w-10 rounded-lg bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center text-indigo-600 mb-2">
                <Plus className="h-5 w-5" />
              </div>
              <CardTitle className="text-xl font-bold">Invite Team Member</CardTitle>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                Collaborate together by inviting your teammates.
              </p>
            </CardHeader>
            <form onSubmit={handleInvite}>
              <CardContent className="space-y-4 pt-2">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-xs font-black uppercase tracking-widest text-slate-400">Email Address</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="teammate@example.com" 
                    required 
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    className="h-11 font-medium border-slate-200 dark:border-slate-800 focus:ring-indigo-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role" className="text-xs font-black uppercase tracking-widest text-slate-400">Role</Label>
                  <select 
                    id="role"
                    className="w-full h-11 px-3 rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-sm font-medium focus:ring-2 focus:ring-indigo-500 outline-none appearance-none cursor-pointer hover:bg-slate-50/50 dark:hover:bg-slate-900/50 transition-colors shadow-sm"
                    value={inviteRole}
                    onChange={(e) => setInviteRole(e.target.value)}
                  >
                    <option value="member">Member (Can view and edit)</option>
                    <option value="admin">Admin (Full access to team)</option>
                  </select>
                </div>
              </CardContent>
              <div className="p-6 flex justify-end gap-3 border-t bg-slate-50/30 dark:bg-slate-900/30 rounded-b-xl">
                <Button variant="ghost" type="button" onClick={() => setIsInviteModalOpen(false)} className="font-bold">Cancel</Button>
                <Button 
                  type="submit" 
                  disabled={isSubmitting || !inviteEmail}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-lg shadow-indigo-100 dark:shadow-none min-w-[120px]"
                >
                  {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Send Invite'}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  )
}
