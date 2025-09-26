"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TriangleAlert as AlertTriangle, CircleCheck as CheckCircle, Info, User, Clock, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface Activity {
  id: number
  type: string
  title: string
  description: string
  timestamp: string
  user: string
}

interface ActivityFeedProps {
  activities: Activity[]
}

export function ActivityFeed({ activities }: ActivityFeedProps) {
  const [isRefreshing, setIsRefreshing] = useState(false)

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "alert":
        return <AlertTriangle className="h-4 w-4 text-red-600" />
      case "update":
        return <Info className="h-4 w-4 text-blue-600" />
      default:
        return <Clock className="h-4 w-4 text-gray-600" />
    }
  }

  const getActivityColor = (type: string) => {
    switch (type) {
      case "success":
        return "border-green-500/20 bg-green-500/5 dark:bg-green-900/50"
      case "alert":
        return "border-red-500/20 bg-red-500/5 dark:bg-red-900/50"
      case "update":
        return "border-blue-500/20 bg-blue-500/5 dark:bg-blue-900/50"
      default:
        return "border-gray-500/20 bg-gray-500/5 dark:bg-gray-800/50"
    }
  }

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setIsRefreshing(false)
    }, 1000)
  }

  return (
    <Card className="hover:shadow-lg transition-all duration-300 card-enhanced animate-scale-in dark:bg-slate-900 dark:border-slate-700">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Activités Récentes
          </CardTitle>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleRefresh} 
            disabled={isRefreshing} 
            className="h-8 w-8 hover:bg-accent/50 transition-all duration-200"
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity, index) => (
          <div
            key={activity.id}
            className={`p-4 rounded-lg border ${getActivityColor(activity.type)} transition-all duration-300 hover:shadow-sm hover:scale-[1.01] animate-slide-in-staggered group`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-start space-x-3">
              <div className="mt-0.5 flex-shrink-0 transition-transform duration-200 group-hover:scale-110">
                {getActivityIcon(activity.type)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground leading-tight text-balance">{activity.title}</p>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed text-pretty">{activity.description}</p>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center text-xs text-muted-foreground">
                    <User className="h-3 w-3 mr-1" />
                    <span className="font-medium">{activity.user}</span>
                  </div>
                  <span className="text-xs text-muted-foreground font-medium">{activity.timestamp}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
        {activities.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <Clock className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>Aucune activité récente</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
