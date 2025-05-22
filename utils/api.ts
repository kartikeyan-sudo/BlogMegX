import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export async function getUserProfile(userId: string) {
  const supabase = createClientComponentClient()
  
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single()

  if (error) throw error
  return data
}

export async function updateUserProfile(userId: string, updates: any) {
  const supabase = createClientComponentClient()
  
  const { data, error } = await supabase
    .from('users')
    .update(updates)
    .eq('id', userId)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function createPost(postData: any) {
  const supabase = createClientComponentClient()
  
  const { data, error } = await supabase
    .from('posts')
    .insert([postData])
    .select()
    .single()

  if (error) throw error
  return data
}

export async function updatePost(postId: string, updates: any) {
  const supabase = createClientComponentClient()
  
  const { data, error } = await supabase
    .from('posts')
    .update(updates)
    .eq('id', postId)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function deletePost(postId: string) {
  const supabase = createClientComponentClient()
  
  const { error } = await supabase
    .from('posts')
    .delete()
    .eq('id', postId)

  if (error) throw error
  return true
}