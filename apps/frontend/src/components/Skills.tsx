
const Skills = () => {
  const skillCategories = [
    {
      title: 'Frontend',
      skills: [
        { name: 'React', level: 95 },
        { name: 'Next.js', level: 90 },
        { name: 'TypeScript', level: 88 },
        { name: 'Tailwind CSS', level: 92 },
        { name: 'Vue.js', level: 85 },
        { name: 'HTML/CSS', level: 95 }
      ]
    },
    {
      title: 'Backend',
      skills: [
        { name: 'Node.js', level: 90 },
        { name: 'Python', level: 85 },
        { name: 'PostgreSQL', level: 88 },
        { name: 'MongoDB', level: 82 },
        { name: 'Express', level: 90 },
        { name: 'GraphQL', level: 78 }
      ]
    },
    {
      title: 'Mobile & Tools',
      skills: [
        { name: 'React Native', level: 85 },
        { name: 'Flutter', level: 75 },
        { name: 'Docker', level: 80 },
        { name: 'AWS', level: 82 },
        { name: 'Git', level: 92 },
        { name: 'Jest', level: 85 }
      ]
    }
  ];

  return (
    <section id="skills" className="py-20 bg-dark-surface">
      <div className="section-padding">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
              Skills & Tecnologias
            </h2>
            <p className="text-dark-text-muted text-lg max-w-2xl mx-auto">
              Tecnologias e ferramentas que domino para criar soluções completas
            </p>
          </div>

          {/* Skills Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skillCategories.map((category, categoryIndex) => (
              <div key={category.title} className="space-y-6">
                <h3 className="text-xl font-semibold text-dark-text text-center pb-4 border-b border-dark-border">
                  {category.title}
                </h3>
                
                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skill.name} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-dark-text font-medium">{skill.name}</span>
                        <span className="text-accent-blue text-sm font-semibold">{skill.level}%</span>
                      </div>
                      
                      {/* Progress Bar */}
                      <div className="w-full bg-dark-surface-light rounded-full h-2 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-accent-blue to-accent-purple rounded-full transition-all duration-1000 ease-out"
                          style={{
                            width: `${skill.level}%`,
                            animationDelay: `${(categoryIndex * 6 + skillIndex) * 100}ms`
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Additional Skills Tags */}
          <div className="mt-16">
            <h3 className="text-xl font-semibold text-dark-text text-center mb-8">
              Outras Tecnologias
            </h3>
            
            <div className="flex flex-wrap justify-center gap-3">
              {[
                'Redux', 'Zustand', 'Prisma', 'Mongoose', 'Socket.io', 'WebSockets',
                'Stripe', 'PayPal', 'Firebase', 'Supabase', 'Vercel', 'Heroku',
                'GitHub Actions', 'Jenkins', 'Kubernetes', 'Nginx', 'Apache',
                'Figma', 'Adobe XD', 'Photoshop', 'Illustrator'
              ].map((tech) => (
                <span key={tech} className="skill-tag hover:scale-105 transition-transform duration-300">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div className="mt-16 text-center">
            <h3 className="text-xl font-semibold text-dark-text mb-8">
              Certificações
            </h3>
            
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {[
                { name: 'AWS Certified Developer', issuer: 'Amazon Web Services', year: '2023' },
                { name: 'React Professional', issuer: 'Meta', year: '2022' },
                { name: 'Node.js Certification', issuer: 'OpenJS Foundation', year: '2022' }
              ].map((cert) => (
                <div key={cert.name} className="bg-dark-surface-light rounded-xl p-6 border border-dark-border hover:border-accent-blue/50 transition-colors duration-300">
                  <h4 className="font-semibold text-dark-text mb-2">{cert.name}</h4>
                  <p className="text-dark-text-muted text-sm mb-1">{cert.issuer}</p>
                  <p className="text-accent-blue text-sm">{cert.year}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
