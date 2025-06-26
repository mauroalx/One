'use client'

import React, { useState, useEffect } from 'react'
import { Zap, Download, Upload } from 'lucide-react'

interface Plan {
  id: number
  name: string
  description?: string
  price: number
  download_speed: number
  upload_speed: number
  status: string
}

const mockPlans: Plan[] = [
  {
    id: 1,
    name: 'Fibra 200MB',
    description: 'Ideal para casas pequenas. Inclui modem grátis.',
    price: 79.9,
    download_speed: 200,
    upload_speed: 100,
    status: 'active',
  },
  {
    id: 2,
    name: 'Fibra 400MB',
    description: 'Perfeito para streamings e trabalho remoto.',
    price: 99.9,
    download_speed: 400,
    upload_speed: 200,
    status: 'active',
  },
  {
    id: 3,
    name: 'Fibra 600MB',
    description: 'Alta performance para múltiplos dispositivos.',
    price: 129.9,
    download_speed: 600,
    upload_speed: 300,
    status: 'inactive',
  },
  {
    id: 4,
    name: 'Fibra 1GB',
    description: 'Plano ultra veloz para gamers e empresas.',
    price: 199.9,
    download_speed: 1000,
    upload_speed: 500,
    status: 'active',
  },
]

export default function PlansCard() {
  const [visibleCount, setVisibleCount] = useState(3)
  const visiblePlans = mockPlans.slice(0, visibleCount)

  const loadMore = () => setVisibleCount((prev) => prev + 3)

  return (
    <div className="space-y-6 mt-6">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {visiblePlans.map((plan) => (
          <div
            key={plan.id}
            className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-6 shadow-sm hover:shadow-md transition"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-brand-500 font-semibold text-sm flex items-center gap-1">
                <Zap className="w-4 h-4" />
                {plan.name}
              </span>
              <span
                className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                  plan.status === 'active'
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                    : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                }`}
              >
                {plan.status === 'active' ? 'Ativo' : 'Inativo'}
              </span>
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">
              {plan.description || 'Sem descrição.'}
            </p>
            <div className="flex items-center gap-4 text-sm text-gray-700 dark:text-gray-200 mb-4">
              <div className="flex items-center gap-1">
                <Download className="w-4 h-4 text-brand-500" />
                {plan.download_speed}Mbps
              </div>
              <div className="flex items-center gap-1">
                <Upload className="w-4 h-4 text-brand-500" />
                {plan.upload_speed}Mbps
              </div>
            </div>
            <div className="text-lg font-bold text-gray-900 dark:text-white">
              R$ {plan.price.toFixed(2).replace('.', ',')}
              <span className="text-sm font-normal text-gray-500 dark:text-gray-400"> /mês</span>
            </div>
          </div>
        ))}
      </div>
      {visibleCount < mockPlans.length && (
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
  )
}
