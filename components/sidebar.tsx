"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Activity, BarChart3, Heart, Home, Moon, Settings, Droplets, Footprints, User, Goal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useHealthData } from "@/hooks/use-health-data"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

const navItems = [
  { name: "Dashboard", icon: Home, href: "/dashboard" },
  { name: "Activity", icon: Activity, href: "/dashboard/activity" },
  { name: "Sleep", icon: Moon, href: "/dashboard/sleep" },
  { name: "Heart Rate", icon: Heart, href: "/dashboard/heart-rate" },
  { name: "Steps", icon: Footprints, href: "/dashboard/steps" },
  { name: "Water", icon: Droplets, href: "/dashboard/water" },
  { name: "Goals", icon: Goal, href: "/dashboard/goals" },
  { name: "Reports", icon: BarChart3, href: "/dashboard/reports" },
  { name: "Profile", icon: User, href: "/dashboard/profile" },
  { name: "Settings", icon: Settings, href: "/dashboard/settings" },
]

export default function AppSidebar() {
  const { toggleMetric, visibleMetrics } = useHealthData()
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <SidebarProvider defaultOpen>
      <Sidebar className="border-r">
        <SidebarHeader className="flex items-center px-4 py-2">
          <h2 className="text-lg font-semibold">Health Metrics</h2>
          <SidebarTrigger className="ml-auto" />
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.name}>
                <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.name}>
                  <Link href={item.href}>
                    <item.icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>

          <div className="mt-6 px-3">
            <h3 className="mb-2 px-4 text-xs font-semibold uppercase text-muted-foreground">Toggle Metrics</h3>
            <div className="space-y-1">
              <Button
                variant={visibleMetrics.includes("sleep") ? "default" : "outline"}
                className="w-full justify-start"
                onClick={() => toggleMetric("sleep")}
              >
                <Moon className="mr-2 h-4 w-4" />
                Sleep
              </Button>
              <Button
                variant={visibleMetrics.includes("steps") ? "default" : "outline"}
                className="w-full justify-start"
                onClick={() => toggleMetric("steps")}
              >
                <Footprints className="mr-2 h-4 w-4" />
                Steps
              </Button>
              <Button
                variant={visibleMetrics.includes("heartRate") ? "default" : "outline"}
                className="w-full justify-start"
                onClick={() => toggleMetric("heartRate")}
              >
                <Heart className="mr-2 h-4 w-4" />
                Heart Rate
              </Button>
              <Button
                variant={visibleMetrics.includes("water") ? "default" : "outline"}
                className="w-full justify-start"
                onClick={() => toggleMetric("water")}
              >
                <Droplets className="mr-2 h-4 w-4" />
                Water
              </Button>
              <Button
                variant={visibleMetrics.includes("mood") ? "default" : "outline"}
                className="w-full justify-start"
                onClick={() => toggleMetric("mood")}
              >
                <Activity className="mr-2 h-4 w-4" />
                Mood
              </Button>
            </div>
          </div>
        </SidebarContent>
        <SidebarFooter className="border-t p-4">
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-primary"></div>
            <div className="ml-2">
              <p className="text-sm font-medium">John Doe</p>
              <p className="text-xs text-muted-foreground">john.doe@example.com</p>
            </div>
          </div>
        </SidebarFooter>
      </Sidebar>
    </SidebarProvider>
  )
}
