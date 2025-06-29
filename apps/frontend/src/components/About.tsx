import React, { useState } from 'react';
import { Code, Database, Smartphone, Globe } from 'lucide-react';

const About = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {
      icon: Code,
      title: 'Frontend',
      content: 'Especialista em React, Next.js, TypeScript e Tailwind CSS. Foco em criar interfaces modernas, responsivas e acessíveis com as melhores práticas de UX/UI.'
    },
    {
      icon: Database,
      title: 'Backend',
      content: 'Desenvolvimento de APIs REST e GraphQL com Node.js, Express, PostgreSQL e MongoDB. Experiência com microserviços e arquitetura escalável.'
    },
    {
      icon: Smartphone,
      title: 'Mobile',
      content: 'Desenvolvimento mobile com React Native e Flutter. Criação de aplicativos nativos para iOS e Android com performance otimizada.'
    },
    {
      icon: Globe,
      title: 'DevOps',
      content: 'Deploy e configuração em AWS, Docker, Kubernetes. CI/CD com GitHub Actions, monitoramento e otimização de performance.'
    }
  ];

  return (
    <section id="about" className="py-20 bg-dark-surface">
      <div className="section-padding">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
              Sobre Mim
            </h2>
            <p className="text-dark-text-muted text-lg max-w-2xl mx-auto">
              Desenvolvedor Full Stack com mais de 5 anos de experiência criando soluções digitais inovadoras
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Personal Info */}
            <div className="space-y-6">
              <div className="prose prose-invert max-w-none">
                <p className="text-dark-text-muted text-lg leading-relaxed">
                  Sou um desenvolvedor apaixonado por tecnologia e inovação. Comecei minha jornada no desenvolvimento 
                  web há mais de 5 anos e desde então tenho me dedicado a criar soluções que fazem a diferença.
                </p>
                <p className="text-dark-text-muted text-lg leading-relaxed">
                  Minha experiência abrange desde o desenvolvimento frontend com React e Vue.js até a criação de 
                  APIs robustas com Node.js e Python. Também tenho experiência em desenvolvimento mobile e DevOps.
                </p>
                <p className="text-dark-text-muted text-lg leading-relaxed">
                  Quando não estou codando, gosto de contribuir para projetos open source, escrever artigos técnicos 
                  e me manter atualizado com as últimas tendências em tecnologia.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-6 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold gradient-text">50+</div>
                  <div className="text-dark-text-muted">Projetos Concluídos</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold gradient-text">5+</div>
                  <div className="text-dark-text-muted">Anos de Experiência</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold gradient-text">20+</div>
                  <div className="text-dark-text-muted">Tecnologias</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold gradient-text">100%</div>
                  <div className="text-dark-text-muted">Comprometimento</div>
                </div>
              </div>
            </div>

            {/* Right Column - Expertise Tabs */}
            <div className="space-y-6">
              {/* Tab Headers */}
              <div className="grid grid-cols-2 gap-2">
                {tabs.map((tab, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTab(index)}
                    className={`p-4 rounded-xl text-left transition-all duration-300 ${
                      activeTab === index
                        ? 'bg-gradient-to-r from-accent-blue to-accent-purple text-white'
                        : 'bg-dark-surface-light text-dark-text-muted hover:text-dark-text hover:bg-dark-border'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <tab.icon size={24} />
                      <span className="font-semibold">{tab.title}</span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="bg-dark-surface-light rounded-xl p-6 border border-dark-border min-h-[200px]">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-gradient-to-r from-accent-blue to-accent-purple rounded-lg">
                    {React.createElement(tabs[activeTab].icon, { size: 24, className: "text-white" })}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-dark-text mb-3">
                      {tabs[activeTab].title}
                    </h3>
                    <p className="text-dark-text-muted leading-relaxed">
                      {tabs[activeTab].content}
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

export default About;
