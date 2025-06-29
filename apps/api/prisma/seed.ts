import { PrismaClient, ProjectStatus, LeadStatus  } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();


async function main() {
  console.log('Iniciando seed do banco de dados...');
  const hashedPassword = await bcrypt.hash('123456', 12);
  
  const user = await prisma.user.upsert({
    where: { email: 'adilsonsoares2k@gmail.com' },
    update: {},
    create: {
      email: 'adilsonsoares2k@gmail.com',
      name: 'Dev Adilson Soares',
      password: hashedPassword,
      bio: 'Desenvolvedor Full Stack apaixonado por tecnologia e inovação. Especializado em React, Node.js e TypeScript.',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
      linkedin: 'https://linkedin.com/in/joao-dev',
      github: 'https://github.com/joao-dev',
      website: 'https://adilsondev.com',
      phone: '+244 922 803 563',
      location: 'Luanda, Angola',
      skills: [
        'JavaScript',
        'TypeScript',
        'React',
        'Node.js',
        'NestJS',
        'PostgreSQL',
        'MongoDB',
        'Flutter',
        'Git',
        'CSS/SCSS',
        'HTML5',
        'Next.js',
        'Prisma',
        'REST APIs',
      ],
    },
  });

  console.log('Usuário criado:', user);

  const projects = [
    {
      title: 'E-commerce Full Stack',
      description: 'Plataforma completa de e-commerce com painel administrativo',
      longDescription: 'Sistema completo de e-commerce desenvolvido com React, Node.js e PostgreSQL. Inclui carrinho de compras, pagamentos integrados, gestão de produtos e painel administrativo completo.',
      imageUrl: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe', 'Docker'],
      githubUrl: 'https://github.com/joao-dev/ecommerce-fullstack',
      liveUrl: 'https://ecommerce-demo.com',
      featured: true,
      status: ProjectStatus.COMPLETED,
      startDate: new Date('2024-01-15'),
      endDate: new Date('2024-03-20'),
    },
    {
      title: 'Agenda Cultural de Luanda',
      description: 'Aplicação web e mobile para gerenciamento de eventos e produtividade',
      longDescription: 'Aplicação web mobile desenvolvido com React e vite + capacitor para gestão de eventos, com sincronização em tempo real e trabalho offline.',
      imageUrl: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800',
      technologies: ['React e vite', 'Capacitor', 'Javascript', 'Supabase'],
      githubUrl: 'https://github.com/adilson-dev/event-hub-app',
      liveUrl: 'https://luandacultural.netlify.app/',
      featured: true,
      status: ProjectStatus.COMPLETED,
      startDate: new Date('2025-03-01'),
      endDate: new Date('2024-06-10'),
    },
    {
      title: 'Sistema de Blog CMS',
      description: 'CMS personalizado para blogs com editor rico e SEO otimizado',
      longDescription: 'Sistema de gerenciamento de conteúdo desenvolvido com Next.js e Prisma, com editor rich text, otimização SEO e painel administrativo.',
      imageUrl: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800',
      technologies: ['Next.js', 'Prisma', 'TailwindCSS', 'Vercel'],
      githubUrl: 'https://github.com/adilson-dev/blog-cms',
      liveUrl: 'https://blog-cms-demo.vercel.app',
      featured: false,
      status: ProjectStatus.COMPLETED,
      startDate: new Date('2024-06-01'),
      endDate: new Date('2024-07-10'),
    },
    {
      title: 'Dashboard Analytics',
      description: 'Dashboard interativo para visualização de dados e métricas',
      longDescription: 'Dashboard desenvolvido com React e Chart.js para visualização de dados complexos, com filtros avançados e exportação de relatórios.',
      imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
      technologies: ['React', 'Chart.js', 'Material-UI', 'REST API'],
      githubUrl: 'https://github.com/adilson-dev/analytics-dashboard',
      liveUrl: 'https://analytics-demo.netlify.app',
      featured: true,
      status: ProjectStatus.COMPLETED,
      startDate: new Date('2024-08-01'),
      endDate: new Date('2024-09-15'),
    },
    {
      title: 'API de Autenticação',
      description: 'Microserviço de autenticação com JWT e OAuth',
      longDescription: 'Microserviço robusto de autenticação desenvolvido com NestJS, suportando JWT, OAuth2 e autenticação de dois fatores.',
      imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800',
      technologies: ['NestJS', 'JWT', 'OAuth2', 'Redis', 'Docker'],
      githubUrl: 'https://github.com/adilson-dev/auth-microservice',
      featured: false,
      status: ProjectStatus.IN_PROGRESS,
      startDate: new Date('2024-10-01'),
    },
  ];

  for (const projectData of projects) {
    const project = await prisma.project.create({
      data: {
        ...projectData,
        user: {
            connect: { id: user.id }
          },
      },
    });
    console.log('Projeto criado:', project.title);
  }

  const leads = [
    {
      name: 'Maria Silva',
      email: 'maria@empresa.com',
      subject: 'Desenvolvimento de Website',
      message: 'Olá, gostaria de saber mais sobre desenvolvimento de websites para minha empresa.',
      phone: '+244 900 111 222',
      company: 'Empresa XYZ',
      status: LeadStatus.NEW,
    },
    {
      name: 'Pedro Santos',
      email: 'pedro@startup.com',
      subject: 'Aplicativo Mobile',
      message: 'Preciso desenvolver um aplicativo mobile para minha startup. Podemos conversar?',
      phone: '+244 900 333 444',
      company: 'Startup ABC',
      status: LeadStatus.CONTACTED,
    },
    {
      name: 'Ana Costa',
      email: 'ana@consultoria.com',
      subject: 'Consultoria Técnica',
      message: 'Gostaria de contratar consultoria técnica para revisão de arquitetura.',
      company: 'Consultoria Tech',
      status: LeadStatus.IN_PROGRESS,
    },
  ];

  for (const leadData of leads) {
    const lead = await prisma.lead.create({
      data: leadData,
    });
    console.log('Lead criado:', lead.name);
  }

  console.log('Seed concluído com sucesso!');
}

main()
  .catch((e) => {
    console.error('Erro durante o seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });