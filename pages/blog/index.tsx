import { useState } from 'react'
import { GetServerSideProps } from 'next'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { motion } from 'framer-motion'
import BlogCard from '@/components/blog/BlogCard'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const supabase = createServerComponentClient({ cookies: () => cookies() })
  
  const { data: posts } = await supabase
    .from('posts')
    .select('*, author:users(name, image)')
    .eq('published', true)
    .order('created_at', { ascending: false })

  return {
    props: {
      initialPosts: posts || [],
    },
  }
}

export default function BlogList({ initialPosts }: { initialPosts: any[] }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [category, setCategory] = useState('all')

  const filteredPosts = initialPosts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = category === 'all' || post.category === category
    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-64 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
          />
        </div>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
        >
          <option value="all">All Categories</option>
          <option value="technology">Technology</option>
          <option value="lifestyle">Lifestyle</option>
          <option value="travel">Travel</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <BlogCard post={post} />
          </motion.div>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600">No posts found.</p>
        </div>
      )}
    </div>
  )
}
