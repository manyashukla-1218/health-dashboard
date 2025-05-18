"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AreaChart, BarChart, LineChart } from "@/components/ui/chart"
import { Progress } from "@/components/ui/progress"
import { Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useHealthData } from "@/hooks/use-health-data"
import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface MetricCardProps {
  title: string
  icon: ReactNode
  value: string
  description: string
  chart: "line" | "bar" | "area"
  data: { value: number; date: string }[]
  color: string
  status: "success" | "warning" | "error"
  progressValue?: number
}

export default function MetricCard({
  title,
  icon,
  value,
  description,
  chart,
  data,
  color,
  status,
  progressValue,
}: MetricCardProps) {
  const [isVisible, setIsVisible] = useState(true)
  const { toggleMetric } = useHealthData()

  // Only use the last 7 days of data for the mini chart
  const chartData = data.slice(-7)

  // Map colors to Tailwind classes
  const colorMap: Record<string, { stroke: string; fill: string }> = {
    blue: { stroke: "stroke-blue-500", fill: "fill-blue-500/20" },
    green: { stroke: "stroke-green-500", fill: "fill-green-500/20" },
    red: { stroke: "stroke-red-500", fill: "fill-red-500/20" },
    amber: { stroke: "stroke-amber-500", fill: "fill-amber-500/20" },
    cyan: { stroke: "stroke-cyan-500", fill: "fill-cyan-500/20" },
  }

  const statusColorMap: Record<string, string> = {
    success: "bg-green-500",
    warning: "bg-amber-500",
    error: "bg-red-500",
  }

  const { stroke, fill } = colorMap[color] || colorMap.blue

  const handleToggleVisibility = () => {
    if (isVisible) {
      toggleMetric(title.toLowerCase())
    } else {
      toggleMetric(title.toLowerCase())
    }
    setIsVisible(!isVisible)
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <Card className="overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div className="flex items-center space-x-2">
            <div className={`rounded-md p-1.5 ${statusColorMap[status]} text-white`}>{icon}</div>
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
          </div>
          <div className="flex items-center gap-2">
            <CardDescription>{description}</CardDescription>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleToggleVisibility}>
              {isVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              <span className="sr-only">Toggle visibility</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{value}</div>

          {progressValue !== undefined && (
            <div className="mt-2 mb-4">
              <Progress value={progressValue} className="h-2" />
              <p className="mt-1 text-xs text-muted-foreground">{progressValue.toFixed(0)}% of daily goal</p>
            </div>
          )}

          <div className="h-[80px] mt-2">
            {chart === "line" && (
              <LineChart
                data={chartData}
                categories={["value"]}
                index="date"
                colors={[color]}
                className="aspect-[4/1] h-full w-full"
                showXAxis={false}
                showYAxis={false}
                showLegend={false}
                showGridLines={false}
                showTooltip={true}
                showAnimation={true}
              />
            )}
            {chart === "bar" && (
              <BarChart
                data={chartData}
                categories={["value"]}
                index="date"
                colors={[color]}
                className="aspect-[4/1] h-full w-full"
                showXAxis={false}
                showYAxis={false}
                showLegend={false}
                showGridLines={false}
                showTooltip={true}
                showAnimation={true}
              />
            )}
            {chart === "area" && (
              <AreaChart
                data={chartData}
                categories={["value"]}
                index="date"
                colors={[color]}
                className="aspect-[4/1] h-full w-full"
                showXAxis={false}
                showYAxis={false}
                showLegend={false}
                showGridLines={false}
                showTooltip={true}
                showAnimation={true}
              />
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
