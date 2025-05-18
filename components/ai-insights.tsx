"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useHealthData } from "@/hooks/use-health-data"
import { Lightbulb, Brain, Zap, Droplets, Moon, Footprints, Heart } from "lucide-react"
import { motion } from "framer-motion"

export default function AiInsights() {
  const { healthData } = useHealthData()
  const [insights, setInsights] = useState<string[]>([])

  useEffect(() => {
    if (healthData.length > 0) {
      // Generate AI insights based on the health data
      const generatedInsights = generateInsights(healthData)
      setInsights(generatedInsights)
    }
  }, [healthData])

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
        <h3 className="text-xl font-bold">AI Health Insights</h3>
        <p className="text-muted-foreground">Personalized recommendations based on your health data</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            Smart Recommendations
          </CardTitle>
          <CardDescription>Our AI analyzes your health patterns to provide personalized insights</CardDescription>
        </CardHeader>
        <CardContent>
          <motion.div className="space-y-4" variants={container}>
            {insights.map((insight, index) => (
              <motion.div key={index} className="flex items-start gap-3 rounded-lg border p-4" variants={item}>
                <div className="mt-0.5">{getInsightIcon(insight)}</div>
                <div>
                  <p className="text-sm">{insight}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-amber-500" />
            Weekly Focus
          </CardTitle>
          <CardDescription>Based on your recent trends, here's what to focus on this week</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg bg-muted p-4">
            <h4 className="mb-2 font-medium">Your Priority: {getWeeklyFocus(healthData)}</h4>
            <p className="text-sm text-muted-foreground">{getWeeklyFocusDescription(healthData)}</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

function generateInsights(data: any[]): string[] {
  // Get the last 7 days of data
  const recentData = data.slice(-7)

  // Calculate averages
  const sleepAvg = recentData.reduce((sum, d) => sum + d.sleep, 0) / recentData.length
  const stepsAvg = recentData.reduce((sum, d) => sum + d.steps, 0) / recentData.length
  const waterAvg = recentData.reduce((sum, d) => sum + d.water, 0) / recentData.length
  const heartRateAvg = recentData.reduce((sum, d) => sum + d.heartRate, 0) / recentData.length
  const moodAvg = recentData.reduce((sum, d) => sum + d.mood, 0) / recentData.length

  // Generate insights based on the data
  const insights: string[] = []

  // Sleep insights
  if (sleepAvg < 7) {
    insights.push(
      "Try going to bed 30 minutes earlier to improve your sleep duration. Aim for 7-8 hours per night for optimal health.",
    )
  } else if (sleepAvg > 9) {
    insights.push(
      "You're sleeping more than average. While rest is important, excessive sleep can sometimes indicate other health issues.",
    )
  } else {
    insights.push("Your sleep patterns are in a healthy range. Maintain your current sleep schedule for optimal rest.")
  }

  // Steps insights
  if (stepsAvg < 7500) {
    insights.push(
      "Your step count is below the recommended 10,000 steps per day. Try adding a 15-minute walk to your daily routine.",
    )
  } else if (stepsAvg > 12000) {
    insights.push(
      "Great job staying active! Your step count is above average. Make sure to balance activity with proper recovery.",
    )
  }

  // Water insights
  if (waterAvg < 60) {
    insights.push("Try drinking 2 more cups of water daily to reach the recommended intake of 64 oz (8 cups).")
  } else {
    insights.push(
      "You're staying well-hydrated! Maintaining proper hydration supports energy levels and overall health.",
    )
  }

  // Heart rate insights
  if (heartRateAvg > 80) {
    insights.push(
      "Your resting heart rate is slightly elevated. Consider adding relaxation techniques like deep breathing to your daily routine.",
    )
  } else if (heartRateAvg < 60) {
    insights.push(
      "Your low resting heart rate may indicate good cardiovascular fitness. Continue with your current exercise routine.",
    )
  }

  // Mood insights
  if (moodAvg < 6) {
    insights.push(
      "Your mood ratings have been lower recently. Physical activity and social connections can help improve mood and mental wellbeing.",
    )
  } else if (moodAvg > 8) {
    insights.push(
      "Your positive mood is excellent! Consider journaling about what's working well to maintain this positive trend.",
    )
  }

  // Correlation insights
  const sleepAndMoodCorrelation = calculateCorrelation(
    recentData.map((d) => d.sleep),
    recentData.map((d) => d.mood),
  )

  if (sleepAndMoodCorrelation > 0.5) {
    insights.push(
      "There appears to be a positive correlation between your sleep quality and mood. Prioritizing good sleep habits may help maintain your positive mood.",
    )
  }

  // Check for step and heart rate correlation
  const stepsAndHeartRateCorrelation = calculateCorrelation(
    recentData.map((d) => d.steps),
    recentData.map((d) => d.heartRate),
  )

  if (stepsAndHeartRateCorrelation > 0.4) {
    insights.push(
      "Your increased activity levels appear to be having a positive impact on your heart health. Keep up the good work!",
    )
  }

  return insights
}

function calculateCorrelation(x: number[], y: number[]): number {
  // Simple correlation calculation
  const n = x.length
  let sumX = 0,
    sumY = 0,
    sumXY = 0,
    sumX2 = 0,
    sumY2 = 0

  for (let i = 0; i < n; i++) {
    sumX += x[i]
    sumY += y[i]
    sumXY += x[i] * y[i]
    sumX2 += x[i] * x[i]
    sumY2 += y[i] * y[i]
  }

  const numerator = n * sumXY - sumX * sumY
  const denominator = Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY))

  return denominator === 0 ? 0 : numerator / denominator
}

function getInsightIcon(insight: string) {
  if (insight.includes("sleep")) return <Moon className="h-5 w-5 text-blue-500" />
  if (insight.includes("step") || insight.includes("active")) return <Footprints className="h-5 w-5 text-green-500" />
  if (insight.includes("water") || insight.includes("hydrat")) return <Droplets className="h-5 w-5 text-cyan-500" />
  if (insight.includes("heart") || insight.includes("cardiovascular")) return <Heart className="h-5 w-5 text-red-500" />
  if (insight.includes("mood") || insight.includes("mental")) return <Zap className="h-5 w-5 text-amber-500" />
  return <Lightbulb className="h-5 w-5 text-primary" />
}

function getWeeklyFocus(data: any[]): string {
  // Determine which metric needs the most improvement
  const recentData = data.slice(-7)

  const sleepAvg = recentData.reduce((sum, d) => sum + d.sleep, 0) / recentData.length
  const stepsAvg = recentData.reduce((sum, d) => sum + d.steps, 0) / recentData.length
  const waterAvg = recentData.reduce((sum, d) => sum + d.water, 0) / recentData.length
  const moodAvg = recentData.reduce((sum, d) => sum + d.mood, 0) / recentData.length

  // Calculate how far each metric is from its ideal value (as a percentage)
  const sleepDiff = Math.abs((sleepAvg - 7.5) / 7.5)
  const stepsDiff = Math.max(0, (10000 - stepsAvg) / 10000)
  const waterDiff = Math.max(0, (64 - waterAvg) / 64)
  const moodDiff = Math.max(0, (8 - moodAvg) / 8)

  // Find the metric with the largest difference
  const maxDiff = Math.max(sleepDiff, stepsDiff, waterDiff, moodDiff)

  if (maxDiff === sleepDiff) return "Improve Sleep Quality"
  if (maxDiff === stepsDiff) return "Increase Daily Activity"
  if (maxDiff === waterDiff) return "Boost Hydration"
  if (maxDiff === moodDiff) return "Enhance Mood and Mental Wellbeing"

  return "Maintain Your Healthy Balance"
}

function getWeeklyFocusDescription(data: any[]): string {
  const focus = getWeeklyFocus(data)

  if (focus === "Improve Sleep Quality") {
    return "This week, focus on establishing a consistent sleep schedule. Aim to go to bed and wake up at the same time each day, even on weekends. Limit screen time before bed and create a relaxing bedtime routine."
  }

  if (focus === "Increase Daily Activity") {
    return "Try to incorporate more movement into your day. Take short walking breaks, use stairs instead of elevators, or add a 15-minute workout to your morning routine. Small changes can lead to significant improvements."
  }

  if (focus === "Boost Hydration") {
    return "Keep a water bottle with you throughout the day and set reminders to drink regularly. Try infusing your water with fruits or herbs for variety, and remember that many foods like fruits and vegetables also contribute to hydration."
  }

  if (focus === "Enhance Mood and Mental Wellbeing") {
    return "Prioritize activities that bring you joy and relaxation. Practice mindfulness or meditation for a few minutes each day, connect with friends or family, and make time for hobbies you enjoy."
  }

  return "You're doing well across all health metrics! This week, focus on maintaining your healthy habits while finding ways to make them more enjoyable and sustainable for the long term."
}
