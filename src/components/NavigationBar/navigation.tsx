"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import { useAuthContext } from '@/context/AuthContext'

const NavigationBar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { isAuthenticated, user, logout } = useAuthContext()
  return (
    <header className="w-full bg-zinc-950 text-white">
      <div className="mx-auto max-w-screen pt-4 px-4 sm:px-20 lg:px-40">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="text-white tracking-[0.6em] font-semibold text-2xl">
              THRIFTX
            </Link>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-12 text-lg">
            <Link href="/" className="text-white hover:text-gray-400 transition-colors">Home</Link>

            <Link href="/work" className="text-white hover:text-gray-400 transition-colors">Work</Link>
            {/* <Link href="#about" className="text-white hover:text-gray-400 transition-colors">Expertise</Link> */}
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
                <Link
                  href="/signup"
                  className="inline-flex items-center rounded-full bg-white px-3 py-1.5 text-black font-normal hover:text-gray-400 transition-colors justify-center"
                >
                  Sign up
                </Link>
              </>
            )}
          </nav>

          {/* Mobile menu toggle */}
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
            onClick={() => setIsOpen((prev) => !prev)}
            className="md:hidden inline-flex h-8 w-8 items-center justify-center rounded-sm"
          >
            {isOpen ? (
              // X icon
              <svg className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              // Hamburger icon
              <svg className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile full-screen menu overlay (slides in) */}
      <div
        className={`fixed inset-0 z-50 md:hidden bg-black transition-opacity duration-200 ease-out ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!isOpen}
      >
        <div className="mx-auto max-w-screen px-4 sm:px-20 lg:px-30 pt-4">
          <div className="flex h-16 items-center justify-between">
            <Link href="#" className="text-white tracking-[0.6em] font-semibold text-2xl">
              THRIFTX
            </Link>
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setIsOpen(false)}
              className="inline-flex h-8 w-8 items-center justify-center rounded-sm"
            >
              <svg className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          <nav className="mt-8 flex flex-col items-end gap-6 pr-2 text-xl font-normal">
            <Link href="#work" className="text-white hover:text-gray-400 transition-colors" onClick={() => setIsOpen(false)}>Work</Link>
            <Link href="#about" className="text-white hover:text-gray-400 transition-colors" onClick={() => setIsOpen(false)}>Expertise</Link>
            <Link href="#about" className="text-white hover:text-gray-400 transition-colors" onClick={() => setIsOpen(false)}>About</Link>
            <Link href="#work" className="text-white hover:text-gray-400 transition-colors" onClick={() => setIsOpen(false)}>Latest</Link>
            <Link href="/contact" className="text-white hover:text-gray-400 transition-colors" onClick={() => setIsOpen(false)}>Contact</Link>
            {isAuthenticated ? (
              <>
                <span className="text-gray-300 text-base">{user?.email}</span>
                <button
                  onClick={() => { logout(); setIsOpen(false); }}
                  className="inline-flex items-center rounded-full text-white font-normal"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-white hover:text-gray-400 transition-colors" onClick={() => setIsOpen(false)}>Login</Link>
                <Link href="/signup" className="inline-flex items-center rounded-full text-white font-normal" onClick={() => setIsOpen(false)}>
                  Sign up
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}

export default NavigationBar