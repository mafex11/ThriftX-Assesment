"use client"
import React from "react";
import { motion } from "framer-motion";
import NavigationBar from "@/components/NavigationBar/navigation";
import Footer from "@/components/Footer/footer";

export default function WorkPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <NavigationBar />
      <main className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        <motion.section 
          className="space-y-4"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.h1 className="text-5xl font-semibold">Our Work</motion.h1>
          <motion.p className="text-gray-300 leading-relaxed">
            ThriftX partners with independent thrift stores across Mumbai to bring their unique, pre-loved
            fashion online. We onboard shops, digitize their inventory, and give them the tools to manage
            listings, orders, and payouts—so they can focus on curation while we power the commerce.
          </motion.p>
        </motion.section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div 
            className="border border-zinc-800 rounded-lg overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=1400&auto=format&fit=crop"
              alt="Mumbai street market"
              className="h-64 w-full object-cover"
            />
            <div className="p-5 space-y-2">
              <h2 className="text-xl font-medium">Onboarding Mumbai Thrift Stores</h2>
              <p className="text-gray-300 text-sm leading-relaxed">
                We meet stores where they are—helping with cataloging, sizing, and photography. Our
                onboarding checklist makes it easy to go from racks to rich product pages in days.
              </p>
            </div>
          </motion.div>

          <motion.div 
            className="border border-zinc-800 rounded-lg overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.05 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1400&auto=format&fit=crop"
              alt="Clothing rails"
              className="h-64 w-full object-cover"
            />
            <div className="p-5 space-y-2">
              <h2 className="text-xl font-medium">Inventory Digitization</h2>
              <p className="text-gray-300 text-sm leading-relaxed">
                We standardize condition, fit, and brand metadata so buyers can discover items confidently.
                Bulk upload flows and mobile tools keep stock fresh and accurate.
              </p>
            </div>
          </motion.div>

          <motion.div 
            className="border border-zinc-800 rounded-lg overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1400&auto=format&fit=crop"
              alt="Online checkout"
              className="h-64 w-full object-cover"
            />
            <div className="p-5 space-y-2">
              <h2 className="text-xl font-medium">Sell on ThriftX</h2>
              <p className="text-gray-300 text-sm leading-relaxed">
                Seamless product pages, search, and a trusted checkout experience connect Mumbai&apos;s
                thrift scene to buyers across India.
              </p>
            </div>
          </motion.div>

          <motion.div 
            className="border border-zinc-800 rounded-lg overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?q=80&w=1400&auto=format&fit=crop"
              alt="Store owner packaging"
              className="h-64 w-full object-cover"
            />
            <div className="p-5 space-y-2">
              <h2 className="text-xl font-medium">Logistics & Payouts</h2>
              <p className="text-gray-300 text-sm leading-relaxed">
                We integrate with courier partners and simplify payouts, offering clear fees and
                transparent reporting for store owners.
              </p>
            </div>
          </motion.div>
        </section>

        <motion.section 
          className="border border-zinc-800 rounded-lg p-6 space-y-3"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.h3 className="text-lg font-medium">Partner with ThriftX</motion.h3>
          <motion.p className="text-gray-300 text-sm leading-relaxed">
            Based in Mumbai and run a thrift store? We&apos;d love to onboard you. Share your catalog and
            let us handle the tech, payments, and reach. You keep your brand voice and customers get a
            polished shopping experience.
          </motion.p>
          <motion.a href="/contact" className="inline-block underline" whileHover={{ x: 4 }}>
            Get in touch →
          </motion.a>
        </motion.section>
      </main>
      <Footer />
    </div>
  );
}


