
import { useState } from 'react';
import { Github, Globe, ArrowRight } from 'lucide-react';

const Projects = () => {
  const [filter, setFilter] = useState('all');

  const projects = [
    {
      id: 1,
      title: 'E-commerce Platform',
      description: 'Plataforma completa de e-commerce com React, Node.js e PostgreSQL. Inclui painel administrativo, sistema de pagamentos e gestão de estoque.',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
      category: 'fullstack',
      github: '#',
      live: '#'
    },
    {
      id: 2,
      title: 'Task Management App',
      description: 'Aplicativo de gerenciamento de tarefas com React Native. Sincronização em tempo real, notificações push e interface intuitiva.',
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?auto=format&fit=crop&w=800&q=80',
      technologies: ['React Native', 'Firebase', 'Redux'],
      category: 'mobile',
      github: '#',
      live: '#'
    },
    {
      id: 3,
      title: 'Data Analytics Dashboard',
      description: 'Dashboard interativo para análise de dados com visualizações em tempo real. Integração com múltiplas APIs e relatórios personalizados.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
      technologies: ['React', 'D3.js', 'Python', 'MongoDB'],
      category: 'frontend',
      github: '#',
      live: '#'
    },
    {
      id: 4,
      title: 'API Gateway',
      description: 'Gateway de APIs com autenticação JWT, rate limiting e monitoramento. Arquitetura de microserviços escalável.',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
      technologies: ['Node.js', 'Docker', 'Redis', 'JWT'],
      category: 'backend',
      github: '#',
      live: '#'
    },
    {
      id: 5,
      title: 'Social Media App',
      description: 'Rede social completa com chat em tempo real, stories e sistema de posts. Frontend e backend desenvolvidos do zero.',
      image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=800&q=80',
      technologies: ['Next.js', 'Socket.io', 'MongoDB', 'AWS'],
      category: 'fullstack',
      github: '#',
      live: '#'
    },
    {
      id: 6,
      title: 'Portfolio Website',
      description: 'Site portfolio responsivo com animações suaves e otimização SEO. Design moderno e performance otimizada.',
      image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=800&q=80',
      technologies: ['React', 'Tailwind', 'Framer Motion'],
      category: 'frontend',
      github: '#',
      live: '#'
    }
  ];

  const filters = [
    { key: 'all', label: 'Todos' },
    { key: 'fullstack', label: 'Full Stack' },
    { key: 'frontend', label: 'Frontend' },
    { key: 'backend', label: 'Backend' },
    { key: 'mobile', label: 'Mobile' }
  ];

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter);

  return (
    <section id="projects" className="py-20">
      <div className="section-padding">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
              Meus Projetos
            </h2>
            <p className="text-dark-text-muted text-lg max-w-2xl mx-auto mb-8">
              Uma seleção dos meus trabalhos mais recentes e significativos
            </p>

            {/* Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-2 md:gap-4">
              {filters.map((filterItem) => (
                <button
                  key={filterItem.key}
                  onClick={() => setFilter(filterItem.key)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    filter === filterItem.key
                      ? 'bg-gradient-to-r from-accent-blue to-accent-purple text-white'
                      : 'bg-dark-surface text-dark-text-muted hover:text-dark-text hover:bg-dark-surface-light'
                  }`}
                >
                  {filterItem.label}
                </button>
              ))}
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div key={project.id} className="project-card group">
                {/* Project Image */}
                <div className="relative overflow-hidden rounded-lg mb-6">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Overlay Links */}
                  <div className="absolute inset-0 flex items-center justify-center space-x-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <a
                      href={project.github}
                      className="p-3 bg-dark-surface/90 rounded-full text-dark-text hover:text-accent-blue transition-colors duration-300"
                      aria-label="Ver código no GitHub"
                    >
                      <Github size={20} />
                    </a>
                    <a
                      href={project.live}
                      className="p-3 bg-dark-surface/90 rounded-full text-dark-text hover:text-accent-blue transition-colors duration-300"
                      aria-label="Ver projeto ao vivo"
                    >
                      <Globe size={20} />
                    </a>
                  </div>
                </div>

                {/* Project Info */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-dark-text group-hover:text-accent-blue transition-colors duration-300">
                    {project.title}
                  </h3>
                  
                  <p className="text-dark-text-muted text-sm leading-relaxed">
                    {project.description}
                  </p>
                  
                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="skill-tag text-xs">
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  {/* Learn More Link */}
                  <div className="pt-2">
                    <a
                      href={project.live}
                      className="inline-flex items-center text-accent-blue hover:text-accent-purple transition-colors duration-300 text-sm font-medium"
                    >
                      Ver mais detalhes
                      <ArrowRight size={16} className="ml-1 transition-transform duration-300 group-hover:translate-x-1" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View All Projects Button */}
          <div className="text-center mt-16">
            <a
              href="#"
              className="inline-flex items-center px-8 py-4 bg-dark-surface border border-accent-blue text-accent-blue font-semibold rounded-xl hover:bg-accent-blue hover:text-white transition-all duration-300 hover:scale-105"
            >
              Ver Todos os Projetos
              <ArrowRight size={20} className="ml-2" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
