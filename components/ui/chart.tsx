import {
  Area,
  AreaChart as RechartsAreaChart,
  Bar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  Line,
  LineChart as RechartsLineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from "recharts"

interface ChartProps {
  data: any[]
  categories: string[]
  index: string
  colors: string[]
  yAxisWidth?: number
  showLegend?: boolean
  showGridLines?: boolean
  showTooltip?: boolean
  showAnimation?: boolean
  showXAxis?: boolean
  showYAxis?: boolean
}

export function LineChart({
  data,
  categories,
  index,
  colors,
  yAxisWidth = 30,
  showLegend = false,
  showGridLines = false,
  showTooltip = true,
  showAnimation = false,
  showXAxis = true,
  showYAxis = true,
}: ChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsLineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke={showGridLines ? "#ccc" : "none"} />
        {showXAxis && <XAxis dataKey={index} />}
        {showYAxis && <YAxis width={yAxisWidth} />}
        {showTooltip && <Tooltip />}
        {showLegend && <Legend />}
        {categories.map((category, i) => (
          <Line
            key={category}
            type="monotone"
            dataKey={category}
            stroke={`var(--${colors[i]}-500)`}
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 8 }}
            animationDuration={showAnimation ? 1500 : 0}
            name={formatCategoryName(category)}
          />
        ))}
      </RechartsLineChart>
    </ResponsiveContainer>
  )
}

export function BarChart({
  data,
  categories,
  index,
  colors,
  yAxisWidth = 30,
  showLegend = false,
  showGridLines = false,
  showTooltip = true,
  showAnimation = false,
  showXAxis = true,
  showYAxis = true,
}: ChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsBarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke={showGridLines ? "#ccc" : "none"} />
        {showXAxis && <XAxis dataKey={index} />}
        {showYAxis && <YAxis width={yAxisWidth} />}
        {showTooltip && <Tooltip />}
        {showLegend && <Legend />}
        {categories.map((category, i) => (
          <Bar
            key={category}
            dataKey={category}
            fill={`var(--${colors[i]}-500)`}
            animationDuration={showAnimation ? 1500 : 0}
            name={formatCategoryName(category)}
          />
        ))}
      </RechartsBarChart>
    </ResponsiveContainer>
  )
}

export function AreaChart({
  data,
  categories,
  index,
  colors,
  yAxisWidth = 30,
  showLegend = false,
  showGridLines = false,
  showTooltip = true,
  showAnimation = false,
  showXAxis = true,
  showYAxis = true,
}: ChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsAreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke={showGridLines ? "#ccc" : "none"} />
        {showXAxis && <XAxis dataKey={index} />}
        {showYAxis && <YAxis width={yAxisWidth} />}
        {showTooltip && <Tooltip />}
        {showLegend && <Legend />}
        {categories.map((category, i) => (
          <Area
            key={category}
            type="monotone"
            dataKey={category}
            stroke={`var(--${colors[i]}-500)`}
            fill={`var(--${colors[i]}-500/20)`}
            animationDuration={showAnimation ? 1500 : 0}
            name={formatCategoryName(category)}
          />
        ))}
      </RechartsAreaChart>
    </ResponsiveContainer>
  )
}

function formatCategoryName(category: string): string {
  if (category === "heartRate") return "Heart Rate"
  return category.charAt(0).toUpperCase() + category.slice(1)
}
