"use client"

import * as React from "react"
import { type ComponentType } from "react"
import type { Route } from 'next'
import { toast } from "sonner"

import {
  AudioWaveform,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { useSessionStore } from "@/state/session"

export type NavItem = {
  title: string
  url: Route
  icon?: ComponentType
}

export type NavMainItem = NavItem & {
  isActive?: boolean
  items?: NavItem[]
}

type Data = {
  user: {
    id: string
    name: string
    email: string
    role: 'user' | 'sales'
  }
  teams: {
    id: string
    name: string
    logo: ComponentType
    plan: string
    members: {
      userId: string
      role: 'user' | 'sales'
    }[]
  }[]
  navMain: NavMainItem[]
  projects: NavItem[]
}

// This is sample data.
const data: Data = {
  user: {
    id: "user1",
    name: "shadcn",
    email: "m@example.com",
    role: "sales",
  },
  teams: [
    {
      id: "team1",
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
      members: [
        { userId: "user1", role: "sales" },
        { userId: "user2", role: "user" }
      ]
    },
    {
      id: "team2",
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
      members: [
        { userId: "user3", role: "sales" },
        { userId: "user4", role: "user" }
      ]
    },
    {
      id: "team3",
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
      members: [
        { userId: "user5", role: "sales" }
      ]
    },
    {
      id: "team4",
      name: "Sophia Corp.",
      logo: Command,
      plan: "Free",
      members: [
        { userId: "user6", role: "sales" }
      ]
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: SquareTerminal,
      isActive: true,
      // items: [
      //   {
      //     title: "History",
      //     url: "#",
      //   },
      //   {
      //     title: "Starred",
      //     url: "#",
      //   },
      //   {
      //     title: "Settings",
      //     url: "#",
      //   },
      // ],
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings2,
      items: [
        {
          title: "Profile",
          url: "/settings",
        },
        {
          title: "Security",
          url: "/settings/security",
        },
        {
          title: "Sessions",
          url: "/settings/sessions",
        },
        {
          title: "Change Password",
          url: "/forgot-password",
        },
      ],
    },
  ],
  projects: [
    {
      title: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      title: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      title: "Travel",
      url: "#",
      icon: Map,
    },
  ],
}

// TODO Add a theme switcher
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { session } = useSessionStore()
  const [teams, setTeams] = React.useState(data.teams)
  //const [selectedTeam, setSelectedTeam] = React.useState(data.teams[0])
  
  // Use session user ID or fallback to demo user ID
  const currentUserId = session?.user?.id || data.user.id
  
  // Use session role or fallback to demo user role
  //const userRole = session?.user?.role || data.user.role

  const handleCreateTeam = React.useCallback(async (teamData: { name: string }) => {
    try {
      // In a real app, this would be an API call
      const newTeam: Data['teams'][number] = {
        id: `team${teams.length + 1}`,
        name: teamData.name,
        logo: Command, // Default logo
        plan: "Free", // Default to Free plan
        members: [{ userId: currentUserId, role: 'sales' as const }]
      }

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500))

      setTeams(prev => [...prev, newTeam])
      toast.success(`Created team ${teamData.name}`)
    } catch (error) {
      console.error('Failed to create team:', error)
      toast.error('Failed to create team. Please try again.')
    }
  }, [teams.length, currentUserId])

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher 
          teams={teams} 
          currentUserId={currentUserId}
          onCreateTeam={handleCreateTeam}
        />
      </SidebarHeader>
      <SidebarContent>
        <NavMain 
        items={data.navMain.map(item => ({
          ...item,
          title: item.title === 'Dashboard' ? `Dashboard` : item.title
        }))} 
      />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={{
          name: session?.user?.firstName || data.user.name,
          email: session?.user?.email || data.user.email,
          avatar: session?.user?.avatar || "https://avatar.iran.liara.run/public"
        }} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
