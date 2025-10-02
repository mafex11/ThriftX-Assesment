import Link from "next/link"

const Footer = () => {
  return (
    <footer className="bg-zinc-950 text-zinc-300 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* <div className="flex items-center justify-between mb-10">
          <h3 className="text-xl md:text-2xl font-medium">Transforming vision into reality.</h3>
          <Link href="#contact" className="bg-white text-black rounded-full px-5 py-3 hover:bg-zinc-200">Get in touch</Link>
        </div> */}
        {/* <hr className="border-zinc-800 mb-10" /> */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
          <div className="space-y-3">
            <div className="text-4xl">TX</div>
            <p className="text-xs text-zinc-500">© {new Date().getFullYear()} ThriftX</p>
          </div>
          <ul className="space-y-2">
            <li><Link href="#work" className="hover:text-white">Work</Link></li>
            <li><Link href="#about" className="hover:text-white">Expertise</Link></li>
            <li><Link href="#work" className="hover:text-white">Latest</Link></li>
            <li><Link href="#about" className="hover:text-white">The Workshop</Link></li>
          </ul>
          <ul className="space-y-2">
            <li><Link href="#about" className="hover:text-white">About</Link></li>
            <li><Link href="#about" className="hover:text-white">Awards</Link></li>
            <li><Link href="#contact" className="hover:text-white">Careers</Link></li>
            <li><Link href="#contact" className="hover:text-white">Contact</Link></li>
          </ul>
          {/* <div className="space-y-3">
            <label className="block text-zinc-400">Sign up for our newsletter</label>
            <form className="flex gap-2">
              <input className="flex-1 rounded-full bg-zinc-900 border border-zinc-800 px-4 py-3 text-sm focus:outline-none" placeholder="you@example.com" />
              <button className="rounded-full bg-white text-black px-5 py-3 text-sm hover:bg-zinc-200">Submit</button>
            </form>
          </div> */}
        </div>
      </div>
    </footer>
  )
}

export default Footer


