
import { useState, useEffect } from 'react';
import { Menu, X, Github, Linkedin, Mail, LogIn, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '#about', label: 'Sobre' },
    { href: '#projects', label: 'Projetos' },
    { href: '#experience', label: 'Experiência' },
    { href: '#skills', label: 'Skills' },
    { href: '#contact', label: 'Contato' }
  ];

  const socialLinks = [
    { href: '#', icon: Github, label: 'GitHub' },
    { href: '#', icon: Linkedin, label: 'LinkedIn' },
    { href: '#', icon: Mail, label: 'Email' }
  ];

  const handleLoginClick = () => {
    if (isLoggedIn) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass-effect shadow-lg' : 'bg-transparent'
      }`}
    >
      <nav className="section-padding py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="text-2xl font-bold gradient-text animate-fade-in">
            {'<Dev/>'}
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <a
                key={item.href}
                href={item.href}
                className="nav-link"
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Social Links and Login - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {socialLinks.map((social, index) => (
              <a
                key={social.label}
                href={social.href}
                className="text-dark-text-muted hover:text-accent-blue transition-colors duration-300 p-2 rounded-lg hover:bg-dark-surface-light"
                style={{ animationDelay: `${(navItems.length + index) * 100}ms` }}
                aria-label={social.label}
              >
                <social.icon size={20} />
              </a>
            ))}
            
            <Button
              onClick={handleLoginClick}
              variant="outline"
              size="sm"
              className="ml-4 border-accent-blue text-accent-blue hover:bg-accent-blue hover:text-white"
            >
              {isLoggedIn ? <User size={16} /> : <LogIn size={16} />}
              <span className="ml-2">{isLoggedIn ? 'Dashboard' : 'Login'}</span>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-dark-text hover:text-accent-blue transition-colors duration-300 p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden transition-all duration-300 overflow-hidden ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="pt-4 pb-2 space-y-2">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="block py-2 px-4 nav-link rounded-lg hover:bg-dark-surface-light transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            
            {/* Mobile Social Links */}
            <div className="flex items-center justify-center space-x-4 pt-4 border-t border-dark-border">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="text-dark-text-muted hover:text-accent-blue transition-colors duration-300 p-2 rounded-lg hover:bg-dark-surface-light"
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
            
            {/* Mobile Login Button */}
            <div className="pt-4 border-t border-dark-border">
              <Button
                onClick={handleLoginClick}
                variant="outline"
                className="w-full border-accent-blue text-accent-blue hover:bg-accent-blue hover:text-white"
              >
                {isLoggedIn ? <User size={16} /> : <LogIn size={16} />}
                <span className="ml-2">{isLoggedIn ? 'Dashboard' : 'Login'}</span>
              </Button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
