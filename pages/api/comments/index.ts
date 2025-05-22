import { NextApiRequest, NextApiResponse } from 'next'
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const supabase = createServerSupabaseClient({ req, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  switch (req.method) {
    case 'POST':
      try {
        const { content, postId } = req.body

        const { data, error } = await supabase
          .from('comments')
          .insert([
            {
              content,
              post_id: postId,
              author_id: session.user.id,
            },
          ])
          .select('*, author:users(name, image)')
          .single()

        if (error) throw error
        return res.status(201).json(data)
      } catch (error: any) {
        return res.status(500).json({ error: error.message })
      }

    default:
      res.setHeader('Allow', ['POST'])
      return res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}