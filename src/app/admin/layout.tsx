'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  HomeIcon, 
  ShoppingBagIcon, 
  TagIcon, 
  UsersIcon, 
  CogIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon
} from '@heroicons/react/24/outline'
import Image from 'next/image'

const menuItems = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: HomeIcon },
  { name: 'Produtos', href: '/admin/products', icon: ShoppingBagIcon },
  { name: 'Categorias', href: '/admin/categories', icon: TagIcon },
  { name: 'Usuários', href: '/admin/users', icon: UsersIcon },
  { name: 'Configurações', href: '/admin/settings', icon: CogIcon },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const pathname = usePathname()

  // Não renderizar o layout na página de login
  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Menu Lateral */}
      <aside
        className={`fixed top-0 left-0 h-full bg-white shadow-lg transition-all duration-300 ${
          isCollapsed ? 'w-20' : 'w-64'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-4 flex justify-between items-center border-b">
            {!isCollapsed && (
              <Image
                src="/logo.png"
                alt="Logo Tout Special"
                width={120}
                height={40}
                className="mx-auto"
              />
            )}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              {isCollapsed ? (
                <ChevronDoubleRightIcon className="h-5 w-5" />
              ) : (
                <ChevronDoubleLeftIcon className="h-5 w-5" />
              )}
            </button>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 pt-4">
            {menuItems.map((item) => {
              const isActive = pathname.startsWith(item.href)
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 ${
                    isActive ? 'bg-indigo-50 text-indigo-600' : ''
                  }`}
                >
                  <item.icon className="h-6 w-6" />
                  {!isCollapsed && (
                    <span className="ml-3">{item.name}</span>
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t">
            {!isCollapsed && (
              <p className="text-sm text-gray-500 text-center">
                Tout Special Admin v1.0
              </p>
            )}
          </div>
        </div>
      </aside>

      {/* Conteúdo Principal */}
      <main
        className={`transition-all duration-300 ${
          isCollapsed ? 'ml-20' : 'ml-64'
        }`}
      >
        <div className="p-8">{children}</div>
      </main>
    </div>
  )
} 