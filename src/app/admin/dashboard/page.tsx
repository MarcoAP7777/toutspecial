'use client'

import { Metadata } from 'next';
import { 
  ShoppingBagIcon, 
  CurrencyDollarIcon,
  UserGroupIcon,
  ShoppingCartIcon 
} from '@heroicons/react/24/outline'

export const metadata: Metadata = {
  title: 'Dashboard | Painel Administrativo',
  description: 'Dashboard do painel administrativo do Tout Spécial',
  robots: 'noindex, nofollow',
};

const stats = [
  {
    name: 'Total de Produtos',
    value: '248',
    icon: ShoppingBagIcon,
    change: '+12%',
    changeType: 'positive'
  },
  {
    name: 'Vendas do Mês',
    value: 'R$ 24.500',
    icon: CurrencyDollarIcon,
    change: '+25%',
    changeType: 'positive'
  },
  {
    name: 'Novos Clientes',
    value: '54',
    icon: UserGroupIcon,
    change: '+18%',
    changeType: 'positive'
  },
  {
    name: 'Pedidos Pendentes',
    value: '12',
    icon: ShoppingCartIcon,
    change: '-10%',
    changeType: 'negative'
  },
]

export default function Dashboard() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
      
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="relative overflow-hidden rounded-lg bg-white px-4 pt-5 pb-12 shadow sm:px-6 sm:pt-6"
          >
            <dt>
              <div className="absolute rounded-md bg-indigo-500 p-3">
                <stat.icon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <p className="ml-16 truncate text-sm font-medium text-gray-500">
                {stat.name}
              </p>
            </dt>
            <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
              <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
              <p
                className={`ml-2 flex items-baseline text-sm font-semibold ${
                  stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {stat.change}
              </p>
            </dd>
          </div>
        ))}
      </div>

      {/* Placeholder para gráficos e outras informações */}
      <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div className="rounded-lg bg-white shadow p-6 h-96">
          <h2 className="text-lg font-medium text-gray-900">Vendas por Período</h2>
          <div className="mt-4 h-80 flex items-center justify-center border-2 border-dashed border-gray-200 rounded-lg">
            <p className="text-gray-500">Gráfico de Vendas</p>
          </div>
        </div>

        <div className="rounded-lg bg-white shadow p-6 h-96">
          <h2 className="text-lg font-medium text-gray-900">Produtos Mais Vendidos</h2>
          <div className="mt-4 h-80 flex items-center justify-center border-2 border-dashed border-gray-200 rounded-lg">
            <p className="text-gray-500">Lista de Produtos</p>
          </div>
        </div>
      </div>
    </div>
  )
} 