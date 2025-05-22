import Link from 'next/link'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'
import {
  HomeIcon,
  UsersIcon,
  DocumentTextIcon,
  ChartBarIcon,
  CogIcon,
} from '@heroicons/react/24/outline'

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: HomeIcon },
  { name: 'Posts', href: '/admin/posts', icon: DocumentTextIcon },
  { name: 'Users', href: '/admin/users', icon: UsersIcon },
  { name: 'Analytics', href: '/admin/analytics', icon: ChartBarIcon },
  { name: 'Settings', href: '/admin/settings', icon: CogIcon },
]

export default function AdminSidebar() {
  const router = useRouter()

  return (
    <div className="w-64 bg-white shadow-lg">
      <div className="p-6">
        <Link href="/admin">
          <span className="text-2xl font-bold text-primary-600">BlogMegX</span>
        </Link>
      </div>
      <nav className="mt-6">
        {navigation.map((item) => {
          const isActive = router.pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center px-6 py-3 text-gray-700 hover:bg-secondary-50 ${
                isActive ? 'bg-secondary-100 border-r-4 border-primary-500' : ''
              }`}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center"
              >
                <item.icon className="w-6 h-6 mr-3" />
                {item.name}
              </motion.div>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}