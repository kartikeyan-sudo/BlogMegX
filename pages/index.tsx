import { motion } from 'framer-motion'
import Link from 'next/link'
import { GetServerSideProps } from 'next'
import { createServerComponentClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const supabase = createServerComponentClient({ cookies: () => cookies() })
  
  const { data: featuredPosts } = await supabase
    .from('posts')
    .select('*, author:users(name, image)')
    .eq('published', true)
    .order('created_at', { ascending: false })
    .limit(3)

  return {
    props: {
      featuredPosts: featuredPosts || [],
    },
  }
}

export default function Home({ featuredPosts }: { featuredPosts: any[] }) {
  return (
    <div className="space-y-16">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-6"
      >
        <h1 className="text-5xl font-bold text-gray-900">
          Welcome to{' '}
          <span className="text-primary-600">BlogMegX</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Share your thoughts, ideas, and stories with the world through our
          modern blogging platform.
        </p>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            href="/blog/new"
            className="inline-block px-8 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700"
          >
            Start Writing
          </Link>
        </motion.div>
      </motion.section>

      <section className="space-y-8">
        <h2 className="text-3xl font-bold text-center">Featured Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredPosts.map((post) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <Link href={`/blog/${post.slug}`}>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                  <p className="text-gray-600 line-clamp-3">{post.content}</p>
                  <div className="mt-4 flex items-center">
                    <img
                      src={post.author.image || '/default-avatar.png'}
                      alt={post.author.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="ml-2 text-sm text-gray-500">
                      {post.author.name}
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        <div className="text-center">
          <Link
            href="/blog"
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            View all posts →
          </Link>
        </div>
      </section>

      <section className="bg-secondary-50 py-16 rounded-lg">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-3xl font-bold">Why Choose BlogMegX?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Feature
              icon="✍️"
              title="Easy to Use"
              description="Start writing beautiful blog posts in minutes with our intuitive editor."
            />
            <Feature
              icon="🎨"
              title="Beautiful Design"
              description="Modern, responsive design that looks great on any device."
            />
            <Feature
              icon="🚀"
              title="Fast & Reliable"
              description="Built with the latest technology for optimal performance."
            />
          </div>
        </div>
      </section>
    </div>
  )
}

function Feature({ icon, title, description }: {
  icon: string
  title: string
  description: string
}) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="p-6 bg-white rounded-lg shadow-sm"
    >
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  )
}
