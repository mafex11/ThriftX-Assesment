"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuthContext } from '@/context/AuthContext'

const NavigationBar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { isAuthenticated, user, logout } = useAuthContext()

  // Animation variants

  const navItemVariants = {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: "easeOut" }
  }

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const mobileMenuVariants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
    transition: { duration: 0.2, ease: "easeInOut" }
  }

  const mobileNavItemVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.3, ease: "easeOut" }
  }

  return (
    <header 
      className="w-full bg-zinc-950 text-white"
    >
      <div className="mx-auto max-w-screen pt-4 px-4 sm:px-20 lg:px-40">
        <div className="flex h-16 items-center justify-between">
          <div 
            className="flex items-center"
          >
            <Link href="/" className="text-white tracking-[0.6em] font-semibold text-2xl">
              THRIFTX
            </Link>
          </div>

          {/* Desktop nav (no animations) */}
          <nav className="hidden md:flex items-center gap-12 text-lg">
            <Link href="/" className="text-white hover:text-gray-400 transition-colors">Home</Link>

            <Link href="/work" className="text-white hover:text-gray-400 transition-colors">Work</Link>
            
            <Link href="/about" className="text-white hover:text-gray-400 transition-colors">About</Link>
            
            <Link href="/blog" className="text-white hover:text-gray-400 transition-colors">Blogs</Link>
            
            <Link href="/contact" className="text-white hover:text-gray-400 transition-colors">Contact</Link>
            
            {isAuthenticated ? (
              <>
                <span className="text-gray-300 text-base">{user?.email}</span>
                <button
                  onClick={logout}
                  className="inline-flex items-center rounded-full bg-white px-3 py-1.5 text-black font-normal hover:text-gray-400 transition-colors justify-center"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-white hover:text-gray-400 transition-colors">Login</Link>
              </>
            )}

{process.env.NEXT_PUBLIC_CALENDLY_URL ? (
              <a
                href={process.env.NEXT_PUBLIC_CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full bg-white px-3 py-1.5 text-black font-normal hover:text-gray-400 transition-colors justify-center"
              >
                Schedule a meeting
              </a>
            ) : (
              <Link
                href="/contact"
                className="inline-flex items-center rounded-full bg-white px-3 py-1.5 text-black font-normal hover:text-gray-400 transition-colors justify-center"
              >
                Schedule a meeting
              </Link>
            )}
          </nav>

          {/* Mobile menu toggle */}
          <motion.button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
            onClick={() => setIsOpen((prev) => !prev)}
            className="md:hidden inline-flex h-8 w-8 items-center justify-center rounded-sm"
            variants={navItemVariants}
            initial="initial"
            animate="animate"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.svg 
                  key="close"
                  className="h-8 w-8 text-white" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </motion.svg>
              ) : (
                <motion.svg 
                  key="menu"
                  className="h-8 w-8 text-white" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </motion.svg>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Mobile full-screen menu overlay (slides in) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[9999] md:hidden bg-black"
            aria-hidden={!isOpen}
            style={{ zIndex: 9999 }}
            variants={mobileMenuVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <div className="mx-auto max-w-screen px-4 sm:px-20 lg:px-30 pt-4">
              <motion.div 
                className="flex h-16 items-center justify-between"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <Link href="#" className="text-white tracking-[0.6em] font-semibold text-2xl">
                  THRIFTX
                </Link>
                <motion.button
                  type="button"
                  aria-label="Close menu"
                  onClick={() => setIsOpen(false)}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-sm"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </motion.button>
              </motion.div>

              <motion.nav 
                className="mt-8 flex flex-col items-end gap-6 pr-2 text-xl font-normal"
                variants={staggerContainer}
                initial="initial"
                animate="animate"
              >
                <motion.div variants={mobileNavItemVariants}>
                  <Link href="/" className="text-white hover:text-gray-400 transition-colors" onClick={() => setIsOpen(false)}>Home</Link>
                </motion.div>
                <motion.div variants={mobileNavItemVariants}>
                  <Link href="/work" className="text-white hover:text-gray-400 transition-colors" onClick={() => setIsOpen(false)}>Work</Link>
                </motion.div>
                <motion.div variants={mobileNavItemVariants}>
                  <Link href="/about" className="text-white hover:text-gray-400 transition-colors" onClick={() => setIsOpen(false)}>About</Link>
                </motion.div>
                <motion.div variants={mobileNavItemVariants}>
                  <Link href="/blog" className="text-white hover:text-gray-400 transition-colors" onClick={() => setIsOpen(false)}>Blogs</Link>
                </motion.div>
                <motion.div variants={mobileNavItemVariants}>
                  <Link href="/contact" className="text-white hover:text-gray-400 transition-colors" onClick={() => setIsOpen(false)}>Contact</Link>
                </motion.div>
                <motion.div 
                  variants={mobileNavItemVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                 
                </motion.div>
                {isAuthenticated ? (
                  <>
                    <motion.span 
                      className="text-gray-300 text-base"
                      variants={mobileNavItemVariants}
                    >
                      {user?.email}
                    </motion.span>
                    <motion.button
                      onClick={() => { logout(); setIsOpen(false); }}
                      className="inline-flex items-center rounded-full bg-white px-3 py-1.5 text-black font-normal hover:text-gray-400 transition-colors justify-center"
                      variants={mobileNavItemVariants}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Logout
                    </motion.button>
                  </>
                ) : (
                  <>
                    <motion.div variants={mobileNavItemVariants}>
                      <Link href="/login" className="text-white hover:text-gray-400 transition-colors" onClick={() => setIsOpen(false)}>Login</Link>
                    </motion.div>
                  </>
                )}
                 {process.env.NEXT_PUBLIC_CALENDLY_URL ? (
                    <a 
                      href={process.env.NEXT_PUBLIC_CALENDLY_URL}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center rounded-full bg-white px-3 py-1.5 text-black font-normal hover:text-gray-400 transition-colors justify-center"
                      onClick={() => setIsOpen(false)}
                    >
                      Schedule a meeting
                    </a>
                  ) : (
                    <Link 
                      href="/contact" 
                      className="inline-flex items-center rounded-full bg-white px-3 py-1.5 text-black font-normal hover:text-gray-400 transition-colors justify-center" 
                      onClick={() => setIsOpen(false)}
                    >
                      Schedule a meeting
                    </Link>
                  )}
              </motion.nav>
              
            </div>
            
          </motion.div>
          
        )}
      </AnimatePresence>
    </header>
  )
}

export default NavigationBar