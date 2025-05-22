import { GetServerSideProps } from 'next'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { motion } from 'framer-motion'
import { format } from 'date-fns'
import CommentSection from '@/components/blog/CommentSection'

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const supabase = createServerComponentClient({ cookies: () => cookies() })
  
  const { data: post } = await supabase
    .from('posts')
    .select('*, author:users(name, image)')
    .eq('slug', params?.slug)
    .single()

  if (!post) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      post,
    },
  }
}

export default function BlogPost({ post }: { post: any }) {
  return (
    <motion.article
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto"
    >
      <header className="text-center mb-12">
        <motion.h1
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-4xl font-bold mb-4"
        >
          {post.title}
        </motion.h1>
        <div className="flex items-center justify-center space-x-4">
          <img
            src={post.author.image || '/default-avatar.png'}
            alt={post.author.name}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="font-medium">{post.author.name}</p>
            <p className="text-sm text-gray-500">
              {format(new Date(post.created_at), 'MMMM d, yyyy')}
            </p>
          </div>
        </div>
      </header>

      <motion.div
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      <hr className="my-12" />

      <CommentSection postId={post.id} />
    </motion.article>
  )
}