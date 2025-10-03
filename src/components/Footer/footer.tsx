"use client"
import Link from "next/link"
import { useState } from "react"

const Footer = () => {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState("")
  const [isSuccess, setIsSuccess] = useState(false)

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage("")
    setIsSuccess(false)

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage(data.message)
        setIsSuccess(true)
        setEmail("")
      } else {
        setMessage(data.error)
        setIsSuccess(false)
      }
    } catch (error) {
      setMessage('Something went wrong. Please try again.')
      setIsSuccess(false)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <footer className="bg-zinc-950 text-zinc-300 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-6 py-12">
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
          <div className="space-y-3">
            <div className="text-4xl">TX</div>
            <p className="text-xs text-zinc-500">© {new Date().getFullYear()} ThriftX</p>
          </div>
          <ul className="space-y-2">
            <li><Link href="/work" className="hover:text-white">Work</Link></li>
            <li><Link href="/about" className="hover:text-white">About</Link></li>
            <li><Link href="/blog" className="hover:text-white">Blogs</Link></li>
            <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
          </ul>
           <div className="space-y-3">
             <label className="block text-zinc-400">Sign up for our newsletter</label>
             <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
               <input 
                 type="email"
                 value={email}
                 onChange={(e) => setEmail(e.target.value)}
                 className="flex-1 rounded-full bg-zinc-900 border border-zinc-800 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-white/20" 
                 placeholder="Your Email Here"
                 required
                 disabled={isSubmitting}
               />
               <button 
                 type="submit"
                 disabled={isSubmitting || !email}
                 className="rounded-full bg-white text-black px-5 py-3 text-sm hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
               >
                 {isSubmitting ? 'Subscribing...' : 'Submit'}
               </button>
             </form>
             {message && (
               <p className={`text-xs ${isSuccess ? 'text-green-400' : 'text-red-400'}`}>
                 {message}
               </p>
             )}
           </div>
        </div>
        <div className="flex items-center justify-between mt-20 mb-5">
          <h3 className="text-xl md:text-2xl font-medium">Transforming vision into reality.</h3>
        </div>
      </div>
    </footer>
  )
}

export default Footer


