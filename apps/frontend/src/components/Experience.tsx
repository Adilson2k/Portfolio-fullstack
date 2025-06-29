
import { Briefcase, Calendar, MapPin } from 'lucide-react';

const Experience = () => {
  const experiences = [
    {
      id: 1,
      title: 'Senior Full Stack Developer',
      company: 'TechCorp Solutions',
      location: 'São Paulo, SP',
      period: '2022 - Presente',
      type: 'Full-time',
      description: [
        'Lidero equipe de 5 desenvolvedores em projetos de grande escala',
        'Desenvolvimento de aplicações React e Node.js para mais de 100k usuários',
        'Implementação de arquitetura de microserviços e DevOps practices',
        'Mentoria de desenvolvedores júnior e revisão de código'
      ],
      technologies: ['React', 'Node.js', 'AWS', 'Docker', 'PostgreSQL']
    },
    {
      id: 2,
      title: 'Full Stack Developer',
      company: 'Digital Innovation Labs',
      location: 'Rio de Janeiro, RJ',
      period: '2020 - 2022',
      type: 'Full-time',
      description: [
        'Desenvolvimento de plataformas e-commerce com alta performance',
        'Criação de APIs REST e GraphQL para aplicações mobile',
        'Otimização de performance e SEO resultando em 40% mais conversões',
        'Colaboração com equipes de design e produto em metodologias ágeis'
      ],
      technologies: ['Vue.js', 'Express', 'MongoDB', 'React Native']
    },
    {
      id: 3,
      title: 'Frontend Developer',
      company: 'StartupXYZ',
      location: 'Belo Horizonte, MG',
      period: '2019 - 2020',
      type: 'Full-time',
      description: [
        'Desenvolvimento de interfaces responsivas e acessíveis',
        'Integração com APIs REST e implementação de estado global',
        'Testes automatizados com Jest e Cypress',
        'Participação ativa em code reviews e pair programming'
      ],
      technologies: ['React', 'Redux', 'Sass', 'Jest', 'Cypress']
    },
    {
      id: 4,
      title: 'Junior Web Developer',
      company: 'WebAgency Pro',
      location: 'Remoto',
      period: '2018 - 2019',
      type: 'Full-time',
      description: [
        'Criação de websites responsivos para diversos clientes',
        'Manutenção e otimização de sites WordPress',
        'Implementação de formulários e integrações com CRM',
        'Suporte técnico e treinamento de clientes'
      ],
      technologies: ['HTML', 'CSS', 'JavaScript', 'WordPress', 'PHP']
    }
  ];

  return (
    <section id="experience" className="py-20">
      <div className="section-padding">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
              Experiência Profissional
            </h2>
            <p className="text-dark-text-muted text-lg max-w-2xl mx-auto">
              Minha jornada profissional e crescimento na área de desenvolvimento
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 md:left-1/2 transform md:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent-blue to-accent-purple"></div>

            {/* Experience Items */}
            <div className="space-y-12">
              {experiences.map((exp, index) => (
                <div key={exp.id} className={`relative flex items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}>
                  {/* Timeline Dot */}
                  <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-r from-accent-blue to-accent-purple rounded-full border-4 border-dark-bg z-10"></div>

                  {/* Content Card */}
                  <div className={`ml-20 md:ml-0 md:w-1/2 ${
                    index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'
                  }`}>
                    <div className="bg-dark-surface border border-dark-border rounded-xl p-6 hover:border-accent-blue/50 transition-all duration-300 hover:scale-105">
                      {/* Header */}
                      <div className="mb-4">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-xl font-semibold text-dark-text">
                            {exp.title}
                          </h3>
                          <span className="px-3 py-1 bg-accent-blue/20 text-accent-blue text-xs rounded-full">
                            {exp.type}
                          </span>
                        </div>
                        
                        <h4 className="text-lg font-medium gradient-text mb-3">
                          {exp.company}
                        </h4>
                        
                        <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 text-dark-text-muted text-sm">
                          <div className="flex items-center">
                            <Calendar size={16} className="mr-2" />
                            {exp.period}
                          </div>
                          <div className="flex items-center">
                            <MapPin size={16} className="mr-2" />
                            {exp.location}
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <ul className="space-y-2 mb-4">
                        {exp.description.map((item, itemIndex) => (
                          <li key={itemIndex} className="text-dark-text-muted text-sm flex items-start">
                            <span className="w-1.5 h-1.5 bg-accent-blue rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            {item}
                          </li>
                        ))}
                      </ul>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech) => (
                          <span key={tech} className="skill-tag text-xs">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education Section */}
          <div className="mt-20 pt-16 border-t border-dark-border">
            <h3 className="text-2xl font-bold gradient-text text-center mb-12">
              Educação
            </h3>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-dark-surface border border-dark-border rounded-xl p-6 hover:border-accent-blue/50 transition-colors duration-300">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-gradient-to-r from-accent-blue to-accent-purple rounded-lg">
                    <Briefcase size={24} className="text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-dark-text mb-2">
                      Bacharelado em Ciência da Computação
                    </h4>
                    <p className="text-accent-blue font-medium mb-2">Universidade Federal de Minas Gerais</p>
                    <div className="flex items-center text-dark-text-muted text-sm mb-3">
                      <Calendar size={16} className="mr-2" />
                      2014 - 2018
                    </div>
                    <p className="text-dark-text-muted text-sm">
                      Formação sólida em algoritmos, estruturas de dados e engenharia de software.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-dark-surface border border-dark-border rounded-xl p-6 hover:border-accent-blue/50 transition-colors duration-300">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-gradient-to-r from-accent-blue to-accent-purple rounded-lg">
                    <Briefcase size={24} className="text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-dark-text mb-2">
                      Pós-graduação em Desenvolvimento Web
                    </h4>
                    <p className="text-accent-blue font-medium mb-2">PUC Minas</p>
                    <div className="flex items-center text-dark-text-muted text-sm mb-3">
                      <Calendar size={16} className="mr-2" />
                      2019 - 2020
                    </div>
                    <p className="text-dark-text-muted text-sm">
                      Especialização em tecnologias web modernas e arquitetura de aplicações.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
