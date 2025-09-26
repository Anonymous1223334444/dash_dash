"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { TriangleAlert as AlertTriangle, CircleCheck as CheckCircle, Clock } from "lucide-react"

interface ProjectCardProps {
  component: {
    id: number
    name: string
    icon: string
    budget: number
    progress: number
    activities: number
    blocked: number
    color: string
  }
  onClick?: () => void
}

export function ProjectCard({ component, onClick }: ProjectCardProps) {
  const getStatusIcon = () => {
    if (component.progress === 100) {
      return <CheckCircle className="h-4 w-4 text-green-600" aria-label="Terminé" />
    } else if (component.blocked > 2 || component.progress < 50) {
      return <AlertTriangle className="h-4 w-4 text-red-600" aria-label="À risque" />
    } else {
      return <Clock className="h-4 w-4 text-blue-600" aria-label="En cours" />
    }
  }

  const getStatusBadge = () => {
    if (component.progress === 100) {
      return <Badge className="bg-green-500/10 text-green-600 border-green-500/20 text-xs" aria-label="Statut: Terminé">Terminé</Badge>
    } else if (component.blocked > 2 || component.progress < 50) {
      return <Badge className="bg-red-500/10 text-red-600 border-red-500/20 text-xs" aria-label="Statut: À risque">À Risque</Badge>
    } else {
      return <Badge className="bg-blue-500/10 text-blue-600 border-blue-500/20 text-xs" aria-label="Statut: En cours">En Cours</Badge>
    }
  }

  return (
    <Card
      className="relative overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer border-l-4 hover:scale-[1.02] group card-enhanced animate-scale-in dark:bg-slate-900 dark:border-slate-700"
      style={{ borderLeftColor: component.color }}
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={`Projet: ${component.name}, Progression: ${component.progress}%, Activités: ${component.activities}, Bloquées: ${component.blocked}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-white/10 dark:via-white/2 dark:to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <CardHeader className="pb-2 sm:pb-3 p-3 sm:p-4 lg:p-6">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-start space-x-2 sm:space-x-3 flex-1 min-w-0">
            <span className="text-xl sm:text-2xl lg:text-3xl flex-shrink-0 transition-transform duration-200 group-hover:scale-110">
              {component.icon}
            </span>
            <div className="min-w-0 flex-1">
              <CardTitle className="text-sm sm:text-base font-semibold leading-tight text-balance line-clamp-2">
                {component.name}
              </CardTitle>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1 font-medium">
                <span className="hidden sm:inline">{component.budget} Mds FCFA</span>
                <span className="sm:hidden">{component.budget}M</span>
              </p>
            </div>
          </div>
          <div className="flex-shrink-0 transition-transform duration-200 group-hover:scale-110">
            {getStatusIcon()}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 sm:space-y-4 p-3 sm:p-4 lg:p-6 pt-0">
        <div className="space-y-2 sm:space-y-3">
          <div className="flex justify-between text-xs sm:text-sm">
            <span className="text-muted-foreground">Progression</span>
            <span className="font-semibold text-base sm:text-lg">{component.progress}%</span>
          </div>
          <div className="relative">
            <Progress value={component.progress} className="h-2 sm:h-3" />
            <div 
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full transition-transform duration-1000 group-hover:translate-x-full"
              style={{ width: `${component.progress}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:gap-4 text-xs sm:text-sm">
          <div className="flex flex-col sm:flex-row sm:justify-between">
            <span className="text-muted-foreground">Activités:</span>
            <span className="font-medium">{component.activities}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between">
            <span className="text-muted-foreground">Bloquées:</span>
            <span className={`font-medium ${component.blocked > 0 ? "text-red-600" : "text-green-600"}`}>
              {component.blocked}
            </span>
          </div>
        </div>

        <div className="pt-1 sm:pt-2">{getStatusBadge()}</div>
        
        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-current to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 opacity-20" />
      </CardContent>
    </Card>
  )
}
