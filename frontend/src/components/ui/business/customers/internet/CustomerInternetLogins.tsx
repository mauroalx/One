'use client';

import { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { CustomerInternetLoginCreate } from './CustomerInternetLoginCreate';

type CustomerServiceStatus = 'active' | 'suspended' | 'canceled';

type ServiceItem = {
  id: number;
  login_pppoe: string;
  created_at: string;
  status: CustomerServiceStatus;
  contract_id?: string;
};

export const CustomerInternetLogins: React.FC = () => {
  const { id } = useParams();
  const { token } = useAuth();
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [showCreate, setShowCreate] = useState(false); // novo estado
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false); // 👈 novo estado

  useEffect(() => {
    if (id) {
      fetchServices();
    }
  }, [id, token]);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/v1/customer/${id}/services`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!res.ok) throw new Error('Erro ao buscar serviços');
      const data = await res.json();
      setServices(data);
    } catch (err) {
      console.error('Erro ao carregar serviços do cliente:', err);
    } finally {
      setLoading(false);
    }
  };

  // if (creating) {
  //   return (
  //     <CustomerInternetLoginCreate
  //       onCancel={() => setCreating(false)}
  //       onSubmit={(data) => {
  //         console.log('Enviar dados ao backend:', data);
  //         // aqui vamos implementar a criação depois
  //       }}
  //     />
  //   );
  // }

return showCreate ? (
  <CustomerInternetLoginCreate
    onCancel={() => setShowCreate(false)}
    onSuccess={() => {
      setShowCreate(false);
      // Refaz a busca dos serviços após criação
      fetchServices();
    }}
  />
) : (
  <div className="space-y-6">
    <div className="flex justify-start items-center">
      <button
        onClick={() => setShowCreate(true)}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-500 text-white text-sm font-medium hover:bg-brand-600 transition"
      >
        <Plus className="w-4 h-4" /> Novo serviço
      </button>
    </div>

    {loading ? (
      <div className="text-sm text-gray-500 dark:text-gray-300">Carregando serviços...</div>
    ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {services.map((login) => (
          <div
            key={login.id}
            className="group p-5 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm hover:shadow-lg transition cursor-pointer flex flex-col justify-between"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-brand-500 flex items-center justify-center text-white font-semibold text-lg">
                {login.login_pppoe.charAt(0).toUpperCase()}
              </div>
              <div>
                <div className="text-lg font-semibold text-gray-800 dark:text-white truncate">
                  {login.login_pppoe}
                </div>
              </div>
            </div>

            <div className="flex justify-between items-end">
              <div className="space-y-1">
                <div className="text-xs text-gray-400">Cadastro</div>
                <div className="text-sm text-gray-800 dark:text-white">
                  {new Date(login.created_at).toLocaleDateString()}
                </div>
              </div>

              <div
                className={`text-xs px-3 py-1 rounded-full font-semibold ${
                  login.status === 'active'
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                    : login.status === 'suspended'
                    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                    : 'bg-red-100 text-red-800 dark:text-red-300 dark:bg-red-900'
                }`}
              >
                {login.status === 'active'
                  ? 'Ativo'
                  : login.status === 'suspended'
                  ? 'Suspenso'
                  : 'Cancelado'}
              </div>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);
};
