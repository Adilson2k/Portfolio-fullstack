
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Mail, Phone, Calendar, Eye } from 'lucide-react';

const LeadsManager = () => {
  const [leads] = useState([
    {
      id: 1,
      name: 'João Silva',
      email: 'joao@empresa.com',
      phone: '+55 11 99999-9999',
      company: 'Tech Solutions',
      status: 'Novo',
      interest: 'Website Corporativo',
      budget: 'R$ 15.000 - R$ 25.000',
      createdAt: '2024-01-15',
      lastContact: '2024-01-16'
    },
    {
      id: 2,
      name: 'Maria Santos',
      email: 'maria@startup.com',
      phone: '+55 11 88888-8888',
      company: 'StartupXYZ',
      status: 'Em Contato',
      interest: 'Aplicativo Mobile',
      budget: 'R$ 30.000 - R$ 50.000',
      createdAt: '2024-01-10',
      lastContact: '2024-01-18'
    },
    {
      id: 3,
      name: 'Carlos Oliveira',
      email: 'carlos@loja.com',
      phone: '+55 11 77777-7777',
      company: 'E-commerce Plus',
      status: 'Proposta Enviada',
      interest: 'E-commerce Completo',
      budget: 'R$ 40.000+',
      createdAt: '2024-01-05',
      lastContact: '2024-01-17'
    }
  ]);

  const getStatusColor = (status: string) => {
    const colors = {
      'Novo': 'bg-blue-500',
      'Em Contato': 'bg-yellow-500',
      'Proposta Enviada': 'bg-purple-500',
      'Fechado': 'bg-green-500',
      'Perdido': 'bg-red-500'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-500';
  };

  return (
    <div className="space-y-4">
      {leads.map((lead) => (
        <Card key={lead.id} className="bg-dark-surface border-dark-border">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-dark-text">{lead.name}</CardTitle>
                <CardDescription className="text-dark-text-muted">
                  {lead.company} • {lead.interest}
                </CardDescription>
              </div>
              <Badge className={`${getStatusColor(lead.status)} text-white`}>
                {lead.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Informações de Contato */}
              <div className="space-y-2">
                <h4 className="font-medium text-dark-text">Contato</h4>
                <div className="space-y-1 text-sm text-dark-text-muted">
                  <div className="flex items-center space-x-2">
                    <Mail size={14} />
                    <span>{lead.email}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone size={14} />
                    <span>{lead.phone}</span>
                  </div>
                </div>
              </div>

              {/* Detalhes do Projeto */}
              <div className="space-y-2">
                <h4 className="font-medium text-dark-text">Projeto</h4>
                <div className="space-y-1 text-sm text-dark-text-muted">
                  <p><strong>Orçamento:</strong> {lead.budget}</p>
                  <p><strong>Interesse:</strong> {lead.interest}</p>
                </div>
              </div>

              {/* Datas */}
              <div className="space-y-2">
                <h4 className="font-medium text-dark-text">Timeline</h4>
                <div className="space-y-1 text-sm text-dark-text-muted">
                  <div className="flex items-center space-x-2">
                    <Calendar size={14} />
                    <span>Criado: {new Date(lead.createdAt).toLocaleDateString('pt-BR')}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar size={14} />
                    <span>Último contato: {new Date(lead.lastContact).toLocaleDateString('pt-BR')}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Ações */}
            <div className="flex justify-end space-x-2 mt-4 pt-4 border-t border-dark-border">
              <Button size="sm" variant="outline" className="border-dark-border text-dark-text">
                <Eye size={14} />
                <span className="ml-2">Ver Detalhes</span>
              </Button>
              <Button size="sm" variant="outline" className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white">
                <Mail size={14} />
                <span className="ml-2">Entrar em Contato</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default LeadsManager;
