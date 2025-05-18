"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useHealthData } from "@/hooks/use-health-data"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Moon, Footprints, Droplets, Activity, Award, Zap, Flame } from "lucide-react"

export default function WeeklySummary() {
  const { healthData } = useHealthData()

  // Get the last 7 days of data
  const weeklyData = healthData.slice(-7)

  // Calculate averages
  const averages = {
    sleep: calculateAverage(weeklyData.map((d) => d.sleep)),
    steps: calculateAverage(weeklyData.map((d) => d.steps)),
    heartRate: calculateAverage(weeklyData.map((d) => d.heartRate)),
    water: calculateAverage(weeklyData.map((d) => d.water)),
    mood: calculateAverage(weeklyData.map((d) => d.mood)),
  }

  // Generate badges
  const badges = generateBadges(weeklyData, averages)

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <motion.div className="space-y-6" variants={container} initial="hidden" animate="show">
      <div>
        <h3 className="text-xl font-bold">Weekly Summary</h3>
        <p className="text-muted-foreground">Your health trends over the past 7 days</p>
      </div>

      <motion.div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3" variants={container}>
        <motion.div variants={item}>
          <SummaryCard
            title="Sleep"
            icon={<Moon className="h-5 w-5" />}
            average={`${averages.sleep.toFixed(1)} hrs`}
            trend={getTrend(weeklyData.map((d) => d.sleep))}
            color="blue"
          />
        </motion.div>

        <motion.div variants={item}>
          <SummaryCard
            title="Steps"
            icon={<Footprints className="h-5 w-5" />}
            average={`${Math.round(averages.steps).toLocaleString()}`}
            trend={getTrend(weeklyData.map((d) => d.steps))}
            color="green"
          />
        </motion.div>

        <motion.div variants={item}>
          <SummaryCard
            title="Heart Rate"
            icon={<Heart className="h-5 w-5" />}
            average={`${Math.round(averages.heartRate)} bpm`}
            trend={getTrend(
              weeklyData.map((d) => d.heartRate),
              false,
            )}
            color="red"
          />
        </motion.div>

        <motion.div variants={item}>
          <SummaryCard
            title="Water"
            icon={<Droplets className="h-5 w-5" />}
            average={`${Math.round(averages.water)} oz`}
            trend={getTrend(weeklyData.map((d) => d.water))}
            color="cyan"
          />
        </motion.div>

        <motion.div variants={item}>
          <SummaryCard
            title="Mood"
            icon={<Activity className="h-5 w-5" />}
            average={getMoodText(averages.mood)}
            trend={getTrend(weeklyData.map((d) => d.mood))}
            color="amber"
          />
        </motion.div>
      </motion.div>

      <motion.div variants={item}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-amber-500" />
              Achievements
            </CardTitle>
            <CardDescription>Your health accomplishments this week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {badges.map((badge, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Badge variant="secondary" className="flex items-center gap-1 px-3 py-1.5">
                    {badge.icon}
                    <span>{badge.text}</span>
                  </Badge>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}

function SummaryCard({
  title,
  icon,
  average,
  trend,
  color,
}: {
  title: string
  icon: React.ReactNode
  average: string
  trend: { direction: "up" | "down" | "neutral"; text: string }
  color: string
}) {
  const colorMap: Record<string, string> = {
    blue: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
    green: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
    red: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
    amber: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
    cyan: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300",
  }

  const trendColorMap: Record<string, string> = {
    up: "text-green-600 dark:text-green-400",
    down: "text-red-600 dark:text-red-400",
    neutral: "text-gray-600 dark:text-gray-400",
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className={`rounded-md p-1.5 ${colorMap[color]}`}>{icon}</div>
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="text-2xl font-bold">{average}</div>
          <div className={`text-sm ${trendColorMap[trend.direction]}`}>{trend.text}</div>
        </div>
      </CardContent>
    </Card>
  )
}

function calculateAverage(values: number[]): number {
  return values.reduce((sum, value) => sum + value, 0) / values.length
}

function getTrend(values: number[], higherIsBetter = true): { direction: "up" | "down" | "neutral"; text: string } {
  if (values.length < 2) {
    return { direction: "neutral", text: "Not enough data" }
  }

  const firstHalf = values.slice(0, Math.floor(values.length / 2))
  const secondHalf = values.slice(Math.floor(values.length / 2))

  const firstAvg = calculateAverage(firstHalf)
  const secondAvg = calculateAverage(secondHalf)

  const percentChange = ((secondAvg - firstAvg) / firstAvg) * 100

  if (Math.abs(percentChange) < 5) {
    return { direction: "neutral", text: "Stable (±5%)" }
  }

  const isImproving = higherIsBetter ? percentChange > 0 : percentChange < 0
  const direction = isImproving ? "up" : "down"
  const changeText = `${isImproving ? "Up" : "Down"} ${Math.abs(percentChange).toFixed(0)}%`

  return { direction, text: changeText }
}

function getMoodText(moodValue: number): string {
  if (moodValue >= 8.5) return "Excellent 😄"
  if (moodValue >= 7) return "Good 🙂"
  if (moodValue >= 5) return "Neutral 😐"
  if (moodValue >= 3.5) return "Poor 🙁"
  return "Bad 😞"
}

function generateBadges(data: any[], averages: any) {
  const badges = []

  // Sleep streak
  const goodSleepDays = data.filter((d) => d.sleep >= 7).length
  if (goodSleepDays >= 3) {
    badges.push({
      icon: <Moon className="h-4 w-4" />,
      text: `Good Sleep Streak: ${goodSleepDays} Days`,
    })
  }

  // Step achievements
  const stepGoal = 10000
  const daysAboveStepGoal = data.filter((d) => d.steps >= stepGoal).length
  if (daysAboveStepGoal > 0) {
    badges.push({
      icon: <Footprints className="h-4 w-4" />,
      text: `${daysAboveStepGoal} Days with 10,000+ Steps`,
    })
  }

  // Water consistency
  const waterGoal = 64 // oz
  const daysAboveWaterGoal = data.filter((d) => d.water >= waterGoal).length
  if (daysAboveWaterGoal >= 5) {
    badges.push({
      icon: <Droplets className="h-4 w-4" />,
      text: "Hydration Champion",
    })
  }

  // Heart rate in healthy range
  if (averages.heartRate >= 60 && averages.heartRate <= 80) {
    badges.push({
      icon: <Heart className="h-4 w-4" />,
      text: "Healthy Heart Rate Range",
    })
  }

  // Mood improvement
  const firstHalfMood = calculateAverage(data.slice(0, Math.floor(data.length / 2)).map((d) => d.mood))
  const secondHalfMood = calculateAverage(data.slice(Math.floor(data.length / 2)).map((d) => d.mood))
  if (secondHalfMood > firstHalfMood && secondHalfMood > 7) {
    badges.push({
      icon: <Zap className="h-4 w-4" />,
      text: "Improving Mood Trend",
    })
  }

  // Activity consistency
  if (data.every((d) => d.steps > 5000)) {
    badges.push({
      icon: <Flame className="h-4 w-4" />,
      text: "Active Every Day",
    })
  }

  return badges
}
