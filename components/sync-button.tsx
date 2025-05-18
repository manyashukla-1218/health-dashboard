"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Loader2, RefreshCw } from "lucide-react"
import { useHealthData } from "@/hooks/use-health-data"
import { useToast } from "@/hooks/use-toast"
import { motion } from "framer-motion"

export default function SyncButton() {
  const [isSyncing, setIsSyncing] = useState(false)
  const { syncData } = useHealthData()
  const { toast } = useToast()

  const handleSync = async () => {
    setIsSyncing(true)

    // Simulate syncing process
    await new Promise((resolve) => setTimeout(resolve, 2000))

    try {
      await syncData()
      toast({
        title: "Sync Complete",
        description: "Your health data has been updated successfully.",
      })
    } catch (error) {
      toast({
        title: "Sync Failed",
        description: "There was an error syncing your health data.",
        variant: "destructive",
      })
    } finally {
      setIsSyncing(false)
    }
  }

  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Button onClick={handleSync} disabled={isSyncing} className="gap-2 bg-gradient-to-r from-primary to-primary/80">
        {isSyncing ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Syncing...</span>
          </>
        ) : (
          <>
            <RefreshCw className="h-4 w-4" />
            <span>Sync Wearable</span>
          </>
        )}
      </Button>
    </motion.div>
  )
}
