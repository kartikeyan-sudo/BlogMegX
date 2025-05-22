import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/router'
import Navbar from './Navbar'
import Footer from './Footer'
import { Toaster } from 'react-hot-toast'

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-secondary-50">
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.main
          key={router.pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="container mx-auto px-4 py-8 pt-24"
        >
          {children}
        </motion.main>
      </AnimatePresence>
      <Footer />
      <Toaster position="bottom-right" />
    </div>
  )
}