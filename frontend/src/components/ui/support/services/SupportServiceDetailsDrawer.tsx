'use client';

import React from 'react';
import {
  MapPin,
  User2,
  Wrench,
  FileText,
  Calendar,
  X,
  Paperclip,
  Pencil,
  CheckCircle,
  CalendarClock,
} from 'lucide-react';

interface ServiceDetailsDrawerProps {
  service: {
    id: number;
    customer: string;
    serviceType: string;
    technician: string;
    status: string;
    description: string;
    address: string;
    date: string;
    attachments?: string[];
    followUps?: {
      date: string; // Ex: '2024-07-11 12:29'
      note: string; // Ex: 'Cliente não se localizava em casa...'
    }[];
  } | null;
  onClose: () => void;
}

const SupportServiceDetailsDrawer: React.FC<ServiceDetailsDrawerProps> = ({ service, onClose }) => {
  if (!service) return null;

  return (
    <div className="fixed inset-0 z-[9999999] flex justify-end bg-black/50 backdrop-blur-sm m-0 p-0">
      <div className="relative w-full max-w-lg h-screen bg-white dark:bg-gray-900 shadow-2xl border-l border-gray-200 dark:border-gray-700 flex flex-col">

        {/* Botão de fechar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 dark:text-gray-300 hover:text-red-500 transition"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Conteúdo */}
        <div className="px-6 pt-10 pb-6 overflow-y-auto flex-1 space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
            Ordem de Serviço #{service.id}
          </h2>

          <div className="space-y-4 text-sm text-gray-700 dark:text-gray-300">
            <div className="flex items-center gap-2">
              <User2 className="w-5 h-5 text-brand-500" />
              <span><span className="font-medium">Cliente:</span> {service.customer}</span>
            </div>

            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-brand-500" />
              <span><span className="font-medium">Serviço:</span> {service.serviceType}</span>
            </div>

            <div className="flex items-center gap-2">
              <Wrench className="w-5 h-5 text-brand-500" />
              <span><span className="font-medium">Técnico:</span> {service.technician}</span>
            </div>

            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-brand-500" />
              <span><span className="font-medium">Data:</span> {service.date}</span>
            </div>
          </div>

            {/* Status da OS */}
            <div>
            <div className="font-medium mb-1 text-gray-800 dark:text-white">Status</div>
            <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                service.status === 'completed'
                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                : service.status === 'rescheduled'
                ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
            }`}>
                {service.status === 'completed'
                ? 'Concluída'
                : service.status === 'rescheduled'
                ? 'Reagendada'
                : 'Em andamento'}
            </div>
            </div>

          {/* Endereço + Mapa */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-brand-500" />
              <span className="font-medium">Endereço:</span>
            </div>
            <p className="text-sm">{service.address}</p>
            <div className="w-full h-48 rounded-lg overflow-hidden border border-gray-300 dark:border-gray-700">
              <iframe
                title="mapa"
                className="w-full h-full"
                frameBorder={0}
                src={`https://www.google.com/maps?q=${encodeURIComponent(service.address)}&output=embed`}
                allowFullScreen
              ></iframe>
            </div>
          </div>

          {/* Descrição */}
          <div>
            <div className="font-medium mb-1 text-gray-800 dark:text-white">Descrição</div>
            <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
              {service.description}
            </p>
          </div>

            {/* Comentários (acompanhamentos) */}
            {service.followUps && service.followUps.length > 0 && (
            <div>
                <div className="font-medium mb-2 text-gray-800 dark:text-white">Comentários</div>
                <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                {service.followUps.map((item, idx) => (
                    <li key={idx} className="border-l-4 border-brand-500 pl-3">
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">{item.date}</div>
                    <div>{item.note}</div>
                    </li>
                ))}
                </ul>
            </div>
            )}


          {/* Anexos */}
          {service.attachments && service.attachments.length > 0 && (
            <div>
              <div className="font-medium mb-2 text-gray-800 dark:text-white">Anexos</div>
              <div className="flex flex-wrap gap-3">
                {service.attachments.map((url, i) => {
                  const fileName = url.split('/').pop();
                  return (
                    <a
                    key={i}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2 rounded-md border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition text-sm max-w-full truncate"
                    >
                    <Paperclip className="w-4 h-4 text-brand-500" />
                    <span className="truncate">{fileName}</span>
                    </a>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Ações */}
        <div className="border-t border-gray-200 dark:border-gray-700 p-4 flex justify-end gap-3 bg-white dark:bg-gray-900">
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg text-white bg-gray-500 hover:bg-gray-600">
            <Pencil className="w-4 h-4" /> Editar
          </button>
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg text-white bg-brand-500 hover:bg-brand-600">
            <CheckCircle className="w-4 h-4" /> Finalizar
          </button>
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg text-white bg-yellow-500 hover:bg-yellow-600">
            <CalendarClock className="w-4 h-4" /> Reagendar
          </button>
        </div>
      </div>
    </div>
  );
};

export default SupportServiceDetailsDrawer;
