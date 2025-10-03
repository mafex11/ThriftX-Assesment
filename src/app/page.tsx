import { Button } from "@/components/ui/button";
import NavigationBar from "@/components/NavigationBar/navigation";
import Hero from "@/components/Hero/hero";
import Image from "next/image";
import Footer from "@/components/Footer/footer";
import PrefetchRoutes from "@/components/Prefetch/prefetch-routes";

export const revalidate = 3600;

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <NavigationBar />
      <Hero />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        {/* Page content placeholder */}
      </main>
      {/* Background prefetch of common routes */}
      <PrefetchRoutes />
      <Footer />
    </div>
  );
}
