import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { User } from '@/lib/auth';

interface SideNavProps {
  user: User;
}

export function SideNav({ user }: SideNavProps) {
  const pathname = usePathname();

  const navigation = [
    { name: 'Dashboard', href: '/admin/dashboard' },
    { name: 'Produtos', href: '/admin/products' },
    { name: 'Categorias', href: '/admin/categories' },
    { name: 'Marcas', href: '/admin/brands' },
    { name: 'Pedidos', href: '/admin/orders' },
    { name: 'Clientes', href: '/admin/customers' },
    { name: 'Cupons', href: '/admin/coupons' },
    { name: 'Vitrines', href: '/admin/showcases' },
  ];

  return (
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64">
        <div className="flex flex-col h-0 flex-1 bg-gray-800">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <img className="h-8 w-auto" src="/logo-white.png" alt="Tout Spécial" />
            </div>
            <nav className="mt-5 flex-1 px-2 space-y-1">
              {navigation.map(item => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`${
                      isActive
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    } group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
                  >
                    {item.name}
                  </Link>
                );
              })}
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
