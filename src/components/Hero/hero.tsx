"use client"
import React, { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { Button } from "@/components/ui/button"
import FeaturedClothes from "@/components/FeaturedClothes/featured-clothes"
import Image from "next/image"
import Link from "next/link"

const Hero = () => {
  const [compactPadding, setCompactPadding] = useState(false)
  const [supportActiveBg, setSupportActiveBg] = useState(false)
  const supportRef = useRef<HTMLDivElement | null>(null)
  const heroRef = useRef<HTMLDivElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })

  // Transform values for parallax effects
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

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

  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" }
  }

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const scaleIn = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.6, ease: "easeOut" }
  }

  const slideInLeft = {
    initial: { opacity: 0, x: -100 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.8, ease: "easeOut" }
  }

  const slideInRight = {
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.8, ease: "easeOut" }
  }

  return (
    <motion.div 
      ref={heroRef}
      className="relative text-white flex flex-col pt-10"
      initial="initial"
      animate="animate"
      variants={staggerContainer}
    >
      {/* Main heading */}
      <motion.h1 
        className="text-4xl md:text-7xl lg:text-8xl font-semibold max-w-screen leading-tight pl-5 sm:pl-40 pt-5 sm:pt-20"
        variants={fadeInUp}
        style={{ y, opacity }}
      >
        Discover unique finds & sustainable style at ThriftX
      </motion.h1>
      
      {/* Video container */}
      <motion.div 
        className={`w-full max-w-screen mx-auto bg transition-all duration-500 ${compactPadding ? 'px-0 sm:px-0' : 'px-2 sm:px-40'}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="relative w-full aspect-[9/16] md:aspect-video overflow-hidden">
          <motion.video
            src="/video.webm"
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full object-cover h-[85%]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
        </div>
      </motion.div>
      {/* CTA section (acts as About intro) */}
      <motion.div 
        id="about" 
        className="w-full flex flex-col items-center text-center pb-24"
        variants={fadeInUp}
      >
        <motion.p 
          className="text-3xl md:text-5xl lg:text-6xl leading-tight md:leading-tight max-w-5xl px-5"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Thrift smarter, dress better, and make an impact with every find
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Button asChild className="mt-8 rounded-full bg-white text-black hover:bg-gray-200 px-6 py-6 text-md">
            <Link href="/work">See our work</Link>
          </Button>
        </motion.div>
      </motion.div>
      <motion.div 
        id="work" 
        className="py-8 px-4"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <FeaturedClothes />
      </motion.div>
      {/* Local thrift support section */}
      <motion.section 
        ref={supportRef as any} 
        className={`w-full py-20 transition-colors duration-500 overflow-hidden ${supportActiveBg ? 'bg-emerald-950/90' : 'bg-zinc-950'}`}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="mx-auto max-w-screen grid grid-cols-1 md:grid-cols-2 gap-10 items-start px-6 md:px-10 overflow-hidden">
          <motion.div 
            className="self-start sm:pl-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <motion.h2 
              className="text-3xl md:text-5xl font-semibold leading-tight text-emerald-100"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              We help local thrift stores reach new customers and grow sustainable communities.
            </motion.h2>
            <motion.p 
              className="mt-4 text-emerald-200/90 max-w-3xl font-light text-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
            >
              From inventory storytelling to digital storefronts and fulfillment, ThriftX gives small shops the tools to shine online while keeping the soul of thrifting alive.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
            >
              <Button asChild className="mt-6 rounded-full bg-emerald-100 text-emerald-900 hover:bg-emerald-200 px-6 py-6 text-md">
                <Link href="/work">See our offerings</Link>
              </Button>
            </motion.div>
          </motion.div>
          <motion.div 
            className="relative w-full aspect-[16/10] md:aspect-[4/3] overflow-hidden rounded-xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="w-full h-full"
              initial={{ scale: 1.1 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 1.2, delay: 0.5 }}
              viewport={{ once: true }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/y2kbaggyshirt.jpg"
                alt="Local thrift community showcase"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
      {/* Contact section */}
      <motion.section 
        id="contact" 
        className="w-full bg-zinc-950 pt-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <motion.h3 
              className="text-3xl md:text-5xl font-semibold"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Have a thrift store?
            </motion.h3>
            <motion.p 
              className="mt-4 text-zinc-300 max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
            >
              Reach out and we'll help craft a plan to bring your vision to life while empowering local thrift communities.
            </motion.p>
          </motion.div>
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
            >
              <Button asChild className="rounded-full bg-white text-black hover:bg-zinc-200 px-6 py-6 text-base">
                <Link href="/contact">Contact us</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
      
    </motion.div>
  )
}

export default Hero