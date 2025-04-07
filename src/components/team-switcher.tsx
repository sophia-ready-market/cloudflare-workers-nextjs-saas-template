"use client"

import * as React from "react"
import { ChevronsUpDown, GalleryVerticalEnd } from "lucide-react"
import { TeamCreateDialog } from "@/components/team-create-dialog"
import { useRouter, useSearchParams } from "next/navigation"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

export function TeamSwitcher({
  teams,
  currentUserId,
  onCreateTeam,
}: {
  teams: {
    id: string
    name: string
    logo: React.ElementType
    plan: string
    members: {
      userId: string
      role: 'user' | 'sales'
    }[]
  }[]
  currentUserId: string
  onCreateTeam: (teamData: { name: string }) => void
}) {
  const { isMobile } = useSidebar()
  const router = useRouter()
  const searchParams = useSearchParams()
  
  // Find active team from URL parameter or default to first team
  const activeTeamId = searchParams.get('team')
  const [activeTeam, setActiveTeam] = React.useState(
    //teams.find(t => t.id === activeTeamId) || teams[0]
    activeTeamId ? teams.find(t => t.id === activeTeamId) : null
  )
  const isDashboard = !activeTeamId

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                {isDashboard ? (
                  <GalleryVerticalEnd className="size-4" />
                ) : (
                  <activeTeam.logo className="size-4" />
                )}
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {isDashboard ? "Dashboard" : activeTeam.name}
                </span>
                {!isDashboard && (
                  <span className="truncate text-xs">
                    {activeTeam.plan}
                    {activeTeam.members.find(m => m.userId === currentUserId)?.role === 'sales' && ' • Sales'}
                  </span>
                )}
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >

            <DropdownMenuItem
              onClick={() => {
                router.push(`/dashboard`);
              }}
              className="gap-2 p-2"
            >
              <div className="flex size-6 items-center justify-center rounded-sm border">
                <GalleryVerticalEnd className="size-4 shrink-0" />
              </div>
              <div className="flex-1">
                <span>Dashboard</span>
              </div>
            </DropdownMenuItem>

            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Teams
            </DropdownMenuLabel>
            {teams.map((team, index) => {
              const currentUserRole = team.members.find(m => m.userId === currentUserId)?.role;
              //const isSales = currentUserRole === 'sales';
              
              return (
                <DropdownMenuItem
                  key={team.id}
                  onClick={() => {
                    setActiveTeam(team);
                    router.push(`/dashboard?team=${team.id}`);
                  }}
                  className="gap-2 p-2"
                >
                  <div className="flex size-6 items-center justify-center rounded-sm border">
                    <team.logo className="size-4 shrink-0" />
                  </div>
                  <div className="flex-1">
                    <span>{team.name}</span>
                    {currentUserRole === 'sales' && (
                      <span className="ml-2 text-xs text-muted-foreground">(Sales)</span>
                    )}
                  </div>
                  <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
                </DropdownMenuItem>
              );
            })}
            <DropdownMenuSeparator />
            {teams.some(team => team.members.find(m => m.userId === currentUserId)?.role === 'sales') && (
              <TeamCreateDialog onCreateTeam={onCreateTeam} />
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
