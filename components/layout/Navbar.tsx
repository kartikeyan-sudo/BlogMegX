import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useUser } from '@/hooks/useUser'
import { Disclosure } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

export default function Navbar() {
  const router = useRouter()
  const { user, isAdmin } = useUser()
  const [isScrolled, setIsScrolled] = useState(false)
  const supabase = createClientComponentClient()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  return (
    <Disclosure as="nav" className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
    }`}>
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <Link href="/">
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    className="text-2xl font-bold text-primary-600"
                  >
                    BlogMegX
                  </motion.span>
                </Link>
              </div>

              <div className="hidden sm:flex sm:items-center sm:space-x-4">
                <NavLink href="/" text="Home" />
                <NavLink href="/blog" text="Blog" />
                {user ? (
                  <>
                    <NavLink href="/dashboard" text="Dashboard" />
                    {isAdmin && <NavLink href="/admin" text="Admin" />}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleSignOut}
                      className="px-4 py-2 rounded-md text-white bg-primary-600 hover:bg-primary-700"
                    >
                      Sign Out
                    </motion.button>
                  </>
                ) : (
                  <>
                    <NavLink href="/login" text="Login" />
                    <NavLink href="/register" text="Register" />
                  </>
                )}
              </div>

              <div className="flex items-center sm:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-primary-600">
                  {open ? (
                    <XMarkIcon className="h-6 w-6" />
                  ) : (
                    <Bars3Icon className="h-6 w-6" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <MobileNavLink href="/" text="Home" />
              <MobileNavLink href="/blog" text="Blog" />
              {user ? (
                <>
                  <MobileNavLink href="/dashboard" text="Dashboard" />
                  {isAdmin && <MobileNavLink href="/admin" text="Admin" />}
                  <button
                    onClick={handleSignOut}
                    className="w-full text-left px-3 py-2 text-primary-600"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <MobileNavLink href="/login" text="Login" />
                  <MobileNavLink href="/register" text="Register" />
                </>
              )}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}

function NavLink({ href, text }: { href: string; text: string }) {
  const router = useRouter()
  const isActive = router.pathname === href

  return (
    <Link href={href}>
      <motion.span
        whileHover={{ scale: 1.05 }}
        className={`px-3 py-2 rounded-md ${
          isActive
            ? 'text-primary-600 font-medium'
            : 'text-gray-600 hover:text-primary-600'
        }`}
      >
        {text}
      </motion.span>
    </Link>
  )
}

function MobileNavLink({ href, text }: { href: string; text: string }) {
  const router = useRouter()
  const isActive = router.pathname === href

  return (
    <Disclosure.Button
      as={Link}
      href={href}
      className={`block px-3 py-2 rounded-md ${
        isActive
          ? 'text-primary-600 font-medium'
          : 'text-gray-600 hover:text-primary-600'
      }`}
    >
      {text}
    </Disclosure.Button>
  )
}
