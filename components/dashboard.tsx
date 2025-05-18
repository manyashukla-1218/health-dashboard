"use client"

import { useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import MetricCard from "@/components/metric-card"
import WeeklySummary from "@/components/weekly-summary"
import ChartOverlay from "@/components/chart-overlay"
import { useHealthData } from "@/hooks/use-health-data"
import { Heart, Moon, Footprints, Droplets, Activity } from "lucide-react"

export default function Dashboard() {
  const { healthData, visibleMetrics, generateMockData, isLoading } = useHealthData()

  useEffect(() => {
    if (!healthData.length) {
      generateMockData()
    }
  }, [healthData, generateMockData])

  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading health data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">Your health metrics and insights at a glance.</p>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="charts">Detailed Charts</TabsTrigger>
          <TabsTrigger value="weekly">Weekly Summary</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {visibleMetrics.includes("sleep") && (
              <MetricCard
                title="Sleep"
                icon={<Moon className="h-5 w-5" />}
                value={`${healthData[healthData.length - 1]?.sleep.toFixed(1)} hrs`}
                description="Last night's sleep duration"
                chart="area"
                data={healthData.map((d) => ({ value: d.sleep, date: d.date }))}
                color="blue"
              />
            )}

            {visibleMetrics.includes("steps") && (
              <MetricCard
                title="Steps"
                icon={<Footprints className="h-5 w-5" />}
                value={`${healthData[healthData.length - 1]?.steps.toLocaleString()}`}
                description="Daily step count"
                chart="bar"
                data={healthData.map((d) => ({ value: d.steps, date: d.date }))}
                color="green"
              />
            )}

            {visibleMetrics.includes("heartRate") && (
              <MetricCard
                title="Heart Rate"
                icon={<Heart className="h-5 w-5" />}
                value={`${healthData[healthData.length - 1]?.heartRate} bpm`}
                description="Average resting heart rate"
                chart="line"
                data={healthData.map((d) => ({ value: d.heartRate, date: d.date }))}
                color="red"
              />
            )}

            {visibleMetrics.includes("water") && (
              <MetricCard
                title="Water"
                icon={<Droplets className="h-5 w-5" />}
                value={`${healthData[healthData.length - 1]?.water} oz`}
                description="Daily water intake"
                chart="bar"
                data={healthData.map((d) => ({ value: d.water, date: d.date }))}
                color="cyan"
              />
            )}

            {visibleMetrics.includes("mood") && (
              <MetricCard
                title="Mood"
                icon={<Activity className="h-5 w-5" />}
                value={getMoodEmoji(healthData[healthData.length - 1]?.mood)}
                description="Today's mood rating"
                chart="line"
                data={healthData.map((d) => ({ value: d.mood, date: d.date }))}
                color="amber"
              />
            )}
          </div>
        </TabsContent>

        <TabsContent value="charts">
          <ChartOverlay />
        </TabsContent>

        <TabsContent value="weekly">
          <WeeklySummary />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function getMoodEmoji(mood: number): string {
  if (mood >= 9) return "😄 Excellent"
  if (mood >= 7) return "🙂 Good"
  if (mood >= 5) return "😐 Neutral"
  if (mood >= 3) return "🙁 Poor"
  return "😞 Bad"
}
