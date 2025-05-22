import { useState, useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import AdminLayout from '@/components/admin/AdminLayout'
import { motion } from 'framer-motion'
import {
  ChartBarIcon,
  UserGroupIcon,
  DocumentTextIcon,
  ChatBubbleLeftIcon,
} from '@heroicons/react/24/outline'

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalPosts: 0,
    totalComments: 0,
    activeUsers: 0,
  })
  const [loading, setLoading] = useState(true)
  const supabase = createClientComponentClient()

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const [users, posts, comments, activeUsers] = await Promise.all([
        supabase.from('users').select('*', { count: 'exact' }),
        supabase.from('posts').select('*', { count: 'exact' }),
        supabase.from('comments').select('*', { count: 'exact' }),
        supabase.from('users').select('*', { count: 'exact' }).eq('is_active', true),
      ])

      setStats({
        totalUsers: users.count || 0,
        totalPosts: posts.count || 0,
        totalComments: comments.count || 0,
        activeUsers: activeUsers.count || 0,
      })
    } catch (error) {
      console.error('Error fetching stats:', error)
    } finally {
      setLoading(false)
    }
  }

  const statCards = [
    { title: 'Total Users', value: stats.totalUsers, icon: UserGroupIcon, color: 'blue' },
    { title: 'Total Posts', value: stats.totalPosts, icon: DocumentTextIcon, color: 'green' },
    { title: 'Total Comments', value: stats.totalComments, icon: ChatBubbleLeftIcon, color: 'yellow' },
    { title: 'Active Users', value: stats.activeUsers, icon: ChartBarIcon, color: 'purple' },
  ]

  return (
    <AdminLayout>
      <div className="space-y-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-sm p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{stat.title}</p>
                  <p className="text-3xl font-bold">
                    {loading ? '...' : stat.value}
                  </p>
                </div>
                <stat.icon className="w-12 h-12 text-primary-500" />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-lg shadow-sm p-6"
          >
            <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
            {/* Add recent activity component */}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-lg shadow-sm p-6"
          >
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            {/* Add quick actions component */}
          </motion.div>
        </div>
      </div>
    </AdminLayout>
  )
}
