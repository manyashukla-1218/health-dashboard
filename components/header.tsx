"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Bell, Menu, X, Activity } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/theme-toggle"
import SyncButton from "@/components/sync-button"
import { useHealthData } from "@/hooks/use-health-data"
import UserButton from "@/components/auth/user-button"

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { lastSynced, connectedDevice } = useHealthData()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background px-4 md:px-6">
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          <span className="sr-only">Toggle menu</span>
        </Button>
        <Link href="/" className="flex items-center gap-2">
          <Activity className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-bold">VitalSync</h1>
        </Link>
      </div>

      <div className="flex items-center gap-4">
        {connectedDevice && (
          <span className="hidden text-sm text-muted-foreground md:inline-block">
            Connected to: <span className="font-medium">{connectedDevice}</span>
          </span>
        )}
        {lastSynced && (
          <span className="hidden text-sm text-muted-foreground md:inline-block">
            Last synced: {new Date(lastSynced).toLocaleTimeString()}
          </span>
        )}
        <SyncButton />
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Notifications</span>
        </Button>
        <ModeToggle />
        <UserButton />
      </div>
    </header>
  )
}
