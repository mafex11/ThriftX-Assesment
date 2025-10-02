"use client"
import React, { useEffect, useRef, useState } from 'react'
import { Button } from "@/components/ui/button"
import FeaturedClothes from "@/components/FeaturedClothes/featured-clothes"
import Image from "next/image"
import Link from "next/link"

const Hero = () => {
  const [compactPadding, setCompactPadding] = useState(false)
  const [supportActiveBg, setSupportActiveBg] = useState(false)
  const supportRef = useRef<HTMLDivElement | null>(null)
  

  useEffect(() => {
    const handleScroll = () => {
      setCompactPadding(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const el = supportRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          setSupportActiveBg(entry.isIntersecting)
        })
      },
      { root: null, rootMargin: "-20% 0px -20% 0px", threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div className="relative  text-white flex flex-col  pt-10">
      {/* Main heading */}
      <h1 className="text-4xl md:text-7xl lg:text-8xl font-semibold max-w-screen leading-tight pl-5 sm:pl-40 pt-5 sm:pt-20">
        Discover unique finds & sustainable style at ThriftX
      </h1>
      
      {/* Video container */}
      <div className={`w-full max-w-screen mx-auto transition-all duration-500 ${compactPadding ? 'px-0 sm:px-0' : 'px-2 sm:px-20'}`}>
        <div className="relative w-full aspect-[9/16] md:aspect-video overflow-hidden">
          <video
            src="/video.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover "
          />
        </div>
      </div>
      {/* CTA section (acts as About intro) */}
      <div id="about" className="w-full flex flex-col items-center text-center py-24">
        <p className="text-3xl md:text-5xl lg:text-6xl leading-tight md:leading-tight max-w-5xl px-5">
          Thrift smarter, dress better, and make an impact with every find
        </p>
        <Button asChild className="mt-8 rounded-full bg-white text-black hover:bg-gray-200 px-6 py-6 text-md">
          <Link href="/work">See our work</Link>
        </Button>
      </div>
      <div id="work" className="py-8 px-4">
        <FeaturedClothes />
      </div>
      {/* Local thrift support section */}
      <section ref={supportRef as any} className={`w-full py-20 transition-colors duration-500 ${supportActiveBg ? 'bg-emerald-950/90' : 'bg-zinc-950'}`}>
        <div className="mx-auto max-w-screen grid grid-cols-1 md:grid-cols-2 gap-10 items-start px-6 md:px-10">
          <div className="self-start sm:pl-20">
            <h2 className="text-3xl md:text-5xl font-semibold leading-tight text-emerald-100 ">
              We help local thrift stores reach new customers and grow sustainable communities.
            </h2>
            <p className="mt-4 text-emerald-200/90 max-w-3xl font-light text-lg ">
              From inventory storytelling to digital storefronts and fulfillment, ThriftX gives small shops the tools to shine online while keeping the soul of thrifting alive.
            </p>
            <Button className="mt-6 rounded-full bg-emerald-100 text-emerald-900 hover:bg-emerald-200 px-6 py-6 text-md">
              See our offerings
            </Button>
          </div>
          <div className="relative w-full aspect-[16/10] md:aspect-[4/3] overflow-hidden rounded-xl">
            <Image
              src="/y2kbaggyshirt.jpg"
              alt="Local thrift community showcase"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>
      {/* Contact section */}
      <section id="contact" className="w-full bg-zinc-950 pt-20">
        <div className="max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <h3 className="text-3xl md:text-5xl font-semibold">Have a thrift store?</h3>
            <p className="mt-4 text-zinc-300 max-w-xl">Reach out and we’ll help craft a plan to bring your vision to life while empowering local thrift communities.</p>
          </div>
          <div className="space-y-4">
            <Button asChild className="rounded-full bg-white text-black hover:bg-zinc-200 px-6 py-6 text-base">
              <Link href="/contact">Contact us</Link>
            </Button>
          </div>
        </div>
      </section>
      
    </div>
  )
}

export default Hero