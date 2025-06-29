
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, ExternalLink, Github, Loader2 } from 'lucide-react';
import { useProjects, useDeleteProject } from '../../hooks/useProjects';

const ProjectsManager = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const { data: projectsResponse, isLoading, error } = useProjects(currentPage, 10, selectedCategory);
  const deleteProject = useDeleteProject();

  const projects = projectsResponse?.data || [];

  const handleDeleteProject = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este projeto?')) {
      try {
        await deleteProject.mutateAsync(id);
      } catch (error) {
        console.error('Error deleting project:', error);
      }
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      fullstack: 'bg-purple-500',
      frontend: 'bg-blue-500',
      backend: 'bg-green-500',
      mobile: 'bg-orange-500'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-500';
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-accent-blue" />
        <span className="ml-2 text-dark-text-muted">Carregando projetos...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">Erro ao carregar projetos</p>
        <p className="text-dark-text-muted text-sm mt-2">Verifique a conexão com a API</p>
      </div>
    );
  }

  if (!projects.length) {
    return (
      <div className="text-center py-8">
        <p className="text-dark-text-muted">Nenhum projeto encontrado</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <Card key={project.id} className="bg-dark-surface border-dark-border">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-dark-text">{project.title}</CardTitle>
                <CardDescription className="text-dark-text-muted mt-2">
                  {project.description}
                </CardDescription>
              </div>
              {project.featured && (
                <Badge variant="secondary" className="bg-gradient-to-r from-accent-blue to-accent-purple text-white">
                  Destaque
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Badge className={`${getCategoryColor(project.category)} text-white`}>
                {project.category}
              </Badge>
            </div>

            <div className="flex flex-wrap gap-1">
              {project.technologies.map((tech, index) => (
                <Badge key={index} variant="outline" className="border-dark-border text-dark-text-muted">
                  {tech}
                </Badge>
              ))}
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-dark-border">
              <div className="flex space-x-2">
                {project.liveUrl && (
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="border-dark-border text-dark-text"
                    onClick={() => window.open(project.liveUrl, '_blank')}
                  >
                    <ExternalLink size={14} />
                  </Button>
                )}
                {project.githubUrl && (
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="border-dark-border text-dark-text"
                    onClick={() => window.open(project.githubUrl, '_blank')}
                  >
                    <Github size={14} />
                  </Button>
                )}
              </div>
              <div className="flex space-x-2">
                <Button size="sm" variant="outline" className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white">
                  <Edit size={14} />
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                  onClick={() => handleDeleteProject(project.id)}
                  disabled={deleteProject.isPending}
                >
                  {deleteProject.isPending ? (
                    <Loader2 size={14} className="animate-spin" />
                  ) : (
                    <Trash2 size={14} />
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ProjectsManager;
