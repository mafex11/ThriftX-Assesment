"use client"
import React from "react"

type CalendlyWidgetProps = {
  url?: string
  height?: number
  backgroundColor?: string
  textColor?: string
  primaryColor?: string
}

export default function CalendlyWidget(props: CalendlyWidgetProps) {
  const containerRef = React.useRef<HTMLDivElement | null>(null)
  const {
    url = process.env.NEXT_PUBLIC_CALENDLY_URL || "",
    height = 700,
    backgroundColor,
    textColor,
    primaryColor
  } = props

  React.useEffect(() => {
    if (typeof window === "undefined") return
    if (!url) return

    const linkId = "calendly-css"
    const scriptId = "calendly-js"
    const hasCss = document.getElementById(linkId)
    const hasJs = document.getElementById(scriptId) as HTMLScriptElement | null

    if (!hasCss) {
      const link = document.createElement("link")
      link.id = linkId
      link.rel = "stylesheet"
      link.href = "https://assets.calendly.com/assets/external/widget.css"
      document.head.appendChild(link)
    }

    const ensureLoaded = () => {
      const w = window as any
      if (w.Calendly && typeof w.Calendly.initInlineWidget === "function") {
        try {
          w.Calendly.initInlineWidget({
            url,
            parentElement: containerRef.current,
            prefill: {},
            utm: {},
            textColor,
            primaryColor,
            branding: undefined,
            backgroundColor
          })
        } catch {}
        return true
      }
      return false
    }

    if (!ensureLoaded()) {
      const script = hasJs || document.createElement("script")
      script.id = scriptId
      script.src = "https://assets.calendly.com/assets/external/widget.js"
      script.async = true
      script.onload = () => {
        ensureLoaded()
      }
      if (!hasJs) document.body.appendChild(script)
    }
  }, [url, backgroundColor, textColor, primaryColor])

  if (!url) {
    return (
      <div className="rounded-lg border border-zinc-800 p-4 text-sm text-zinc-400">
        Set NEXT_PUBLIC_CALENDLY_URL to enable scheduling.
      </div>
    )
  }

  return (
    <div className="w-full overflow-hidden rounded-lg border border-zinc-800">
      <div ref={containerRef} className="calendly-inline-widget" style={{ minWidth: "320px", height }} />
    </div>
  )
}


