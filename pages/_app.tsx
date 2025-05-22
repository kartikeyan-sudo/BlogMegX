import type { AppProps } from 'next/app'
import { createBrowserClient, SessionContextProvider } from '@supabase/auth-helpers-nextjs'
import { useState } from 'react'
import MainLayout from '@/components/layout/MainLayout'
import '@/styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  const [supabaseClient] = useState(() => createBrowserClient())

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </SessionContextProvider>
  )
}
