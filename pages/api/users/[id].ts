import { NextApiRequest, NextApiResponse } from 'next'
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const supabase = createServerSupabaseClient({ req, res })
  const { id } = req.query

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  // Only allow users to modify their own data or admins to modify any data
  if (session.user.id !== id && session.user.user_metadata.role !== 'ADMIN') {
    return res.status(403).json({ error: 'Forbidden' })
  }

  switch (req.method) {
    case 'GET':
      try {
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .eq('id', id)
          .single()

        if (error) throw error
        return res.status(200).json(data)
      } catch (error: any) {
        return res.status(500).json({ error: error.message })
      }

    case 'PATCH':
      try {
        const updates = req.body
        const { data, error } = await supabase
          .from('users')
          .update(updates)
          .eq('id', id)
          .select()
          .single()

        if (error) throw error
        return res.status(200).json(data)
      } catch (error: any) {
        return res.status(500).json({ error: error.message })
      }

    default:
      res.setHeader('Allow', ['GET', 'PATCH'])
      return res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}