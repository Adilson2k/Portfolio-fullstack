
import { useState, useEffect } from 'react';
import { ArrowDown } from 'lucide-react';

const Hero = () => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const titles = [
    'Desenvolvedor Full Stack',
    'Especialista em React',
    'Backend Developer',
    'Mobile Developer'
  ];

  useEffect(() => {
    const currentTitle = titles[currentIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentTitle.length) {
          setDisplayText(currentTitle.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(currentTitle.slice(0, displayText.length - 1));
        } else {
          setIsDeleting(false);
          setCurrentIndex((prevIndex) => (prevIndex + 1) % titles.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [displayText, currentIndex, isDeleting, titles]);

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background animated elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent-blue/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-purple/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-accent-blue/10 to-accent-purple/10 rounded-full blur-2xl"></div>
      </div>

      <div className="section-padding text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Greeting */}
          <p className="text-accent-blue text-lg md:text-xl mb-4 animate-fade-in">
            Olá, eu sou
          </p>
          
          {/* Name */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-dark-text mb-6 animate-fade-in-left">
            Adilson Soares
          </h1>
          
          {/* Animated Title */}
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-semibold gradient-text mb-8 h-16 md:h-20 flex items-center justify-center animate-fade-in-right">
            {displayText}
            <span className="animate-pulse">|</span>
          </h2>
          
          {/* Description */}
          <p className="text-dark-text-muted text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-12 animate-fade-in">
            Desenvolvedor Full Stack apaixonado por criar experiências digitais excepcionais. 
            Especializado em React, Node.js e tecnologias modernas de desenvolvimento web e mobile.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 animate-scale-in">
            <a
              href="#projects"
              className="px-8 py-4 bg-gradient-to-r from-accent-blue to-accent-purple text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-accent-blue/25 transition-all duration-300 hover:scale-105"
            >
              Ver Projetos
            </a>
            <a
              href="#contact"
              className="px-8 py-4 border border-accent-blue text-accent-blue font-semibold rounded-xl hover:bg-accent-blue hover:text-white transition-all duration-300 hover:scale-105"
            >
              Entre em Contato
            </a>
          </div>
          
          {/* Scroll Indicator */}
          <div className="animate-bounce">
            <a
              href="#about"
              className="inline-flex flex-col items-center text-dark-text-muted hover:text-accent-blue transition-colors duration-300"
            >
              <span className="text-sm mb-2">Role para baixo</span>
              <ArrowDown size={24} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
