export interface User {
  id: string
  email: string
  name: string | null
  image: string | null
  role: 'USER' | 'ADMIN'
  created_at: string
  updated_at: string
  is_active: boolean
}

export interface Post {
  id: string
  title: string
  content: string
  slug: string
  published: boolean
  author_id: string
  created_at: string
  updated_at: string
  author?: User
}

export interface Comment {
  id: string
  content: string
  post_id: string
  author_id: string
  created_at: string
  updated_at: string
  author?: User
  post?: Post
}