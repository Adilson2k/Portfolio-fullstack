
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LogOut, Users, FolderOpen, Mail, BarChart3, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ProjectsManager from '../components/dashboard/ProjectsManager';
import LeadsManager from '../components/dashboard/LeadsManager';
import StatsOverview from '../components/dashboard/StatsOverview';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();

  const handleLogout = () => {
    // Aqui você implementaria a lógica de logout real
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-dark-bg">
      {/* Header do Dashboard */}
      <header className="bg-dark-surface border-b border-dark-border">
        <div className="section-padding py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold gradient-text">Dashboard</h1>
              <span className="text-dark-text-muted">|</span>
              <span className="text-dark-text-muted">Painel Administrativo</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button
                onClick={() => navigate('/')}
                variant="outline"
                size="sm"
                className="border-dark-border text-dark-text hover:bg-dark-surface-light"
              >
                Ver Portfolio
              </Button>
              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
                className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
              >
                <LogOut size={16} />
                <span className="ml-2">Sair</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="section-padding py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-dark-surface-light">
            <TabsTrigger value="overview" className="flex items-center space-x-2">
              <BarChart3 size={16} />
              <span>Visão Geral</span>
            </TabsTrigger>
            <TabsTrigger value="projects" className="flex items-center space-x-2">
              <FolderOpen size={16} />
              <span>Projetos</span>
            </TabsTrigger>
            <TabsTrigger value="leads" className="flex items-center space-x-2">
              <Users size={16} />
              <span>Leads</span>
            </TabsTrigger>
            <TabsTrigger value="messages" className="flex items-center space-x-2">
              <Mail size={16} />
              <span>Mensagens</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <StatsOverview />
          </TabsContent>

          <TabsContent value="projects" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-dark-text">Gerenciar Projetos</h2>
              <Button className="bg-gradient-to-r from-accent-blue to-accent-purple">
                <Plus size={16} />
                <span className="ml-2">Novo Projeto</span>
              </Button>
            </div>
            <ProjectsManager />
          </TabsContent>

          <TabsContent value="leads" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-dark-text">Gerenciar Leads</h2>
              <Button className="bg-gradient-to-r from-accent-blue to-accent-purple">
                <Plus size={16} />
                <span className="ml-2">Novo Lead</span>
              </Button>
            </div>
            <LeadsManager />
          </TabsContent>

          <TabsContent value="messages" className="space-y-6">
            <h2 className="text-xl font-semibold text-dark-text">Mensagens de Contato</h2>
            <Card className="bg-dark-surface border-dark-border">
              <CardHeader>
                <CardTitle className="text-dark-text">Mensagens Recebidas</CardTitle>
                <CardDescription className="text-dark-text-muted">
                  Mensagens enviadas através do formulário de contato
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-dark-text-muted">
                  <Mail size={48} className="mx-auto mb-4 opacity-50" />
                  <p>Nenhuma mensagem ainda</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;
