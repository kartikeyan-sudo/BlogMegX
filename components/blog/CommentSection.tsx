import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useUser } from '@/hooks/useUser'
import toast from 'react-hot-toast'
import { format } from 'date-fns'

interface Comment {
  id: string
  content: string
  created_at: string
  author: {
    name: string
    image: string
  }
}

export default function CommentSection({ postId }: { postId: string }) {
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState('')
  const [loading, setLoading] = useState(false)
  const { user } = useUser()

  useEffect(() => {
    fetchComments()
  }, [postId])

  const fetchComments = async () => {
    try {
      const response = await fetch(`/api/comments?postId=${postId}`)
      const data = await response.json()
      setComments(data)
    } catch (error) {
      console.error('Error fetching comments:', error)
    }
  }

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) {
      toast.error('Please log in to comment')
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: newComment,
          postId,
        }),
      })

      if (!response.ok) throw new Error('Failed to post comment')

      const data = await response.json()
      setComments([data, ...comments])
      setNewComment('')
      toast.success('Comment posted successfully!')
    } catch (error) {
      toast.error('Failed to post comment')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold">Comments</h3>

      {user ? (
        <form onSubmit={handleSubmitComment} className="space-y-4">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
            rows={3}
            required
          />
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className={`px-6 py-2 bg-primary-600 text-white rounded-lg ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Posting...' : 'Post Comment'}
          </motion.button>
        </form>
      ) : (
        <p className="text-gray-600">
          Please <a href="/login" className="text-primary-600">log in</a> to comment.
        </p>
      )}

      <AnimatePresence>
        {comments.map((comment) => (
          <motion.div
            key={comment.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white rounded-lg shadow-sm p-4"
          >
            <div className="flex items-start space-x-4">
              <img
                src={comment.author.image || '/default-avatar.png'}
                alt={comment.author.name}
                className="w-10 h-10 rounded-full"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{comment.author.name}</h4>
                  <span className="text-sm text-gray-500">
                    {format(new Date(comment.created_at), 'MMM d, yyyy')}
                  </span>
                </div>
                <p className="mt-2 text-gray-600">{comment.content}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}