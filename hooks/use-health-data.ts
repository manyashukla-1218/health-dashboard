"use client"

import { useState, useEffect, useCallback } from "react"

interface HealthDataPoint {
  date: string
  sleep: number
  steps: number
  heartRate: number
  water: number
  mood: number
}

export function useHealthData() {
  const [healthData, setHealthData] = useState<HealthDataPoint[]>([])
  const [visibleMetrics, setVisibleMetrics] = useState<string[]>(["sleep", "steps", "heartRate", "water", "mood"])
  const [isLoading, setIsLoading] = useState(true)
  const [lastSynced, setLastSynced] = useState<number | null>(null)
  const [connectedDevice, setConnectedDevice] = useState<string | null>("FitBand Pro")

  // Load data from localStorage on mount
  useEffect(() => {
    const loadData = () => {
      const savedData = localStorage.getItem("healthData")
      if (savedData) {
        setHealthData(JSON.parse(savedData))
      }

      const savedVisibleMetrics = localStorage.getItem("visibleMetrics")
      if (savedVisibleMetrics) {
        setVisibleMetrics(JSON.parse(savedVisibleMetrics))
      }

      const savedLastSynced = localStorage.getItem("lastSynced")
      if (savedLastSynced) {
        setLastSynced(JSON.parse(savedLastSynced))
      }

      const savedConnectedDevice = localStorage.getItem("connectedDevice")
      if (savedConnectedDevice) {
        setConnectedDevice(JSON.parse(savedConnectedDevice))
      }

      setIsLoading(false)
    }

    loadData()
  }, [])

  // Save data to localStorage whenever it changes
  useEffect(() => {
    if (healthData.length > 0) {
      localStorage.setItem("healthData", JSON.stringify(healthData))
    }
  }, [healthData])

  useEffect(() => {
    localStorage.setItem("visibleMetrics", JSON.stringify(visibleMetrics))
  }, [visibleMetrics])

  useEffect(() => {
    if (lastSynced) {
      localStorage.setItem("lastSynced", JSON.stringify(lastSynced))
    }
  }, [lastSynced])

  useEffect(() => {
    if (connectedDevice) {
      localStorage.setItem("connectedDevice", JSON.stringify(connectedDevice))
    }
  }, [connectedDevice])

  // Generate mock data for the past 30 days
  const generateMockData = useCallback(() => {
    setIsLoading(true)

    const mockData: HealthDataPoint[] = []
    const now = new Date()

    for (let i = 29; i >= 0; i--) {
      const date = new Date(now)
      date.setDate(date.getDate() - i)

      // Generate realistic data with some trends
      const dayOfWeek = date.getDay() // 0 = Sunday, 6 = Saturday
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6

      // Sleep tends to be longer on weekends
      const sleepBase = isWeekend ? 7.5 : 6.8
      const sleep = sleepBase + (Math.random() * 2 - 1)

      // Steps tend to be lower on weekends
      const stepsBase = isWeekend ? 7000 : 9000
      const steps = stepsBase + Math.floor(Math.random() * 4000) - 1500

      // Heart rate varies slightly day to day
      const heartRateBase = 68
      const heartRate = heartRateBase + Math.floor(Math.random() * 10) - 5

      // Water intake is fairly consistent
      const waterBase = 64
      const water = waterBase + Math.floor(Math.random() * 20) - 10

      // Mood tends to be better on weekends and with more sleep
      const moodBase = isWeekend ? 7.5 : 6.5
      const sleepFactor = (sleep - 6) * 0.5 // Better sleep = better mood
      const mood = Math.min(10, Math.max(1, moodBase + sleepFactor + (Math.random() * 2 - 1)))

      mockData.push({
        date: date.toISOString(),
        sleep,
        steps,
        heartRate,
        water,
        mood,
      })
    }

    setHealthData(mockData)
    setLastSynced(Date.now())
    setIsLoading(false)
  }, [])

  // Simulate syncing with a wearable device
  const syncData = useCallback(async () => {
    setIsLoading(true)

    // Get the last day's data
    const lastDay = healthData[healthData.length - 1]

    if (!lastDay) {
      generateMockData()
      return
    }

    // Create a new day with slightly modified data
    const now = new Date()
    const newDate = now.toISOString()

    const newDay: HealthDataPoint = {
      date: newDate,
      sleep: Math.max(4, Math.min(10, lastDay.sleep + (Math.random() * 1.2 - 0.6))),
      steps: Math.max(3000, Math.min(15000, lastDay.steps + Math.floor(Math.random() * 2000 - 1000))),
      heartRate: Math.max(55, Math.min(85, lastDay.heartRate + Math.floor(Math.random() * 6 - 3))),
      water: Math.max(32, Math.min(96, lastDay.water + Math.floor(Math.random() * 16 - 8))),
      mood: Math.max(1, Math.min(10, lastDay.mood + (Math.random() * 2 - 1))),
    }

    // Add the new day to the data
    const newData = [...healthData.slice(1), newDay]
    setHealthData(newData)
    setLastSynced(Date.now())
    setIsLoading(false)
  }, [healthData, generateMockData])

  // Toggle visibility of a metric
  const toggleMetric = useCallback((metric: string) => {
    setVisibleMetrics((prev) => {
      if (prev.includes(metric)) {
        return prev.filter((m) => m !== metric)
      } else {
        return [...prev, metric]
      }
    })
  }, [])

  return {
    healthData,
    visibleMetrics,
    isLoading,
    lastSynced,
    connectedDevice,
    generateMockData,
    syncData,
    toggleMetric,
  }
}
