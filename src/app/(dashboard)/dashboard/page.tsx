"use client"

import { PageHeader } from "@/components/page-header"
import { useRouter, useSearchParams } from "next/navigation"
import { useSessionStore } from "@/state/session"
import { Button } from "@/components/ui/button"
import { Settings, Users, Activity } from "lucide-react"

// This is sample data from app-sidebar
const data = {
  teams: [
    {
      id: "team1",
      name: "Acme Inc",
      plan: "Enterprise",
      members: [
        { userId: "user1", role: "sales" },
        { userId: "user2", role: "user" }
      ]
    },
    {
      id: "team2",
      name: "Acme Corp.",
      plan: "Startup",
      members: [
        { userId: "user3", role: "sales" },
        { userId: "user4", role: "user" }
      ]
    },
    {
      id: "team3",
      name: "Evil Corp.",
      plan: "Free",
      members: [
        { userId: "user5", role: "sales" }
      ]
    },
    {
      id: "team4",
      name: "Sophia Corp.",
      plan: "Free",
      members: [
        { userId: "user6", role: "sales" }
      ]
    },
  ]
}

export default function Page() {
  const { session } = useSessionStore()
  const searchParams = useSearchParams()
  const teamId = searchParams.get('team')
  const currentTeam = teamId ? data.teams.find(t => t.id === teamId) : null
  
  return (
    <>
      <PageHeader
        items={[
          {
            href: "/dashboard",
            label: currentTeam ? `${currentTeam.name} Dashboard` : "Teams Overview"
          }
        ]}
      />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        {currentTeam ? (
          <>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">{currentTeam.name} Dashboard</h2>
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.push('/dashboard')}
              >
                Back to Overview
              </Button>
            </div>
            <div className="grid auto-rows-min gap-4 md:grid-cols-3">
              <div className="aspect-video rounded-xl bg-muted/50 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <h3 className="text-xl font-semibold">{currentTeam.name}</h3>
                  <span className="text-xs px-2 py-1 rounded-full bg-muted/70 font-medium">
                    {currentTeam.plan}
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>Total Members:</span>
                    <span>{currentTeam.members.length}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>Sales Members:</span>
                    <span>{currentTeam.members.filter(m => m.role === 'sales').length}</span>
                  </div>
                </div>
              </div>
              <div className="aspect-video rounded-xl bg-muted/50 p-6">
                <h3 className="text-xl font-semibold mb-4">Team Members</h3>
                <div className="grid gap-2">
                  {currentTeam.members.map(member => (
                    <div key={member.userId} className="flex items-center justify-between text-sm py-1.5 px-3 rounded-md hover:bg-muted/70 transition-colors">
                      <span>{member.userId}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${member.role === 'sales' ? 'bg-primary/10 text-primary' : 'bg-muted'} font-medium`}>
                        {member.role}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="aspect-video rounded-xl bg-muted/50 p-6">
                <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
                <div className="grid gap-2">
                  <Button variant="ghost" size="sm" className="justify-start gap-2 hover:bg-muted/70">
                    <Settings className="size-4" />
                    Team Settings
                  </Button>
                  <Button variant="ghost" size="sm" className="justify-start gap-2 hover:bg-muted/70">
                    <Users className="size-4" />
                    Manage Members
                  </Button>
                  <Button variant="ghost" size="sm" className="justify-start gap-2 hover:bg-muted/70">
                    <Activity className="size-4" />
                    View Activity
                  </Button>
                </div>
              </div>
            </div>
            <div className="min-h-[40vh] flex-1 rounded-xl bg-muted/50 md:min-h-min p-8">
              <div className="flex items-center gap-4 mb-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Welcome to {currentTeam.name}</h2>
                  <p className="text-muted-foreground max-w-lg">
                    Manage your team, view member activities, and configure team settings from this dashboard.
                  </p>
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-lg bg-muted/70 p-4">
                  <h3 className="text-sm font-medium mb-2">Quick Tips</h3>
                  <ul className="text-sm text-muted-foreground space-y-1.5">
                    <li>• Use the Quick Actions panel to access common tasks</li>
                    <li>• View and manage team members from the Members panel</li>
                    <li>• Monitor team statistics and performance metrics</li>
                  </ul>
                </div>
                <div className="rounded-lg bg-muted/70 p-4">
                  <h3 className="text-sm font-medium mb-2">Team Status</h3>
                  <div className="text-sm text-muted-foreground space-y-1.5">
                    <div className="flex justify-between">
                      <span>Current Plan:</span>
                      <span className="font-medium">{currentTeam.plan}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Member Roles:</span>
                      <span className="font-medium">{currentTeam.members.filter(m => m.role === 'sales').length} Sales, {currentTeam.members.filter(m => m.role === 'user').length} Users</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="grid gap-4 md:grid-cols-2">
              {data.teams.map(team => (
                <div 
                  key={team.id} 
                  className="rounded-xl bg-muted/50 p-6 group relative hover:bg-muted/60 transition-colors"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">{team.name}</h3>
                      <span className="text-xs px-2 py-1 rounded-full bg-muted/70 font-medium">
                        {team.plan}
                      </span>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={(e) => {
                        e.preventDefault();
                        router.push(`/dashboard?team=${team.id}`);
                      }}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      View Dashboard
                    </Button>
                  </div>
                  
                  <div className="grid gap-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="rounded-lg bg-muted/70 p-3">
                        <div className="text-xs text-muted-foreground mb-1">Total Members</div>
                        <div className="text-xl font-semibold">{team.members.length}</div>
                      </div>
                      <div className="rounded-lg bg-muted/70 p-3">
                        <div className="text-xs text-muted-foreground mb-1">Sales Members</div>
                        <div className="text-xl font-semibold">{team.members.filter(m => m.role === 'sales').length}</div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="text-sm font-medium">Team Members</div>
                      <div className="grid gap-1.5">
                        {team.members.map(member => (
                          <div key={member.userId} className="flex items-center justify-between text-sm py-1.5 px-3 rounded-md hover:bg-muted/70 transition-colors">
                            <span>{member.userId}</span>
                            <span className={`text-xs px-2 py-0.5 rounded-full ${member.role === 'sales' ? 'bg-primary/10 text-primary' : 'bg-muted'} font-medium`}>
                              {member.role}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="rounded-xl bg-muted/50 p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Teams Overview</h2>
                  <p className="text-muted-foreground">
                    Select a team to view its dashboard and manage team settings
                  </p>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div>
                    <span className="font-medium">{data.teams.length}</span>
                    <span className="ml-1.5">Teams</span>
                  </div>
                  <span className="text-muted-foreground/30">•</span>
                  <div>
                    <span className="font-medium">{data.teams.reduce((acc, team) => acc + team.members.length, 0)}</span>
                    <span className="ml-1.5">Total Members</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}
