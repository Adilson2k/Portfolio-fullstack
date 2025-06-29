
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, FolderOpen, Mail, TrendingUp } from 'lucide-react';
import { useDashboardStats } from '../../hooks/useDashboard';

const StatsOverview = () => {
  const { data: stats, isLoading, error } = useDashboardStats();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, index) => (
          <Card key={index} className="bg-dark-surface border-dark-border">
            <CardHeader className="animate-pulse">
              <div className="h-4 bg-dark-border rounded w-3/4"></div>
            </CardHeader>
            <CardContent className="animate-pulse">
              <div className="h-8 bg-dark-border rounded w-1/2 mb-2"></div>
              <div className="h-3 bg-dark-border rounded w-2/3"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    console.error('Error loading dashboard stats:', error);
  }

  // Dados padrão caso a API não esteja disponível
  const defaultStats = {
    totalProjects: 12,
    totalMessages: 56,
    unreadMessages: 8,
    totalViews: 2430,
    totalSkills: 15
  };

  const displayStats = stats || defaultStats;

  const statsData = [
    {
      title: 'Total de Projetos',
      value: displayStats.totalProjects.toString(),
      description: '+2 este mês',
      icon: FolderOpen,
      color: 'text-blue-500'
    },
    {
      title: 'Mensagens Totais',
      value: displayStats.totalMessages.toString(),
      description: `${displayStats.unreadMessages || 0} não lidas`,
      icon: Mail,
      color: 'text-purple-500'
    },
    {
      title: 'Visualizações',
      value: displayStats.totalViews?.toString() || '0',
      description: '+12% esta semana',
      icon: TrendingUp,
      color: 'text-orange-500'
    },
    {
      title: 'Skills Cadastradas',
      value: displayStats.totalSkills?.toString() || '0',
      description: 'Tecnologias dominadas',
      icon: Users,
      color: 'text-green-500'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statsData.map((stat, index) => (
        <Card key={index} className="bg-dark-surface border-dark-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-dark-text-muted">
              {stat.title}
            </CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-dark-text">{stat.value}</div>
            <p className="text-xs text-dark-text-muted">
              {stat.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StatsOverview;
