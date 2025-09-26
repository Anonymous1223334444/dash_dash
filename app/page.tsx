"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ChartBar as BarChart3, TrendingUp, TriangleAlert as AlertTriangle, DollarSign, Activity, Search, FileText, Bell, User, Download, Target, Settings, Calendar } from "lucide-react"
import { ProjectCard } from "@/components/project-card"
import { ActivityFeed } from "@/components/activity-feed"
import { ProjectTable } from "@/components/project-table"
import { AnalyticsCharts } from "@/components/analytics-charts"
import { ModernSidebar } from "@/components/modern-sidebar"
import { ModernMetric } from "@/components/modern-metrics"
import { TeamMembersGrid, organizationMembers } from "@/components/team-members-grid"
import { ThemeToggle } from "@/components/theme-toggle"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { NotificationsPanel } from "@/components/notifications-panel"
import { UserProfileDropdown } from "@/components/user-profile-dropdown"
import { AdvancedAnalyticsChart } from "@/components/advanced-analytics-chart"
import { ComprehensiveAnalytics } from "@/components/comprehensive-analytics"
import { ResponsiveGrid } from "@/components/responsive-grid"
import { ThemeCustomization } from "@/components/theme-customization"
import ProjectCalendarModal from "@/components/project-calendar-modal"

// Données du projet PAENS basées sur le fichier HTML original
const paensData = {
  projectInfo: {
    name: "PAENS",
    objective:
      "Étendre l'accès à une connectivité à haut débit abordable et résiliente aux changements climatiques et améliorer l'adoption des services gouvernementaux en ligne et des dossiers médicaux électroniques",
    funding: "Banque Mondiale",
    duration: "5 ans",
    coordinator: "Samba SENE",
    totalBudget: 89.98,
  },

  components: [
    {
      id: 1,
      name: "Environnement Juridique & Réglementaire",
      budget: 3.8,
      percentage: 4,
      icon: "⚖️",
      progress: 65,
      activities: 8,
      blocked: 2,
      color: "var(--chart-1)",
    },
    {
      id: 2,
      name: "Connectivité Haut Débit",
      budget: 34.85,
      percentage: 38,
      icon: "📡",
      progress: 72,
      activities: 5,
      blocked: 2,
      color: "var(--chart-2)",
    },
    {
      id: 3,
      name: "Adoption Numérique",
      budget: 22.18,
      percentage: 24,
      icon: "💻",
      progress: 68,
      activities: 6,
      blocked: 2,
      color: "var(--chart-3)",
    },
    {
      id: 4,
      name: "Digitalisation Santé",
      budget: 29.15,
      percentage: 32,
      icon: "🏥",
      progress: 45,
      activities: 6,
      blocked: 4,
      color: "var(--chart-4)",
    },
  ],

  activities: [
    // Composante 1 - Juridique
    {
      id: 1,
      activity: "Audit et valorisation du patrimoine fibre optique SENUM SA",
      responsible: "SENUM",
      component: 1,
      tdr_done: true,
      marche_done: true,
      contract_done: true,
      progress: 100,
      status: "Terminé",
      priority: "normal",
      comment: "Rapport final attendu, réunion octobre",
    },
    {
      id: 2,
      activity: "Conseiller PPP pour exploitation infrastructures fibre SENUM",
      responsible: "SENUM",
      component: 1,
      tdr_done: false,
      marche_done: false,
      contract_done: false,
      progress: 0,
      status: "Bloqué",
      priority: "high",
      comment: "Dossier en stand-by demande SENUM",
    },
    {
      id: 3,
      activity: "AT analyse impact numérique changement climatique",
      responsible: "ARTP",
      component: 1,
      tdr_done: true,
      marche_done: true,
      contract_done: false,
      progress: 67,
      status: "En cours",
      priority: "medium",
      comment: "AMI finalisé, DP à lancer",
    },
    {
      id: 4,
      activity: "AT renforcement réglementation partage infrastructures",
      responsible: "ARTP",
      component: 1,
      tdr_done: true,
      marche_done: true,
      contract_done: false,
      progress: 67,
      status: "En cours",
      priority: "medium",
      comment: "AMI finalisé, DP à lancer",
    },
    {
      id: 5,
      activity: "AT mise en œuvre décision libéralisation USSD",
      responsible: "ARTP",
      component: 1,
      tdr_done: true,
      marche_done: true,
      contract_done: false,
      progress: 67,
      status: "En cours",
      priority: "medium",
      comment: "AMI finalisé, DP à lancer",
    },
    {
      id: 6,
      activity: "Assistance technique amélioration gestion spectre",
      responsible: "ARTP",
      component: 1,
      tdr_done: true,
      marche_done: false,
      contract_done: false,
      progress: 33,
      status: "Démarré",
      priority: "high",
      comment: "TDR finalisés, AMI à lancer",
    },
    {
      id: 7,
      activity: "AT appui actualisation cadre légal numérique (LOSI)",
      responsible: "DTIC",
      component: 1,
      tdr_done: true,
      marche_done: true,
      contract_done: false,
      progress: 67,
      status: "En cours",
      priority: "medium",
      comment: "AMI lancé",
    },
    {
      id: 8,
      activity: "AT actualisation stratégie cybersécurité",
      responsible: "DTIC",
      component: 1,
      tdr_done: true,
      marche_done: false,
      contract_done: false,
      progress: 33,
      status: "Démarré",
      priority: "high",
      comment: "TDR finalisés, consultation à lancer",
    },

    // Composante 2 - Connectivité
    {
      id: 9,
      activity: "Consultant individuel appui MCTN/DT composante 2",
      responsible: "DT",
      component: 2,
      tdr_done: true,
      marche_done: true,
      contract_done: false,
      progress: 67,
      status: "En cours",
      priority: "medium",
      comment: "Évaluation faite, CM en attente",
    },
    {
      id: 10,
      activity: "AT identification liaisons FO Casamance/Bassin arachidier",
      responsible: "DT",
      component: 2,
      tdr_done: false,
      marche_done: false,
      contract_done: false,
      progress: 0,
      status: "Bloqué",
      priority: "high",
      comment: "TDR seront élaborés par consultant",
    },
    {
      id: 11,
      activity: "Survey zones blanches programme accès universel",
      responsible: "FDSUT",
      component: 2,
      tdr_done: true,
      marche_done: true,
      contract_done: true,
      progress: 100,
      status: "Terminé",
      priority: "normal",
      comment: "Contrat signé MCTN avril 2024",
    },
    {
      id: 12,
      activity: "Projet pilote 20 localités zones prioritaires",
      responsible: "FDSUT",
      component: 2,
      tdr_done: true,
      marche_done: false,
      contract_done: false,
      progress: 33,
      status: "Démarré",
      priority: "medium",
      comment: "Consultation en attente lancement",
    },
    {
      id: 13,
      activity: "Acquisition véhicules suivi travaux infrastructures",
      responsible: "FDSUT",
      component: 2,
      tdr_done: true,
      marche_done: false,
      contract_done: false,
      progress: 33,
      status: "Démarré",
      priority: "high",
      comment: "Autorisation SG PR en attente",
    },

    // Composante 3 - Adoption
    {
      id: 14,
      activity: "Consolidation plateforme Sénégal Services",
      responsible: "SENUM",
      component: 3,
      tdr_done: true,
      marche_done: true,
      contract_done: false,
      progress: 67,
      status: "En cours",
      priority: "medium",
      comment: "Processus arrêté demande SENUM",
    },
    {
      id: 15,
      activity: "Méthodologie harmonisée événements de la vie",
      responsible: "SENUM",
      component: 3,
      tdr_done: false,
      marche_done: false,
      contract_done: false,
      progress: 0,
      status: "Bloqué",
      priority: "medium",
      comment: "",
    },
    {
      id: 16,
      activity: "Équipements Espaces Sénégal Services (ESS)",
      responsible: "SENUM",
      component: 3,
      tdr_done: true,
      marche_done: false,
      contract_done: false,
      progress: 33,
      status: "Démarré",
      priority: "medium",
      comment: "SPEC validées, consultation à lancer",
    },
    {
      id: 17,
      activity: "Étude faisabilité architecture entreprise gouvernementale",
      responsible: "SENUM",
      component: 3,
      tdr_done: true,
      marche_done: true,
      contract_done: false,
      progress: 67,
      status: "En cours",
      priority: "medium",
      comment: "AMI finalisé, DP à lancer",
    },
    {
      id: 18,
      activity: "Consultant appui Senegal Connect Start-up",
      responsible: "SCP",
      component: 3,
      tdr_done: false,
      marche_done: false,
      contract_done: false,
      progress: 0,
      status: "Bloqué",
      priority: "medium",
      comment: "TDR à finaliser et valider UGP",
    },
    {
      id: 19,
      activity: "AT stratégie renforcement compétences numériques",
      responsible: "SCP",
      component: 3,
      tdr_done: true,
      marche_done: true,
      contract_done: false,
      progress: 67,
      status: "En cours",
      priority: "medium",
      comment: "AMI lancée, évaluations septembre",
    },

    // Composante 4 - Santé
    {
      id: 20,
      activity: "Réfections salles télémédecine centres santé",
      responsible: "CSSDOS",
      component: 4,
      tdr_done: false,
      marche_done: false,
      contract_done: false,
      progress: 0,
      status: "Bloqué",
      priority: "high",
      comment: "",
    },
    {
      id: 21,
      activity: "Connexion internet haut débit salles télémédecine",
      responsible: "CSSDOS",
      component: 4,
      tdr_done: false,
      marche_done: false,
      contract_done: false,
      progress: 0,
      status: "Bloqué",
      priority: "high",
      comment: "",
    },
    {
      id: 22,
      activity: "Équipements informatiques salles télémédecine",
      responsible: "CSSDOS",
      component: 4,
      tdr_done: false,
      marche_done: false,
      contract_done: false,
      progress: 0,
      status: "Bloqué",
      priority: "high",
      comment: "",
    },
    {
      id: 23,
      activity: "Équipements télémédecine (kits sondes) phase pilote",
      responsible: "CSSDOS",
      component: 4,
      tdr_done: false,
      marche_done: false,
      contract_done: false,
      progress: 0,
      status: "Bloqué",
      priority: "high",
      comment: "",
    },
    {
      id: 24,
      activity: "Infrastructures SDIS et cartes santé numériques",
      responsible: "CSSDOS",
      component: 4,
      tdr_done: true,
      marche_done: false,
      contract_done: false,
      progress: 33,
      status: "Démarré",
      priority: "medium",
      comment: "DAO en attente inscription SYGMAP",
    },
    {
      id: 25,
      activity: "Véhicules équipe technique CSSDOS (4x4 + Pickup)",
      responsible: "CSSDOS",
      component: 4,
      tdr_done: true,
      marche_done: false,
      contract_done: false,
      progress: 33,
      status: "Démarré",
      priority: "medium",
      comment: "DAO après validation STEP",
    },
  ],

  blockedActions: [
    {
      id: "senum_ppp",
      title: "SENUM - Conseil PPP Fibre Optique",
      description: "Conseiller en transactions pour la structuration du modèle PPP retenu",
      organization: "SENUM SA",
      status: "Dossier en stand-by",
      priority: "high",
    },
    {
      id: "artp_climat",
      title: "ARTP - Analyse Impact Numérique/Climat",
      description: "AT pour l'analyse de l'impact du numérique sur le changement climatique",
      organization: "ARTP",
      status: "AMI finalisé, DP à lancer",
      priority: "high",
    },
    {
      id: "artp_spectre",
      title: "ARTP - Gestion du Spectre",
      description: "Assistance technique pour l'amélioration de la gestion du spectre",
      organization: "ARTP",
      status: "TDR finalisés, AMI à lancer",
      priority: "high",
    },
    {
      id: "dtic_cyber",
      title: "DTIC - Stratégie Cybersécurité",
      description: "Actualisation de la stratégie de cybersécurité nationale",
      organization: "DTIC",
      status: "TDR finalisés, consultation à lancer",
      priority: "high",
    },
    {
      id: "dt_consultant",
      title: "DT - Consultant Composante 2",
      description: "Recrutement consultant individuel pour appuyer MTCN/DT",
      organization: "Direction Télécom",
      status: "Évaluation faite, CM en attente",
      priority: "medium",
    },
    {
      id: "cssdos_sante",
      title: "CSSDOS - Infrastructures Santé",
      description: "Réfections et mise aux normes des salles de télémédecine",
      organization: "CSSDOS",
      status: "Aucun processus démarré",
      priority: "high",
    },
    {
      id: "fdsut_vehicules",
      title: "FDSUT - Acquisition Véhicules",
      description: "Acquisition véhicules pour suivi travaux infrastructures",
      organization: "FDSUT",
      status: "Autorisation SG PR en attente",
      priority: "high",
    },
    {
      id: "scp_competences",
      title: "SCP - Consultant Compétences",
      description: "Consultant pour appuyer Senegal Connect Start-up",
      organization: "Senegal Connect",
      status: "TDR à finaliser",
      priority: "medium",
    },
  ],

  recentActivities: [
    {
      id: 1,
      type: "update",
      title: "Audit Fibre SENUM Terminé",
      description: "Rapport final soumis pour validation",
      timestamp: "Il y a 2 heures",
      user: "Samba SENE",
    },
    {
      id: 2,
      type: "alert",
      title: "Gestion Spectre ARTP Retardée",
      description: "Lancement AMI en attente d'approbation",
      timestamp: "Il y a 4 heures",
      user: "Système",
    },
    {
      id: 3,
      type: "success",
      title: "Contrat Survey FDSUT Signé",
      description: "20 localités prioritaires identifiées",
      timestamp: "Il y a 1 jour",
      user: "Équipe Projet",
    },
  ],
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("vue-ensemble")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [selectedComponent, setSelectedComponent] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [collapsed, setCollapsed] = useState(false)
  const [showCalendarModal, setShowCalendarModal] = useState(false)

  const overview = {
    totalProjects: paensData.activities.length,
    activeProjects: paensData.activities.filter((a) => a.status === "En cours" || a.status === "Démarré").length,
    completedProjects: paensData.activities.filter((a) => a.status === "Terminé").length,
    blockedProjects: paensData.activities.filter((a) => a.status === "Bloqué").length,
    totalBudget: paensData.projectInfo.totalBudget,
    overallProgress: Math.round(
      paensData.activities.reduce((sum, a) => sum + a.progress, 0) / paensData.activities.length,
    ),
  }

  const handleComponentClick = (componentId: number) => {
    setSelectedComponent(componentId)
    setActiveTab("projets")
    setSelectedFilter(componentId.toString())
  }

  const handleBlockedActionsClick = () => {
    setIsLoading(true)
    setTimeout(() => {
      setActiveTab("actions-bloquees")
      setIsLoading(false)
    }, 500)
  }

  const handleGenerateReport = () => {
    setIsLoading(true)
    setTimeout(() => {
      // Simulate report generation
      const reportData = {
        date: new Date().toLocaleDateString("fr-FR"),
        progress: overview.overallProgress,
        blocked: overview.blockedProjects,
        budget: overview.totalBudget,
      }

      // Create and download a simple report
      const reportContent = `Rapport PAENS - ${reportData.date}\n\nProgression Globale: ${reportData.progress}%\nActions Bloquées: ${reportData.blocked}\nBudget Total: ${reportData.budget} Mds FCFA`

      const blob = new Blob([reportContent], { type: "text/plain" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `Rapport_PAENS_${reportData.date.replace(/\//g, "-")}.txt`
      a.click()
      URL.revokeObjectURL(url)

      setIsLoading(false)
    }, 1500)
  }

  const handleExportExcel = () => {
    setIsLoading(true)
    setTimeout(() => {
      // Simulate Excel export
      console.log("Export Excel des données PAENS")
      setIsLoading(false)
    }, 1000)
  }

  const handleSidebarNavigation = (tab: string) => {
    setActiveTab(tab)
    // Reset filters when changing tabs
    if (tab !== "projets") {
      setSelectedFilter("all")
      setSelectedComponent(null)
    }
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case "vue-ensemble":
        return (
          <div className="space-y-8">
            {/* Modern Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-slide-in-staggered">
              <ModernMetric
                title="Total Activités"
                value={overview.totalProjects}
                change="+12%"
                trend="up"
                icon={BarChart3}
                color="text-blue-600 dark:text-blue-400"
                bgColor="bg-blue-50 dark:bg-blue-950/20"
                onClick={() => setActiveTab("projets")}
              />
              <ModernMetric
                title="En Cours"
                value={overview.activeProjects}
                change={`${overview.overallProgress}%`}
                trend="up"
                icon={Activity}
                color="text-green-600 dark:text-green-400"
                bgColor="bg-green-50 dark:bg-green-950/20"
                onClick={() => setActiveTab("projets")}
              />
              <ModernMetric
                title="Budget"
                value={`${overview.totalBudget}M`}
                change="89.98 Mds FCFA"
                trend="neutral"
                icon={DollarSign}
                color="text-purple-600 dark:text-purple-400"
                bgColor="bg-purple-50 dark:bg-purple-950/20"
                onClick={() => setActiveTab("rapports")}
              />
              <ModernMetric
                title="Bloquées"
                value={overview.blockedProjects}
                change="Attention requise"
                trend="down"
                icon={AlertTriangle}
                color="text-red-600 dark:text-red-400"
                bgColor="bg-red-50 dark:bg-red-950/20"
                onClick={() => setActiveTab("actions-bloquees")}
              />
            </div>

            {/* Project Components Grid */}
            <div className="animate-slide-in-staggered stagger-2">
              <ResponsiveGrid cols={{ sm: 1, md: 2, lg: 2, xl: 4 }} gap={{ sm: "gap-4", md: "gap-4", lg: "gap-6", xl: "gap-6" }}>
                {paensData.components.map((component) => (
                  <ProjectCard
                    key={component.id}
                    component={component}
                    onClick={() => handleComponentClick(component.id)}
                  />
                ))}
              </ResponsiveGrid>
            </div>

            {/* Analytics and Activity Feed */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-slide-in-staggered stagger-3">
              <div className="lg:col-span-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <AdvancedAnalyticsChart 
                    title="Progression Mensuelle" 
                    description="Suivi de l'avancement des différentes composantes" 
                    data={[
                      { name: 'Jan', value: 45 },
                      { name: 'Fév', value: 52 },
                      { name: 'Mar', value: 48 },
                      { name: 'Avr', value: 65 },
                      { name: 'Mai', value: 68 },
                      { name: 'Jui', value: 72 },
                    ]}
                    type="line"
                  />
                  <AdvancedAnalyticsChart 
                    title="Répartition par Composante" 
                    description="Distribution du budget sur les différentes composantes" 
                    data={[
                      { name: 'Juridique', value: 3.8 },
                      { name: 'Connectivité', value: 34.85 },
                      { name: 'Adoption', value: 22.18 },
                      { name: 'Santé', value: 29.15 },
                    ]}
                    type="pie"
                  />
                </div>
              </div>
              <div>
                <ActivityFeed activities={paensData.recentActivities} />
              </div>
            </div>
          </div>
        )

      case "projets":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Projets</h2>
              <Button variant="outline" onClick={() => setActiveTab("vue-ensemble")}>
                Retour au Dashboard
              </Button>
            </div>
            <ProjectTable
              activities={paensData.activities}
              components={paensData.components}
              searchQuery={searchQuery}
              selectedFilter={selectedFilter}
              onFilterChange={setSelectedFilter}
            />
          </div>
        )

      case "analytiques":
        return (
          <div className="space-y-6">
            <ComprehensiveAnalytics />
          </div>
        )

      case "actions-bloquees":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Actions Bloquées</h2>
              <Button variant="outline" onClick={() => setActiveTab("vue-ensemble")}>
                Retour au Dashboard
              </Button>
            </div>
            <ResponsiveGrid cols={{ sm: 1, md: 2, lg: 3 }} gap={{ sm: "gap-4", md: "gap-4", lg: "gap-6" }}>
              {paensData.blockedActions.map((action) => (
                <Card
                  key={action.id}
                  className="hover:shadow-lg transition-all duration-200 cursor-pointer border-l-4 border-l-red-500"
                >
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-red-500" />
                      {action.title}
                    </CardTitle>
                    <CardDescription>{action.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Organisation:</span>
                        <Badge variant="outline">{action.organization}</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Statut:</span>
                        <Badge variant={action.priority === "high" ? "destructive" : "secondary"}>
                          {action.status}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Priorité:</span>
                        <Badge variant={action.priority === "high" ? "destructive" : "secondary"}>
                          {action.priority === "high" ? "🔴 Critique" : "🟡 Importante"}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </ResponsiveGrid>
          </div>
        )

      case "rapports":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="hover:shadow-lg transition-all duration-200">
                <CardHeader>
                  <CardTitle>📊 Évolution Mensuelle</CardTitle>
                  <CardDescription>Progression globale du projet PAENS</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                    <div className="text-center">
                      <TrendingUp className="h-12 w-12 mx-auto mb-4" />
                      <p>Graphique d'évolution mensuelle</p>
                      <p className="text-sm">Progression actuelle: {overview.overallProgress}%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-all duration-200">
                <CardHeader>
                  <CardTitle>💰 Répartition Budget</CardTitle>
                  <CardDescription>Budget par composante</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {paensData.components.map((comp) => (
                      <div key={comp.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span>{comp.icon}</span>
                          <span className="text-sm">{comp.name}</span>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">{comp.budget} Mds</div>
                          <div className="text-xs text-muted-foreground">{comp.percentage}%</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card
                className="hover:shadow-lg transition-all duration-200 cursor-pointer"
                onClick={handleGenerateReport}
              >
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="h-5 w-5 mr-2" />
                    Rapport Mensuel
                  </CardTitle>
                  <CardDescription>Générer le rapport mensuel complet</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" disabled={isLoading}>
                    {isLoading ? "Génération..." : "Générer Rapport"}
                  </Button>
                </CardContent>
              </Card>

              <Card
                className="hover:shadow-lg transition-all duration-200 cursor-pointer"
                onClick={() => setActiveTab("actions-bloquees")}
              >
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <AlertTriangle className="h-5 w-5 mr-2" />
                    Actions Bloquées
                  </CardTitle>
                  <CardDescription>Exporter la liste des actions bloquées</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full bg-transparent">
                    Exporter Excel
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-all duration-200 cursor-pointer" onClick={handleExportExcel}>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="h-5 w-5 mr-2" />
                    Export Analytique
                  </CardTitle>
                  <CardDescription>Télécharger les données détaillées</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full bg-transparent" disabled={isLoading}>
                    {isLoading ? "Export..." : "Télécharger Données"}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )

      case "equipe":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
              {paensData.components.map((component) => {
                const orgKey = component.name.includes("Juridique")
                  ? "ARTP"
                  : component.name.includes("Connectivité")
                    ? "DT"
                    : component.name.includes("Adoption")
                      ? "SENUM"
                      : "CSSDOS"
                const members = organizationMembers[orgKey] || []

                return (
                  <Card key={component.id} className="hover:shadow-lg transition-all duration-200">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <span>{component.icon}</span>
                        <span className="truncate">{component.name}</span>
                      </CardTitle>
                      <CardDescription>
                        {members.length} membres • {component.activities} activités
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex -space-x-2">
                          {members.slice(0, 4).map((member) => (
                            <Avatar key={member.id} className="h-8 w-8 border-2 border-background">
                              <AvatarImage
                                src={`/.jpg?key=pwdcn&height=32&width=32&query=${member.name.split(" ")[0]}`}
                              />
                              <AvatarFallback className="text-xs">
                                {member.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                          ))}
                          {members.length > 4 && (
                            <div className="h-8 w-8 rounded-full bg-muted border-2 border-background flex items-center justify-center">
                              <span className="text-xs font-medium">+{members.length - 4}</span>
                            </div>
                          )}
                        </div>
                        <Button
                          variant="outline"
                          className="w-full bg-transparent"
                          onClick={() => {
                            // Show detailed team view
                            setSelectedComponent(component.id)
                          }}
                        >
                          Voir l'équipe
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {/* Detailed Team View */}
            {selectedComponent && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">Équipe Détaillée</h2>
                  <Button variant="outline" onClick={() => setSelectedComponent(null)}>
                    Fermer
                  </Button>
                </div>

                {Object.entries(organizationMembers).map(([org, members]) => (
                  <div key={org} className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <h3 className="text-xl font-semibold">{org}</h3>
                      <Badge variant="secondary">{members.length} membres</Badge>
                    </div>
                    <TeamMembersGrid
                      organization={org}
                      members={members}
                      color={paensData.components.find((c) => c.id === selectedComponent)?.color || "#3b82f6"}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        )

      case "calendrier":
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Calendrier des Événements
                </CardTitle>
                <CardDescription>Planification et suivi des activités du projet PAENS</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Calendar className="h-16 w-16 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Calendrier des Projets PAENS</h3>
                  <p className="text-muted-foreground mb-6">
                    Visualisez et gérez les activités planifiées pour chaque composante du projet
                  </p>
                  <Button 
                    onClick={() => setShowCalendarModal(true)}
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    Ouvrir le Calendrier
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {/* Calendar Modal - Need to import and use this */}
          </div>
        )

      case "objectifs":
        return (
          <div className="space-y-6">
            <Card className="dark:bg-slate-900 dark:border-slate-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Objectifs du Projet PAENS
                </CardTitle>
                <CardDescription>Objectifs stratégiques et indicateurs de performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border-l-4 border-l-blue-500 bg-blue-50 dark:bg-blue-900/50">
                    <div className="font-semibold mb-2">Objectif Principal</div>
                    <div className="text-sm mt-2">{paensData.projectInfo.objective}</div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {paensData.components.map((comp) => (
                      <div key={comp.id} className="p-4 border rounded-lg dark:border-slate-700 dark:bg-slate-800">
                        <div className="flex items-center gap-2 mb-2">
                          <span>{comp.icon}</span>
                          <div className="font-semibold text-sm">{comp.name}</div>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Progression: {comp.progress}% | Budget: {comp.budget} Mds FCFA
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case "parametres":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="h-5 w-5" />
                      Paramètres du Dashboard
                    </CardTitle>
                    <CardDescription>Configuration et préférences</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 border rounded-lg">
                        <div className="font-semibold mb-2">Informations Projet</div>
                        <div className="space-y-2 text-sm">
                          <div>Nom: {paensData.projectInfo.name}</div>
                          <div>Coordinateur: {paensData.projectInfo.coordinator}</div>
                          <div>Financement: {paensData.projectInfo.funding}</div>
                          <div>Durée: {paensData.projectInfo.duration}</div>
                        </div>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <div className="font-semibold mb-2">Préférences d'Affichage</div>
                        <div className="text-sm text-muted-foreground">
                          Configuration des notifications, thème, et langue
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div>
                <ThemeCustomization />
              </div>
            </div>
          </div>
        )

      default:
        return renderTabContent()
    }
  }

  return (
    <div className="flex min-h-screen bg-background">
      <ModernSidebar activeTab={activeTab} onTabChange={handleSidebarNavigation} collapsed={collapsed} setCollapsed={setCollapsed} />

      <div className={`flex-1 flex flex-col overflow-hidden min-w-0 animate-fade-in ${collapsed ? 'lg:ml-20' : 'lg:ml-80'}`}>
        <header className="border-b border-border glass-effect sticky top-0 z-30 shadow-sm pl-20 sm:pl-0">
          <div className="flex h-16 sm:h-18 items-center justify-between px-4 sm:px-6 lg:px-8">
            <div className="flex items-center space-x-2 sm:space-x-4 min-w-0 flex-1">
              <h1 className="text-base sm:text-lg lg:text-2xl font-bold text-foreground truncate bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text">
                <span className="hidden sm:inline">🇸🇳 Dashboard PAENS</span>
                <span className="sm:hidden">🇸🇳 PAENS</span>
              </h1>
              <Badge
                className="bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20 hidden md:flex text-xs animate-pulse shadow-sm"
              >
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse shadow-sm"></span>
                En Ligne - BM
              </Badge>
            </div>

            <div className="flex items-center space-x-1 sm:space-x-2 lg:space-x-4">
              <div className="relative hidden lg:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Rechercher projets, tâches..."
                  className="pl-10 w-48 xl:w-64 bg-background/50 backdrop-blur-sm transition-all duration-300 focus:w-56 xl:focus:w-72 focus:shadow-md border-border/50 focus:border-primary/50"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <Button variant="ghost" size="icon" className="h-8 w-8 lg:hidden hover:bg-accent/50 transition-colors duration-200">
                <Search className="h-4 w-4" />
              </Button>

              <ThemeToggle />
              <NotificationsPanel />
              <UserProfileDropdown 
                userName="Samba SENE"
                userEmail="samba.sene@paens.sn"
                userRole="Coordinateur Projet"
                avatarSrc="/african-man-professional.png"
              />
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-3 sm:p-4 lg:p-6 xl:p-8">
          <div className="max-w-7xl mx-auto">
            {renderTabContent()}

            {activeTab === "vue-ensemble" && (
              <div className="mt-6 sm:mt-8 space-y-3 sm:space-y-0 sm:flex sm:flex-wrap sm:gap-3 lg:gap-4 animate-slide-in-staggered stagger-3">
                <Button
                  onClick={() => setActiveTab("actions-bloquees")}
                  className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white w-full sm:w-auto transition-all duration-300 hover:shadow-lg hover:scale-105 shadow-md"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  ) : (
                    <AlertTriangle className="h-4 w-4 mr-2" />
                  )}
                  <span className="hidden lg:inline">🚨 Actions Bloquantes Prioritaires</span>
                  <span className="lg:hidden">🚨 Actions Bloquées</span>
                </Button>
                <Button
                  onClick={handleGenerateReport}
                  variant="outline"
                  disabled={isLoading}
                  className="w-full sm:w-auto bg-transparent hover:shadow-lg transition-all duration-300 hover:scale-105 border-border/50 hover:border-primary/50"
                >
                  {isLoading ? (
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                  ) : (
                    <FileText className="h-4 w-4 mr-2" />
                  )}
                  <span className="hidden lg:inline">📊 Rapport Mensuel BM</span>
                  <span className="lg:hidden">📊 Rapport</span>
                </Button>
                <Button
                  onClick={handleExportExcel}
                  variant="outline"
                  disabled={isLoading}
                  className="w-full sm:w-auto bg-transparent hover:shadow-lg transition-all duration-300 hover:scale-105 border-border/50 hover:border-primary/50"
                >
                  {isLoading ? (
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                  ) : (
                    <Download className="h-4 w-4 mr-2" />
                  )}
                  <span className="hidden lg:inline">📋 Export Excel Complet</span>
                  <span className="lg:hidden">📋 Export</span>
                </Button>
              </div>
            )}
          </div>
        </main>

        <footer className="border-t border-border glass-effect p-3 sm:p-4 text-center text-xs sm:text-sm text-muted-foreground">
          <div className="hidden lg:block">
            Projet PAENS - Banque Mondiale | Coordinateur: {paensData.projectInfo.coordinator} | Dernière mise à jour:{" "}
            {new Date().toLocaleDateString("fr-FR")} | Dashboard développé pour le suivi haute direction
          </div>
          <div className="hidden sm:block lg:hidden">
            PAENS - BM | {paensData.projectInfo.coordinator} | {new Date().toLocaleDateString("fr-FR")}
          </div>
          <div className="sm:hidden">PAENS - BM | {new Date().toLocaleDateString("fr-FR")}</div>
        </footer>
        
        {/* Calendar Modal */}
        <ProjectCalendarModal 
          open={showCalendarModal} 
          onOpenChange={setShowCalendarModal} 
        />
      </div>
    </div>
  )
}
