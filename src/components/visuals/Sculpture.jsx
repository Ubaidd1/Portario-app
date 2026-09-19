import { useEffect, useRef } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'

const PALETTE = ['#f04436', '#ff6a4f', '#ff9c7a', '#c92b20']
const LINK_DISTANCE = 108
const COUNT_DESKTOP = 38
const COUNT_MOBILE = 20

function noise(x, y, t) {
  return (
    Math.sin(x * 1.4 + t) * Math.cos(y * 1.2 - t * 0.9) +
    Math.sin((x + y) * 0.8 - t * 1.3) * 0.6
  )
}

function makeParticles(count, w, h) {
  return Array.from({ length: count }, (_, i) => ({
    x: Math.random() * w,
    y: Math.random() * h,
    seed: Math.random() * 1000,
    r: 1 + Math.random() * 1.6,
    color: PALETTE[i % PALETTE.length],
    pulse: Math.random() * Math.PI * 2,
  }))
}

export default function Sculpture({ compact = false }) {
  const wrapRef = useRef(null)
  const canvasRef = useRef(null)
  const visible = useInView(wrapRef, { margin: '100px' })
  const reduced = useReducedMotion()
  const pointer = useRef({ x: null, y: null, inside: false })

  useEffect(() => {
    const canvas = canvasRef.current
    const wrap = wrapRef.current
    if (!canvas || !wrap) return
    const ctx = canvas.getContext('2d')
    let width = 0,
      height = 0,
      dpr = Math.min(window.devicePixelRatio || 1, 2)
    let particles = []
    let raf = null
    let t = 0

    const size = () => {
      const rect = wrap.getBoundingClientRect()
      width = rect.width
      height = rect.height
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const desktop = width >= 380
      particles = makeParticles(desktop ? COUNT_DESKTOP : COUNT_MOBILE, width, height)
    }

    const ro = new ResizeObserver(size)
    ro.observe(wrap)
    size()

    const drawStatic = () => {
      ctx.clearRect(0, 0, width, height)
      particles.forEach((p) => {
        ctx.beginPath()
        ctx.fillStyle = p.color
        ctx.globalAlpha = 0.7
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      })
      ctx.globalAlpha = 1
    }

    const step = () => {
      t += 0.0032
      ctx.clearRect(0, 0, width, height)

      particles.forEach((p) => {
        const angle = noise(p.x * 0.007, p.y * 0.007, t + p.seed) * Math.PI * 2
        p.x += Math.cos(angle) * 0.4
        p.y += Math.sin(angle) * 0.4
        p.pulse += 0.02

        if (pointer.current.inside && pointer.current.x != null) {
          const dx = p.x - pointer.current.x
          const dy = p.y - pointer.current.y
          const dist = Math.hypot(dx, dy)
          if (dist < 130 && dist > 0.01) {
            const force = (1 - dist / 130) * 1.3
            p.x += (dx / dist) * force
            p.y += (dy / dist) * force
          }
        }

        if (p.x < -20) p.x = width + 20
        if (p.x > width + 20) p.x = -20
        if (p.y < -20) p.y = height + 20
        if (p.y > height + 20) p.y = -20
      })

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i],
            b = particles[j]
          const dx = a.x - b.x,
            dy = a.y - b.y
          const dist = Math.hypot(dx, dy)
          if (dist < LINK_DISTANCE) {
            ctx.beginPath()
            ctx.strokeStyle = a.color
            ctx.globalAlpha = (1 - dist / LINK_DISTANCE) * 0.22
            ctx.lineWidth = 1
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }
      ctx.globalAlpha = 1

      particles.forEach((p) => {
        const glow = 0.55 + Math.sin(p.pulse) * 0.35
        ctx.beginPath()
        ctx.fillStyle = p.color
        ctx.globalAlpha = glow
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
        ctx.globalAlpha = 1
      })

      if (visible && !reduced) raf = requestAnimationFrame(step)
    }

    if (visible && !reduced) {
      raf = requestAnimationFrame(step)
    } else {
      drawStatic()
    }

    const onMove = (e) => {
      const rect = wrap.getBoundingClientRect()
      pointer.current.x = e.clientX - rect.left
      pointer.current.y = e.clientY - rect.top
      pointer.current.inside = true
    }
    const onLeave = () => {
      pointer.current.inside = false
    }
    wrap.addEventListener('pointermove', onMove)
    wrap.addEventListener('pointerleave', onLeave)

    return () => {
      if (raf) cancelAnimationFrame(raf)
      ro.disconnect()
      wrap.removeEventListener('pointermove', onMove)
      wrap.removeEventListener('pointerleave', onLeave)
    }
  }, [visible, reduced])

  return (
    <div ref={wrapRef} aria-hidden="true" className={`sculpture-stage ${compact ? 'compact' : ''}`}>
      <div className="orbital orbital-one" />
      <div className="orbital orbital-two" />
      <div className="sculpture-cross cross-one">+</div>
      <div className="sculpture-cross cross-two">+</div>
      <canvas ref={canvasRef} className="sculpture-canvas" />
      <div className="sculpture-caption">
        <span>CREATIVE ENGINEERING</span>
        <span>FIG. 001 — INFINITE POSSIBILITIES</span>
      </div>
    </div>
  )
}
