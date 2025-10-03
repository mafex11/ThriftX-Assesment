"use client"
import React, { useRef, useState } from "react"
import NavigationBar from "@/components/NavigationBar/navigation"
import Footer from "@/components/Footer/footer"
import { Button } from "@/components/ui/button"
import emailjs from "@emailjs/browser"
import { motion, type Variants } from "framer-motion"

export default function ContactPage() {
  const formRef = useRef<HTMLFormElement | null>(null)
  const [sending, setSending] = useState(false)
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")
  const [address, setAddress] = useState("")
  const [lat, setLat] = useState<string>("")
  const [lon, setLon] = useState<string>("")
  const [locating, setLocating] = useState(false)
  const [locateError, setLocateError] = useState<string>("")
  const mapContainerRef = useRef<HTMLDivElement | null>(null)
  const mapRef = useRef<any>(null)
  const markerRef = useRef<any>(null)
  const [mapReady, setMapReady] = useState(false)

  const containerVariants: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.08, delayChildren: 0.2 }
    }
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  }

  // Load Leaflet from CDN (no additional dependency) and initialize map
  React.useEffect(() => {
    if (typeof window === "undefined") return
    // Avoid double-injecting
    const leafletCssId = "leaflet-css-cdn"
    const leafletJsId = "leaflet-js-cdn"
    const hasCss = document.getElementById(leafletCssId)
    const hasJs = document.getElementById(leafletJsId)

    function initMap() {
      if (!mapContainerRef.current || mapRef.current || !(window as any).L) return
      const L = (window as any).L
      const startLat = lat ? parseFloat(lat) : 40.7128
      const startLon = lon ? parseFloat(lon) : -74.006
      const map = L.map(mapContainerRef.current).setView([startLat, startLon], 12)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(map)
      const marker = L.marker([startLat, startLon], { draggable: true }).addTo(map)
      marker.on('dragend', () => {
        const pos = marker.getLatLng()
        setLat(String(pos.lat))
        setLon(String(pos.lng))
        reverseGeocode(pos.lat, pos.lng)
      })
      map.on('click', (e: any) => {
        const pos = e.latlng
        marker.setLatLng(pos)
        setLat(String(pos.lat))
        setLon(String(pos.lng))
        reverseGeocode(pos.lat, pos.lng)
      })
      mapRef.current = map
      markerRef.current = marker
      setMapReady(true)
    }

    const ensureInit = () => {
      if ((window as any).L) {
        initMap()
        return
      }
      const jsEl = hasJs as HTMLScriptElement | null
      if (jsEl && jsEl.getAttribute('data-loaded') === 'true') {
        initMap()
        return
      }
      const newJs = jsEl || document.createElement('script')
      newJs.id = leafletJsId
      newJs.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
      newJs.async = true
      newJs.onload = () => {
        newJs.setAttribute('data-loaded', 'true')
        initMap()
      }
      if (!jsEl) document.body.appendChild(newJs)
    }

    if (!hasCss) {
      const link = document.createElement('link')
      link.id = leafletCssId
      link.rel = 'stylesheet'
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
      document.head.appendChild(link)
    }

    ensureInit()

    return () => {
      // Optional: do not destroy map to allow back/forward cache
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function geocodeAddress(query: string) {
    if (!query.trim()) {
      setLocateError("Enter an address to locate")
      return
    }
    setLocateError("")
    setLocating(true)
    try {
      const params = new URLSearchParams({ q: query, format: "json", limit: "1" })
      const res = await fetch(`https://nominatim.openstreetmap.org/search?${params.toString()}`, {
        headers: { "Accept": "application/json" }
      })
      if (!res.ok) throw new Error("Failed to fetch location")
      const data: Array<{ lat: string; lon: string }> = await res.json()
      if (!data || data.length === 0) {
        setLocateError("Address not found. Try a more specific address.")
        setLat("")
        setLon("")
        return
      }
      setLat(data[0].lat)
      setLon(data[0].lon)
    } catch (e) {
      setLocateError("Could not locate address. Please try again.")
      setLat("")
      setLon("")
    } finally {
      setLocating(false)
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!formRef.current || sending) return

    const formData = new FormData(formRef.current)
    const email = String(formData.get("user_email") || "").trim()
    const name = String(formData.get("user_name") || "").trim()
    const message = String(formData.get("message") || "").trim()
    const storeAddress = String(formData.get("store_address") || "").trim()

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!name || !emailPattern.test(email) || !message || !storeAddress) {
      setStatus("error")
      return
    }

    // Ensure we have coordinates for the provided address
    if (!lat || !lon) {
      await geocodeAddress(storeAddress)
      if (!lat || !lon) {
        setStatus("error")
        return
      }
    }

    setSending(true)
    setStatus("idle")
    try {
      // Append address and coordinates to the message so EmailJS {message} contains location info
      const messageEl = formRef.current.elements.namedItem("message") as HTMLTextAreaElement | null
      if (messageEl) {
        const combined = `${message}\n\nName: ${name || ""}\nEmail: ${email || ""}\nStore address: ${storeAddress || "(not provided)"}\nLatitude: ${lat || ""}\nLongitude: ${lon || ""}`
        messageEl.value = combined
      }
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID as string
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID as string
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY as string
      await emailjs.sendForm(serviceId, templateId, formRef.current, { publicKey })
      setStatus("success")
      formRef.current.reset()
      setAddress("")
      setLat("")
      setLon("")
      setLocateError("")
    } catch (err) {
      setStatus("error")
    } finally {
      setSending(false)
    }
  }

  async function reverseGeocode(latNum: number, lonNum: number) {
    try {
      const params = new URLSearchParams({ lat: String(latNum), lon: String(lonNum), format: 'json' })
      const res = await fetch(`https://nominatim.openstreetmap.org/reverse?${params.toString()}`, {
        headers: { 'Accept': 'application/json' }
      })
      if (!res.ok) return
      const data: any = await res.json()
      if (data && data.display_name) {
        setAddress(data.display_name)
      }
    } catch {}
  }

  async function useMyLocation() {
    if (!("geolocation" in navigator)) {
      setLocateError("Geolocation is not supported by your browser.")
      return
    }
    setLocateError("")
    setLocating(true)
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords
        setLat(String(latitude))
        setLon(String(longitude))
        try {
          if (mapRef.current) {
            mapRef.current.setView([latitude, longitude], 14)
          }
          if (markerRef.current) {
            markerRef.current.setLatLng([latitude, longitude])
          }
        } catch {}
        reverseGeocode(latitude, longitude)
        setLocating(false)
      },
      (err) => {
        setLocating(false)
        if (err.code === 1) {
          setLocateError("Permission denied. Please allow location access or enter address.")
        } else if (err.code === 2) {
          setLocateError("Location unavailable. Try again or enter address.")
        } else {
          setLocateError("Could not get your location. Try again or enter address.")
        }
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    )
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <NavigationBar />
      <main className="bg-zinc-950">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 min-h-screen"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Left column: full-height video on desktop with padding and rounded corners */}
          <motion.div
            className="relative hidden md:block px-10 pt-10 pb-40"
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative w-full h-full rounded-2xl overflow-hidden">
              <motion.video
                src="/video.webm"
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
                initial={{ scale: 1.05 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              />
              {/* Dark gradient overlay */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/50 via-black/50 to-transparent" />
            </div>
          </motion.div>

          {/* Right column: centered form */}
          <motion.div
            className="flex items-center justify-center px-6 sm:px-10 lg:px-20 py-16"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div className="w-full max-w-xl" variants={containerVariants} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <motion.h1 className="text-4xl md:text-6xl font-semibold" variants={itemVariants}>Get in touch</motion.h1>
              <motion.p className="mt-4 text-zinc-300 max-w-2xl" variants={itemVariants}>We’d love to hear about your store or project. Fill out the form and we’ll get back to you.</motion.p>

              <motion.form ref={formRef} onSubmit={handleSubmit} className="mt-10 grid grid-cols-1 gap-4" variants={containerVariants}>
                <motion.input
                  variants={itemVariants}
                  required
                  name="user_name"
                  placeholder="Name"
                  className="w-full rounded-lg bg-zinc-900 border border-zinc-800 px-4 py-3"
                />
                <motion.input
                  variants={itemVariants}
                  required
                  type="email"
                  name="user_email"
                  placeholder="Email"
                  className="w-full rounded-lg bg-zinc-900 border border-zinc-800 px-4 py-3"
                />
                <motion.div className="grid grid-cols-1 gap-2" variants={itemVariants}>
                  <div className="flex gap-2">
                    <input
                      required
                      name="store_address"
                      placeholder="Thrift store address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full rounded-lg bg-zinc-900 border border-zinc-800 px-4 py-3"
                    />
                    <motion.div variants={itemVariants}>
                      <Button
                        type="button"
                        onClick={useMyLocation}
                        disabled={locating}
                        className="rounded-lg bg-white text-black hover:bg-zinc-200 disabled:opacity-60 h-full"
                      >
                        {locating ? "Locating..." : "Use my location"}
                      </Button>
                    </motion.div>
                  </div>
                  {locateError && (
                    <motion.p className="text-red-400 text-sm" variants={itemVariants}>{locateError}</motion.p>
                  )}
                  <motion.div className="mt-2" variants={itemVariants}>
                    <motion.div className="aspect-[16/9] w-full overflow-hidden rounded-lg border border-zinc-800" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                      <div ref={mapContainerRef} id="store-location-map" className="w-full h-full" />
                    </motion.div>
                    {lat && lon && (
                      <motion.p className="mt-2 text-sm text-zinc-400" variants={itemVariants}>Latitude: {lat}, Longitude: {lon}</motion.p>
                    )}
                  </motion.div>
                  {/* Hidden inputs to submit coordinates */}
                  <input type="hidden" name="location_lat" value={lat} />
                  <input type="hidden" name="location_lon" value={lon} />
                </motion.div>
                <motion.textarea
                  variants={itemVariants}
                  required
                  name="message"
                  placeholder="Message"
                  className="w-full rounded-lg bg-zinc-900 border border-zinc-800 px-4 py-3 min-h-40"
                />
                <motion.div variants={itemVariants}>
                  <Button disabled={sending} className="rounded-full bg-white text-black hover:bg-zinc-200 disabled:opacity-60 w-fit">
                    {sending ? "Sending..." : "Send message"}
                  </Button>
                </motion.div>
                {status === "success" && (
                  <motion.p className="text-emerald-400 text-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>Thanks! We’ll get back to you soon.</motion.p>
                )}
                {status === "error" && (
                  <motion.p className="text-red-400 text-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>Please check your details and try again.</motion.p>
                )}
              </motion.form>
            </motion.div>
          </motion.div>
        </motion.div>
      </main>
      <Footer />
    </div>
  )
}


