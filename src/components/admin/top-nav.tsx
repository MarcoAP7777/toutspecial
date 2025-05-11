import { User } from '@/lib/auth';
import { useRouter } from 'next/navigation';

interface TopNavProps {
  user: User;
}

export function TopNav({ user }: TopNavProps) {
  const router = useRouter();

  async function handleLogout() {
    try {
      await fetch('/api/admin/auth/logout', { method: 'POST' });
      router.push('/admin/login');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  }

  return (
    <div className="relative z-10 flex-shrink-0 flex h-16 bg-white shadow">
      <div className="flex-1 px-4 flex justify-between">
        <div className="flex-1 flex"></div>
        <div className="ml-4 flex items-center md:ml-6">
          <button
            type="button"
            onClick={handleLogout}
            className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Sair
          </button>
        </div>
      </div>
    </div>
  );
}
