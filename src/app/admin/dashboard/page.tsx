'use client';

import {
  ShoppingBagIcon,
  UsersIcon,
  CurrencyDollarIcon,
  ShoppingCartIcon,
} from '@heroicons/react/24/outline';
import { ComponentType } from 'react';

interface DashboardCardProps {
  title: string;
  value: string;
  icon: ComponentType<{ className?: string }>;
  change: string;
}

export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard
          title="Total de Vendas"
          value="R$ 25.430,00"
          icon={CurrencyDollarIcon}
          change="+12%"
        />
        <DashboardCard title="Pedidos" value="156" icon={ShoppingCartIcon} change="+8%" />
        <DashboardCard title="Produtos" value="432" icon={ShoppingBagIcon} change="+5%" />
        <DashboardCard title="Clientes" value="1.245" icon={UsersIcon} change="+15%" />
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
  );
}

function DashboardCard({ title, value, icon: Icon, change }: DashboardCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <h2 className="text-2xl font-bold mt-2">{value}</h2>
          <p className="text-green-500 text-sm mt-2">{change}</p>
        </div>
        <Icon className="h-12 w-12 text-indigo-500" />
      </div>
    </div>
  );
}
