"use client"

import * as React from "react"
import { UserPlus } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface TeamInviteDialogProps {
  //teamId: string
  teamName: string
  onInvite: (email: string, role: 'user' | 'sales') => void
}

export function TeamInviteDialog({ /*teamId,*/ teamName, onInvite }: TeamInviteDialogProps) {
  const [email, setEmail] = React.useState("")
  const [role, setRole] = React.useState<"user" | "sales">("user")
  const [open, setOpen] = React.useState(false)

  const handleInvite = () => {
    if (email) {
      onInvite(email, role)
      setEmail("")
      setRole("user")
      setOpen(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="text-xs text-primary hover:text-primary/80 flex items-center gap-1">
          <UserPlus className="size-3" />
          Invite
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite Team Member</DialogTitle>
          <DialogDescription>
            Invite a new member to join {teamName}. They will receive an email invitation.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email address</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Select value={role} onValueChange={(value: "user" | "sales") => setRole(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="user">User</SelectItem>
                <SelectItem value="sales">Sales</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleInvite}>
            Send Invitation
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
