'use client'

import React, { useState, useEffect } from 'react'
import { Zap, Download, Upload } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { Plan } from '@/components/finance/plans/Plans';
import { useRouter } from 'next/navigation';


interface PlansCardProps {
  plans: Plan[];
}



export default function PlansCard({ plans }: PlansCardProps) {
  const [visibleCount, setVisibleCount] = useState(3)
  const visiblePlans = plans.slice(0, visibleCount);
  const router = useRouter();

  const loadMore = () => setVisibleCount((prev) => prev + 3)

  return (
    <div className="space-y-6 mt-6">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {visiblePlans.map((plan) => (
          <div
            style={{cursor: 'pointer'}}
            onClick={() => router.push(`/finance/plans/${plan.id}`)}
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
      {visibleCount < plans.length && (
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
