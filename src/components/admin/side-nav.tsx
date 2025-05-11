import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { UserData } from '@/lib/auth';
import { useState } from 'react';

interface SideNavProps {
  user: UserData;
}

interface MenuItem {
  name: string;
  href?: string;
  submenu?: MenuItem[];
}

export function SideNav({ user }: SideNavProps) {
  const pathname = usePathname();
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);

  const navigation: MenuItem[] = [
    { name: 'Dashboard', href: '/admin/dashboard' },
    {
      name: 'Vendas',
      submenu: [
        { name: 'Pedidos', href: '/admin/orders' },
        { name: 'Clientes', href: '/admin/customers' },
      ],
    },
    {
      name: 'Produtos',
      submenu: [
        { name: 'Produtos', href: '/admin/products' },
        { name: 'Categorias', href: '/admin/categories' },
        { name: 'Características', href: '/admin/attributes' },
      ],
    },
    { name: 'Marcas', href: '/admin/brands' },
    { name: 'Cupons', href: '/admin/coupons' },
    { name: 'Vitrines', href: '/admin/showcases' },
  ];

  const toggleMenu = (menuName: string) => {
    setExpandedMenus(current =>
      current.includes(menuName)
        ? current.filter(name => name !== menuName)
        : [...current, menuName]
    );
  };

  const renderMenuItem = (item: MenuItem) => {
    const isActive = item.href ? pathname === item.href : false;
    const hasSubmenu = item.submenu && item.submenu.length > 0;
    const isExpanded = expandedMenus.includes(item.name);

    if (hasSubmenu) {
      return (
        <div key={item.name}>
          <button
            onClick={() => toggleMenu(item.name)}
            className="w-full text-left text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md justify-between"
          >
            <span>{item.name}</span>
            <svg
              className={`h-5 w-5 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          {isExpanded && item.submenu && (
            <div className="ml-4 space-y-1">
              {item.submenu.map(subItem => (
                <Link
                  key={subItem.name}
                  href={subItem.href || '#'}
                  className={`${
                    pathname === subItem.href
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  } group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
                >
                  {subItem.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      );
    }

    return (
      <Link
        key={item.name}
        href={item.href || '#'}
        className={`${
          isActive ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
        } group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
      >
        {item.name}
      </Link>
    );
  };

  return (
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64">
        <div className="flex flex-col h-0 flex-1 bg-gray-800">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <Image
                className="h-8 w-auto"
                src="/logo-white.png"
                alt="Tout Spécial"
                width={32}
                height={32}
              />
            </div>
            <nav className="mt-5 flex-1 px-2 space-y-1">
              {navigation.map(item => renderMenuItem(item))}
            </nav>
          </div>
          <div className="flex-shrink-0 flex bg-gray-700 p-4">
            <div className="flex items-center">
              <div>
                <p className="text-sm font-medium text-white">{user.name}</p>
                <p className="text-xs font-medium text-gray-300 group-hover:text-gray-200">
                  {user.email}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
