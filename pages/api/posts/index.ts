import { NextApiRequest, NextApiResponse } from 'next'
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const supabase = createServerSupabaseClient({ req, res })

  // Check if user is authenticated
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  switch (req.method) {
    case 'GET':
      try {
        const { data, error } = await supabase
          .from('posts')
          .select('*, author:users(name, image)')
          .eq('published', true)
          .order('created_at', { ascending: false })

        if (error) throw error
        return res.status(200).json(data)
      } catch (error: any) {
        return res.status(500).json({ error: error.message })
      }

    case 'POST':
      try {
        const { title, content, slug } = req.body

        const { data, error } = await supabase
          .from('posts')
          .insert([
            {
              title,
              content,
              slug,
              author_id: session.user.id,
            },
          ])
          .select()
          .single()

        if (error) throw error
        return res.status(201).json(data)
      } catch (error: any) {
        return res.status(500).json({ error: error.message })
      }

    default:
      res.setHeader('Allow', ['GET', 'POST'])
      return res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}