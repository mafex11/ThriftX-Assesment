"use client"
import React from "react";
import NavigationBar from "@/components/NavigationBar/navigation";
import Footer from "@/components/Footer/footer";
import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <NavigationBar />
      <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        <motion.header 
          className="space-y-4"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h1 className="text-5xl font-semibold">About ThriftX</h1>
        </motion.header>

        <motion.section 
          className="rounded-lg overflow-hidden "
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <motion.video
            src="/launch.webm"
            className="w-full h-[360px] md:h-[540px] object-cover"
            autoPlay
            muted
            loop
            playsInline
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
        </motion.section>
        <motion.p
          className="text-gray-200 leading-relaxed max-w-3xl font-light text-lg"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          We connect Mumbai&apos;s independent thrift stores with shoppers across India—powering circular
          fashion while helping small businesses thrive.
        </motion.p>

        {/* Section 1: Image left, text right */}
        <motion.section 
          className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="border border-zinc-800 rounded-lg overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=1400&auto=format&fit=crop" alt="Vintage clothing rack" className="w-full h-80 object-cover" />
          </div>
          <div className="space-y-3">
            <h2 className="text-3xl font-medium">Our Mission</h2>
            <p className="text-gray-300 leading-relaxed">
              Make secondhand the first choice. We champion quality, authenticity, and accessibility—so
              every great piece gets a second story.
            </p>
          </div>
        </motion.section>

        {/* Section 2: Image right, text left */}
        <motion.section 
          className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.05 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="space-y-3 md:order-1 order-2">
            <h2 className="text-3xl font-medium">For Store Owners</h2>
            <p className="text-gray-300 leading-relaxed">
              We handle cataloging, listings, payments and analytics. You focus on curating great finds.
              Launch online in days—not months.
            </p>
          </div>
          <div className="border border-zinc-800 rounded-lg overflow-hidden md:order-2 order-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://images.unsplash.com/photo-1543087903-1ac2ec7aa8c5?q=80&w=1400&auto=format&fit=crop" alt="Store owner arranging clothes" className="w-full h-80 object-cover" />
          </div>
        </motion.section>

        {/* Section 3: Image left, text right */}
        <motion.section 
          className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="border border-zinc-800 rounded-lg overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?q=80&w=1400&auto=format&fit=crop" alt="Eco-friendly shopping" className="w-full h-80 object-cover" />
          </div>
          <div className="space-y-3">
            <h2 className="text-3xl font-medium">Sustainable by Design</h2>
            <p className="text-gray-300 leading-relaxed">
              Keeping garments in circulation is better for wardrobes and the planet. We bake
              sustainability into every part of the experience.
            </p>
          </div>
        </motion.section>

        {/* Section 4: Image right, text left */}
        <motion.section 
          className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="space-y-3 md:order-1 order-2">
            <h2 className="text-3xl font-medium">Community First</h2>
            <p className="text-gray-300 leading-relaxed">
              We celebrate Mumbai&apos;s vibrant thrift community with storytelling, features, and local
              partnerships that amplify voices.
            </p>
          </div>
          <div className="border border-zinc-800 rounded-lg overflow-hidden md:order-2 order-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://images.unsplash.com/photo-1519223400710-6da9e1b777ea?q=80&w=1400&auto=format&fit=crop" alt="Community of shoppers" className="w-full h-80 object-cover" />
          </div>
        </motion.section>

        <motion.section 
          className="border border-zinc-800 rounded-lg p-6 space-y-3"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h3 className="text-lg font-medium">Partner with ThriftX</h3>
          <p className="text-gray-300 text-sm leading-relaxed">
            Based in Mumbai and run a thrift store? We&apos;d love to onboard you. Share your catalog and let
            us handle the tech, payments, and reach.
          </p>
          <a href="/contact" className="inline-block underline">Get in touch →</a>
        </motion.section>
      </main>
      <Footer />
    </div>
  );
}


