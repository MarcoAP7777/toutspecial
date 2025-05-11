import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ChartPieIcon,
  DocumentChartBarIcon,
  MegaphoneIcon,
  PaintBrushIcon,
  TruckIcon,
  CreditCardIcon,
  MagnifyingGlassIcon,
  ChartBarIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline';

interface MenuItem {
  name: string;
  href: string;
  icon?: React.ElementType;
  submenu?: MenuItem[];
}

const menuItems: MenuItem[] = [
  {
    name: 'Dashboard',
    href: '/admin/dashboard',
    icon: ChartPieIcon,
  },
  {
    name: 'Relatórios',
    href: '/admin/reports',
    icon: DocumentChartBarIcon,
    submenu: [
      { name: 'Vendas', href: '/admin/reports/sales' },
      { name: 'Produtos', href: '/admin/reports/products' },
      { name: 'Visitas', href: '/admin/reports/visits' },
      { name: 'Logs', href: '/admin/reports/logs' },
    ],
  },
  {
    name: 'Marketing',
    href: '/admin/marketing',
    icon: MegaphoneIcon,
    submenu: [
      { name: 'Carrinhos Abandonados', href: '/admin/marketing/abandoned-carts' },
      { name: 'Banners', href: '/admin/marketing/banners' },
      { name: 'Cupons', href: '/admin/marketing/coupons' },
      { name: 'XML Feed', href: '/admin/marketing/xml-feed' },
      { name: 'Avaliações da Loja', href: '/admin/marketing/store-reviews' },
      { name: 'Avaliações de Produtos', href: '/admin/marketing/product-reviews' },
      { name: 'Newsletter', href: '/admin/marketing/newsletter' },
      { name: 'Programa Fidelidade', href: '/admin/marketing/loyalty' },
    ],
  },
  {
    name: 'Aparência',
    href: '/admin/appearance',
    icon: PaintBrushIcon,
    submenu: [
      { name: 'Páginas', href: '/admin/appearance/pages' },
      { name: 'Textos e Mensagens', href: '/admin/appearance/texts' },
      { name: 'Vitrines', href: '/admin/appearance/showcases' },
      { name: 'Layout', href: '/admin/appearance/layout' },
    ],
  },
  {
    name: 'Melhor Envio',
    href: '/admin/shipping',
    icon: TruckIcon,
  },
  {
    name: 'Vindi',
    href: '/admin/vindi',
    icon: CreditCardIcon,
  },
  {
    name: 'SEO',
    href: '/admin/seo',
    icon: MagnifyingGlassIcon,
    submenu: [
      { name: 'Configurações', href: '/admin/seo/settings' },
      { name: 'Redirecionamentos', href: '/admin/seo/redirects' },
    ],
  },
  {
    name: 'Google',
    href: '/admin/google',
    icon: ChartBarIcon,
  },
];

export function SidebarNav() {
  const pathname = usePathname();
  const [openMenus, setOpenMenus] = useState<string[]>([]);

  const toggleSubmenu = (menuName: string) => {
    setOpenMenus(prev =>
      prev.includes(menuName) ? prev.filter(name => name !== menuName) : [...prev, menuName]
    );
  };

  const isActive = (href: string) => pathname === href;
  const isSubmenuOpen = (menuName: string) => openMenus.includes(menuName);

  return (
    <nav className="space-y-1">
      {menuItems.map(item => (
        <div key={item.name} className="space-y-1">
          {item.submenu ? (
            <>
              <button
                onClick={() => toggleSubmenu(item.name)}
                className={`flex items-center w-full px-3 py-2 text-sm font-medium rounded-md group hover:bg-gray-50 hover:text-gray-900
                  ${isActive(item.href) ? 'bg-gray-100 text-gray-900' : 'text-gray-700'}`}
              >
                {item.icon && (
                  <item.icon
                    className={`mr-3 flex-shrink-0 h-6 w-6
                      ${isActive(item.href) ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500'}`}
                  />
                )}
                <span className="flex-1">{item.name}</span>
                <ChevronDownIcon
                  className={`ml-3 flex-shrink-0 h-5 w-5 transform transition-transform duration-150
                    ${isSubmenuOpen(item.name) ? 'rotate-180' : ''}`}
                />
              </button>
              {isSubmenuOpen(item.name) && (
                <div className="space-y-1 pl-10">
                  {item.submenu.map(subItem => (
                    <Link
                      key={subItem.href}
                      href={subItem.href}
                      className={`flex items-center px-3 py-2 text-sm font-medium rounded-md
                        ${
                          isActive(subItem.href)
                            ? 'bg-gray-100 text-gray-900'
                            : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                    >
                      {subItem.name}
                    </Link>
                  ))}
                </div>
              )}
            </>
          ) : (
            <Link
              href={item.href}
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-md group hover:bg-gray-50 hover:text-gray-900
                ${isActive(item.href) ? 'bg-gray-100 text-gray-900' : 'text-gray-700'}`}
            >
              {item.icon && (
                <item.icon
                  className={`mr-3 flex-shrink-0 h-6 w-6
                    ${isActive(item.href) ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500'}`}
                />
              )}
              {item.name}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
}
