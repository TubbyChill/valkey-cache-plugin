'use client'

import * as React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart, Database, Users, ArrowUp, ArrowDown } from 'lucide-react'
import type { SupportedLanguage } from '@/i18n/use-translations'
import { useTranslations } from '@/i18n/use-translations'

interface DashboardPageProps {
  params: {
    lang: SupportedLanguage
  }
}

export default function DashboardPage({ params }: DashboardPageProps) {
  const { lang } = params
  const { t } = useTranslations(lang)

  const stats = [
    {
      title: 'Total Cache Size',
      value: '2.4 GB',
      icon: Database,
      change: '+12%',
      trend: 'up',
    },
    {
      title: 'Cache Hits',
      value: '1.2M',
      icon: BarChart,
      change: '+18%',
      trend: 'up',
    },
    {
      title: 'Active Users',
      value: '573',
      icon: Users,
      change: '-2%',
      trend: 'down',
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Welcome back! Here's an overview of your cache performance.
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon
          const Trend = stat.trend === 'up' ? ArrowUp : ArrowDown
          const trendColor = stat.trend === 'up' ? 'text-green-500' : 'text-red-500'
          
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center pt-1 text-xs">
                  <Trend className={`mr-1 h-3 w-3 ${trendColor}`} />
                  <span className={trendColor}>{stat.change}</span>
                  <span className="text-muted-foreground"> from last month</span>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Add more dashboard sections here */}
    </div>
  )
} 