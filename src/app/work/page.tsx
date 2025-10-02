import React from "react";
import NavigationBar from "@/components/NavigationBar/navigation";
import Footer from "@/components/Footer/footer";

export default function WorkPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <NavigationBar />
      <main className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        <section className="space-y-4">
          <h1 className="text-5xl font-semibold">Our Work</h1>
          <p className="text-gray-300 leading-relaxed">
            ThriftX partners with independent thrift stores across Mumbai to bring their unique, pre-loved
            fashion online. We onboard shops, digitize their inventory, and give them the tools to manage
            listings, orders, and payouts—so they can focus on curation while we power the commerce.
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-zinc-800 rounded-lg overflow-hidden">
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
          </div>

          <div className="border border-zinc-800 rounded-lg overflow-hidden">
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
          </div>

          <div className="border border-zinc-800 rounded-lg overflow-hidden">
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
          </div>

          <div className="border border-zinc-800 rounded-lg overflow-hidden">
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
          </div>
        </section>

        <section className="border border-zinc-800 rounded-lg p-6 space-y-3">
          <h3 className="text-lg font-medium">Partner with ThriftX</h3>
          <p className="text-gray-300 text-sm leading-relaxed">
            Based in Mumbai and run a thrift store? We&apos;d love to onboard you. Share your catalog and
            let us handle the tech, payments, and reach. You keep your brand voice and customers get a
            polished shopping experience.
          </p>
          <a href="/contact" className="inline-block underline">Get in touch →</a>
        </section>
      </main>
      <Footer />
    </div>
  );
}


