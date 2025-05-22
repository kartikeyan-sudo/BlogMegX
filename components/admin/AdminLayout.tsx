import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'
import { useUser } from '@/hooks/useUser'
import AdminSidebar from './AdminSidebar'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, isAdmin, Loading } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && (!user || !isAdmin)) {
      router.push('/login')
    }
  }, [user, isAdmin, isLoading])

  if (isLoading) return <div>Loading...</div>

  return (
    <div className="flex h-screen bg-secondary-50">
      <AdminSidebar />
      <motion.main
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex-1 overflow-y-auto p-8"
      >
        {children}
      </motion.main>
    </div>
  )
}
