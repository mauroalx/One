'use client';
import React, { useState } from 'react';
import { Wrench, User2, FileText, ArrowRight } from 'lucide-react';
import SupportServiceDetailsDrawer from './SupportServiceDetailsDrawer';

interface Service {
  id: number;
  customer: string;
  serviceType: string;
  technician: string;
  status: 'Em serviço' | 'Reagendada' | 'Concluída';
  description: string;
  address: string;
  date: string;
  attachments?: string[];
  followUps?: {
    date: string; // Ex: '2024-07-11 12:29'
    note: string; // Ex: 'Cliente não se localizava em casa...'
  }[];
}

const allMockServices: Service[] = [
  {
    id: 101,
    customer: 'João Silva',
    serviceType: 'Instalação de Fibra',
    technician: 'Carlos Lima',
    status: 'Em serviço',
    description: 'Instalação nova em residência. Requer passagem por forro.',
    address: 'Rua das Palmeiras, 123, Fortaleza - CE',
    date: '2025-06-16',
    attachments: ['https://via.placeholder.com/150'],
    followUps: [
      {
        date: '2025-06-16 10:00',
        note: 'Chegada ao local, iniciando instalação.'
      },
      {
        date: '2025-06-16 12:30',
        note: 'Instalação concluída, aguardando teste de sinal.'
      }
    ]
  },
  {
    id: 106,
    customer: 'Patrícia Gomes',
    serviceType: 'Reparo de Conexão',
    technician: 'Renato Alves',
    status: 'Reagendada',
    description: 'Problemas intermitentes de conexão. Cliente solicita visita após às 14h.',
    address: 'Av. Beira Mar, 2560, Fortaleza - CE',
    date: '2025-06-17',
    attachments: ['https://via.placeholder.com/150']
  },
  {
    id: 107,
    customer: 'Diego Fernandes',
    serviceType: 'Instalação de Antena',
    technician: 'Fernanda Luz',
    status: 'Concluída',
    description: 'Instalação concluída com sucesso em cobertura. Cliente pediu relatório fotográfico.',
    address: 'Rua das Acácias, 980, Caucaia - CE',
    date: '2025-06-14',
    attachments: ['https://via.placeholder.com/150']
  },
  {
    id: 108,
    customer: 'Renata Oliveira',
    serviceType: 'Upgrade de Plano',
    technician: 'Bruno Dias',
    status: 'Em serviço',
    description: 'Cliente optou por plano de 500MB. Modem foi substituído.',
    address: 'Rua dos Navegantes, 44, Eusébio - CE',
    date: '2025-06-16',
    attachments: []
  },
  {
    id: 109,
    customer: 'Sérgio Matos',
    serviceType: 'Mudança de Ponto',
    technician: 'Carlos Lima',
    status: 'Concluída',
    description: 'Ponto principal foi transferido para sala de TV. Cabos internos reorganizados.',
    address: 'Rua das Hortênsias, 55, Maracanaú - CE',
    date: '2025-06-15',
    attachments: ['https://via.placeholder.com/150', 'https://via.placeholder.com/150']
  },
  {
    id: 110,
    customer: 'Fabiana Araújo',
    serviceType: 'Manutenção de Roteador',
    technician: 'Ana Costa',
    status: 'Reagendada',
    description: 'Equipamento com quedas de sinal. Cliente viajará e reagendou para a próxima semana.',
    address: 'Av. Santos Dumont, 1357, Fortaleza - CE',
    date: '2025-06-18',
    attachments: []
  }
];

export default function SupportServiceCardGrid() {
  const [visibleCount, setVisibleCount] = useState(3);
  const visibleServices = allMockServices.slice(0, visibleCount);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const loadMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  return (
    <>
    <div className="space-y-6 mt-6">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {visibleServices.map((service) => (
          <div
            key={service.id}
            className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-5 shadow-sm hover:shadow-md transition cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                OS #{service.id}
              </div>
              <div
                className={`text-xs px-3 py-1 rounded-full font-semibold ${
                  service.status === 'Em serviço'
                    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                    : service.status === 'Reagendada'
                    ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300'
                    : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                }`}
              >
                {service.status}
              </div>
            </div>

            <div className="space-y-2 text-sm text-gray-800 dark:text-white">
              <div className="flex items-center gap-2">
                <User2 className="w-4 h-4 text-brand-500" />
                <span className="font-semibold">{service.customer}</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-brand-500" />
                <span>{service.serviceType}</span>
              </div>
              <div className="flex items-center gap-2">
                <Wrench className="w-4 h-4 text-brand-500" />
                <span>{service.technician}</span>
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <span onClick={() => setSelectedService(service)} className="text-sm font-medium text-brand-500 group-hover:underline flex items-center gap-1">
                Ver detalhes <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </div>
        ))}
      </div>

      {visibleCount < allMockServices.length && (
        <div className="flex justify-center">
          <button
            onClick={loadMore}
            className="px-6 py-2 rounded-lg text-sm font-medium bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            Carregar mais
          </button>
        </div>
      )}
    </div>
    {selectedService && (
      <SupportServiceDetailsDrawer
        service={selectedService}
        onClose={() => setSelectedService(null)}
      />
    )}
    </>
  );
}
