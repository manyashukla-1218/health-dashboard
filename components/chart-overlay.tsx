"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { AreaChart, BarChart, LineChart } from "@/components/ui/chart"
import { useHealthData } from "@/hooks/use-health-data"
import { Heart, Moon, Footprints, Droplets, Activity } from "lucide-react"
import { motion } from "framer-motion"

export default function ChartOverlay() {
  const { healthData } = useHealthData()
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>(["sleep"])
  const [chartType, setChartType] = useState<"line" | "bar" | "area">("line")

  // Only use the last 14 days of data for the chart
  const chartData = healthData.slice(-14).map((day) => ({
    date: new Date(day.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    sleep: day.sleep,
    steps: day.steps / 1000, // Convert to thousands for better visualization
    heartRate: day.heartRate,
    water: day.water,
    mood: day.mood,
  }))

  const metricOptions = [
    { id: "sleep", label: "Sleep", icon: <Moon className="h-4 w-4" />, color: "blue" },
    { id: "steps", label: "Steps", icon: <Footprints className="h-4 w-4" />, color: "green" },
    { id: "heartRate", label: "Heart Rate", icon: <Heart className="h-4 w-4" />, color: "red" },
    { id: "water", label: "Water", icon: <Droplets className="h-4 w-4" />, color: "cyan" },
    { id: "mood", label: "Mood", icon: <Activity className="h-4 w-4" />, color: "amber" },
  ]

  const chartOptions = [
    { id: "line", label: "Line" },
    { id: "bar", label: "Bar" },
    { id: "area", label: "Area" },
  ]

  const colors = metricOptions.filter((metric) => selectedMetrics.includes(metric.id)).map((metric) => metric.color)

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Detailed Health Metrics</CardTitle>
          <CardDescription>Compare your health metrics over time</CardDescription>

          <div className="flex flex-col gap-4 pt-4 sm:flex-row sm:items-center">
            <div>
              <h4 className="mb-2 text-sm font-medium">Select Metrics</h4>
              <ToggleGroup type="multiple" value={selectedMetrics} onValueChange={setSelectedMetrics}>
                {metricOptions.map((metric) => (
                  <ToggleGroupItem key={metric.id} value={metric.id} aria-label={metric.label} className="flex gap-1">
                    {metric.icon}
                    <span className="hidden sm:inline">{metric.label}</span>
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </div>

            <div>
              <h4 className="mb-2 text-sm font-medium">Chart Type</h4>
              <ToggleGroup
                type="single"
                value={chartType}
                onValueChange={(value) => value && setChartType(value as any)}
              >
                {chartOptions.map((option) => (
                  <ToggleGroupItem key={option.id} value={option.id} aria-label={option.label}>
                    {option.label}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] w-full">
            {chartType === "line" && (
              <LineChart
                data={chartData}
                categories={selectedMetrics}
                index="date"
                colors={colors}
                yAxisWidth={40}
                showLegend={true}
                showGridLines={true}
                showAnimation={true}
              />
            )}
            {chartType === "bar" && (
              <BarChart
                data={chartData}
                categories={selectedMetrics}
                index="date"
                colors={colors}
                yAxisWidth={40}
                showLegend={true}
                showGridLines={true}
                showAnimation={true}
              />
            )}
            {chartType === "area" && (
              <AreaChart
                data={chartData}
                categories={selectedMetrics}
                index="date"
                colors={colors}
                yAxisWidth={40}
                showLegend={true}
                showGridLines={true}
                showAnimation={true}
              />
            )}
          </div>

          <div className="mt-4 text-sm text-muted-foreground">
            <p>
              <span className="font-medium">Note:</span> Steps are shown in thousands (K) for better visualization
              alongside other metrics.
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
