
import { useState } from 'react';
import { Mail, MapPin, Smartphone, Send, Github, Linkedin } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Aqui você integraria com sua API
    console.log('Form submitted:', formData);
    
    // Simular envio
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Mensagem enviada com sucesso!');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 2000);
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'joao.silva@email.com',
      href: 'mailto:joao.silva@email.com'
    },
    {
      icon: Smartphone,
      label: 'Telefone',
      value: '+55 (11) 99999-9999',
      href: 'tel:+5511999999999'
    },
    {
      icon: MapPin,
      label: 'Localização',
      value: 'São Paulo, SP - Brasil',
      href: '#'
    }
  ];

  const socialLinks = [
    {
      icon: Github,
      label: 'GitHub',
      href: 'https://github.com',
      username: '@joaosilva'
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      href: 'https://linkedin.com',
      username: '/in/joaosilva'
    },
    {
      icon: Mail,
      label: 'Email',
      href: 'mailto:joao.silva@email.com',
      username: 'joao.silva@email.com'
    }
  ];

  return (
    <section id="contact" className="py-20 bg-dark-surface">
      <div className="section-padding">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
              Entre em Contato
            </h2>
            <p className="text-dark-text-muted text-lg max-w-2xl mx-auto">
              Vamos conversar sobre seu próximo projeto ou oportunidade de colaboração
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold text-dark-text mb-4">
                  Envie uma Mensagem
                </h3>
                <p className="text-dark-text-muted mb-8">
                  Preencha o formulário abaixo e entrarei em contato o mais breve possível.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-dark-text font-medium mb-2">
                      Nome *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-dark-surface-light border border-dark-border rounded-lg text-dark-text placeholder-dark-text-muted focus:outline-none focus:border-accent-blue focus:ring-1 focus:ring-accent-blue transition-colors duration-300"
                      placeholder="Seu nome completo"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-dark-text font-medium mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-dark-surface-light border border-dark-border rounded-lg text-dark-text placeholder-dark-text-muted focus:outline-none focus:border-accent-blue focus:ring-1 focus:ring-accent-blue transition-colors duration-300"
                      placeholder="seu@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-dark-text font-medium mb-2">
                    Assunto *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-dark-surface-light border border-dark-border rounded-lg text-dark-text placeholder-dark-text-muted focus:outline-none focus:border-accent-blue focus:ring-1 focus:ring-accent-blue transition-colors duration-300"
                    placeholder="Sobre o que você gostaria de falar?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-dark-text font-medium mb-2">
                    Mensagem *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-dark-surface-light border border-dark-border rounded-lg text-dark-text placeholder-dark-text-muted focus:outline-none focus:border-accent-blue focus:ring-1 focus:ring-accent-blue transition-colors duration-300 resize-vertical"
                    placeholder="Conte-me mais sobre seu projeto ou como posso ajudar..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-accent-blue to-accent-purple text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-accent-blue/25 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send size={20} className="mr-2" />
                      Enviar Mensagem
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold text-dark-text mb-4">
                  Informações de Contato
                </h3>
                <p className="text-dark-text-muted mb-8">
                  Você também pode entrar em contato através dos canais abaixo.
                </p>
              </div>

              {/* Contact Methods */}
              <div className="space-y-4">
                {contactInfo.map((info) => (
                  <a
                    key={info.label}
                    href={info.href}
                    className="flex items-center p-4 bg-dark-surface-light border border-dark-border rounded-lg hover:border-accent-blue/50 transition-all duration-300 hover:scale-105 group"
                  >
                    <div className="p-3 bg-gradient-to-r from-accent-blue to-accent-purple rounded-lg mr-4 group-hover:shadow-lg group-hover:shadow-accent-blue/25 transition-all duration-300">
                      <info.icon size={24} className="text-white" />
                    </div>
                    <div>
                      <p className="text-dark-text font-medium">{info.label}</p>
                      <p className="text-dark-text-muted">{info.value}</p>
                    </div>
                  </a>
                ))}
              </div>

              {/* Social Links */}
              <div className="pt-8">
                <h4 className="text-lg font-semibold text-dark-text mb-6">
                  Conecte-se Comigo
                </h4>
                <div className="space-y-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center p-4 bg-dark-surface-light border border-dark-border rounded-lg hover:border-accent-blue/50 transition-all duration-300 hover:scale-105 group"
                    >
                      <div className="p-3 bg-gradient-to-r from-accent-blue to-accent-purple rounded-lg mr-4 group-hover:shadow-lg group-hover:shadow-accent-blue/25 transition-all duration-300">
                        <social.icon size={20} className="text-white" />
                      </div>
                      <div>
                        <p className="text-dark-text font-medium">{social.label}</p>
                        <p className="text-dark-text-muted text-sm">{social.username}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Availability */}
              <div className="bg-dark-surface-light border border-dark-border rounded-xl p-6">
                <h4 className="text-lg font-semibold text-dark-text mb-3">
                  Disponibilidade
                </h4>
                <div className="space-y-2 text-dark-text-muted">
                  <p className="flex items-center">
                    <span className="w-3 h-3 bg-green-500 rounded-full mr-3"></span>
                    Disponível para novos projetos
                  </p>
                  <p className="text-sm ml-6">
                    Respondo em até 24 horas
                  </p>
                  <p className="text-sm ml-6">
                    Atendimento: Seg - Sex, 9h às 18h
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
