import { motion } from 'framer-motion'
import Link from 'next/link'
import { format } from 'date-fns'

interface BlogCardProps {
  post: {
    id: string
    title: string
    content: string
    slug: string
    createdAt: string
    author: {
      name: string
      image: string
    }
  }
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-lg shadow-md overflow-hidden"
    >
      <Link href={`/blog/${post.slug}`}>
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            {post.title}
          </h2>
          <p className="text-gray-600 line-clamp-3">
            {post.content.replace(/<[^>]*>/g, '').slice(0, 150)}...
          </p>
          <div className="mt-4 flex items-center">
            <img
              src={post.author.image || '/default-avatar.png'}
              alt={post.author.name}
              className="w-8 h-8 rounded-full"
            />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">
                {post.author.name}
              </p>
              <p className="text-sm text-gray-500">
                {format(new Date(post.createdAt), 'MMM d, yyyy')}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}