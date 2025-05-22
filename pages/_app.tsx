import type { AppProps } from 'next/app'
import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { useState } from 'react'
import MainLayout from '@/components/layout/MainLayout'
import '@/styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  const [supabaseClient] = useState(() => createPagesBrowserClient())

  return (
    <SessionContextProvider supabaseClient={supabaseClient}>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </SessionContextProvider>
  )
}