
import { Heart, ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { href: '#about', label: 'Sobre' },
    { href: '#projects', label: 'Projetos' },
    { href: '#experience', label: 'Experiência' },
    { href: '#skills', label: 'Skills' },
    { href: '#contact', label: 'Contato' }
  ];

  return (
    <footer className="relative bg-dark-bg border-t border-dark-border">
      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-3 bg-gradient-to-r from-accent-blue to-accent-purple text-white rounded-full hover:shadow-lg hover:shadow-accent-blue/25 transition-all duration-300 hover:scale-110"
        aria-label="Voltar ao topo"
      >
        <ArrowUp size={20} />
      </button>

      <div className="section-padding py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 items-center">
            {/* Logo and Description */}
            <div className="text-center md:text-left">
              <div className="text-2xl font-bold gradient-text mb-4">
                {'<Dev/>'}
              </div>
              <p className="text-dark-text-muted text-sm max-w-xs mx-auto md:mx-0">
                Desenvolvedor Full Stack apaixonado por criar experiências digitais excepcionais.
              </p>
            </div>

            {/* Quick Links */}
            <div className="text-center">
              <h3 className="text-dark-text font-semibold mb-4">Links Rápidos</h3>
              <div className="flex flex-wrap justify-center gap-4">
                {quickLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-dark-text-muted hover:text-accent-blue transition-colors duration-300 text-sm"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Contact Info */}
            <div className="text-center md:text-right">
              <h3 className="text-dark-text font-semibold mb-4">Contato</h3>
              <div className="space-y-2 text-sm text-dark-text-muted">
                <p>joao.silva@email.com</p>
                <p>+55 (11) 99999-9999</p>
                <p>São Paulo, SP - Brasil</p>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-dark-border my-8"></div>

          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-dark-text-muted">
            <div className="flex items-center mb-4 md:mb-0">
              <span>© {currentYear} João Silva. Feito com</span>
              <Heart size={16} className="mx-2 text-red-500 animate-pulse" />
              <span>e muito café ☕</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <span>Desenvolvido com React + TypeScript</span>
            </div>
          </div>
        </div>
      </div>

      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-accent-blue/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-accent-purple/5 rounded-full blur-3xl"></div>
      </div>
    </footer>
  );
};

export default Footer;
