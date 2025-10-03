import Image from "next/image"
import React from "react"

type FeaturedItem = {
  brand: string
  name: string
  tagline: string
  imageUrl: string
}

const CLOTHES: FeaturedItem[] = [
  { brand: "Y2K", name: "Cropped Top", tagline: "Retro-future staple", imageUrl: "/y2k croptop.jpg" },
  { brand: "Y2K", name: "Baggy Jeans", tagline: "Loose, lived-in", imageUrl: "/y2kbaggyjeans.webp" },
  { brand: "Y2K", name: "Baggy Shirt", tagline: "Oversized attitude", imageUrl: "/y2kbaggyshirt.jpg" },
  { brand: "Y2K", name: "Shades", tagline: "Chrome wraparound", imageUrl: "/y2kshades.webp" },
  { brand: "Y2K", name: "Chunky Shoes", tagline: "Bulky silhouette", imageUrl: "/y2kshoes.webp" },
  { brand: "Y2K", name: "Sweater", tagline: "Cozy nostalgia", imageUrl: "/y2ksweater.jpg" },
]

const FeaturedClothes: React.FC = () => {
  return (
    <section className="w-full lg:px-20 md:px-10 sm:px-10">
      <h2 className="text-2xl md:text-4xl font-semibold mb-8 ">Our Portfolio</h2>
      <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory md:flex md:gap-8 md:overflow-x-auto md:snap-x lg:grid lg:grid-cols-6 lg:overflow-visible">
        {CLOTHES.map((item, index) => (
          <article key={index} className="group snap-center shrink-0 w-3/4 sm:w-1/2 md:w-[280px] lg:w-auto">
            <div className="relative w-full aspect-[4/5] overflow-hidden bg-neutral-900">
              <Image
                src={item.imageUrl}
                alt={`${item.brand} ${item.name}`}
                fill
                sizes="(min-width: 1024px) 16vw, (min-width: 768px) 30vw, 45vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                priority={index < 2}
              />
            </div>
            <div className="mt-4 text-sm text-neutral-300">
              <span className="font-medium mr-1">{item.brand}</span>
            </div>
            <h3 className="text-base md:text-lg font-semibold mt-1">
              {item.name}
            </h3>
            <p className="text-sm text-neutral-400 mt-1">{item.tagline}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default FeaturedClothes


