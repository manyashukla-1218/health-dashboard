import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Activity, Heart, Moon, Droplets, Footprints } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">VitalSync</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost">Log in</Button>
            </Link>
            <Link href="/signup">
              <Button>Sign up</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="container space-y-6 py-12 md:py-24 lg:py-32">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <h1 className="text-3xl font-bold leading-tight tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
              Track your health metrics in one place
            </h1>
            <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
              VitalSync connects with your wearable devices to provide a comprehensive view of your health data with
              beautiful visualizations.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/signup">
                <Button size="lg" className="gap-2">
                  Get Started <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button size="lg" variant="outline">
                  View Demo
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="container py-12 md:py-24 lg:py-32">
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                All your health metrics in one dashboard
              </h2>
              <p className="text-muted-foreground sm:text-lg">
                VitalSync provides a comprehensive view of your health data, including steps, sleep, heart rate, water
                intake, and mood tracking.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="flex flex-col items-center gap-2 rounded-lg border bg-background p-6 shadow-sm">
                <Heart className="h-12 w-12 text-red-500" />
                <h3 className="text-xl font-bold">Heart Rate</h3>
                <p className="text-center text-sm text-muted-foreground">
                  Track your heart rate patterns throughout the day and during activities.
                </p>
              </div>
              <div className="flex flex-col items-center gap-2 rounded-lg border bg-background p-6 shadow-sm">
                <Moon className="h-12 w-12 text-blue-500" />
                <h3 className="text-xl font-bold">Sleep</h3>
                <p className="text-center text-sm text-muted-foreground">
                  Monitor your sleep duration and quality with detailed insights.
                </p>
              </div>
              <div className="flex flex-col items-center gap-2 rounded-lg border bg-background p-6 shadow-sm">
                <Footprints className="h-12 w-12 text-green-500" />
                <h3 className="text-xl font-bold">Steps</h3>
                <p className="text-center text-sm text-muted-foreground">
                  Keep track of your daily steps and activity levels.
                </p>
              </div>
              <div className="flex flex-col items-center gap-2 rounded-lg border bg-background p-6 shadow-sm">
                <Droplets className="h-12 w-12 text-cyan-500" />
                <h3 className="text-xl font-bold">Water</h3>
                <p className="text-center text-sm text-muted-foreground">
                  Monitor your hydration levels throughout the day.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-muted py-12 md:py-24 lg:py-32">
          <div className="container space-y-12 px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Features</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Everything you need to track and improve your health metrics
              </p>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3">
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">Sync with Wearables</h3>
                <p className="text-sm text-muted-foreground">
                  Connect with your favorite wearable devices to automatically sync your health data.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">Beautiful Visualizations</h3>
                <p className="text-sm text-muted-foreground">
                  View your health data with clean, interactive charts and graphs.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">Weekly Summaries</h3>
                <p className="text-sm text-muted-foreground">
                  Get weekly insights and achievements based on your health metrics.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">Personalized Goals</h3>
                <p className="text-sm text-muted-foreground">
                  Set and track your health goals with personalized recommendations.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">Dark Mode</h3>
                <p className="text-sm text-muted-foreground">
                  Switch between light and dark mode for comfortable viewing.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">AI Insights</h3>
                <p className="text-sm text-muted-foreground">
                  Receive AI-generated tips and insights based on your health data.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-6 md:py-8">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            <span className="text-lg font-semibold">VitalSync</span>
          </div>
          <p className="text-center text-sm text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} VitalSync. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
