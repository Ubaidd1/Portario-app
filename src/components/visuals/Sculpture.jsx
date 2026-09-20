import { useEffect, useRef } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'

const PALETTE = ['#f04436', '#ff6a4f', '#eae7e0', '#8b8b86']
const RIBBON_COUNT = 5
const SEGMENTS = 64

function makeRibbons() {
  return Array.from({ length: RIBBON_COUNT }, (_, i) => ({
    color: PALETTE[i % PALETTE.length],
    phase: (Math.PI * 2 * i) / RIBBON_COUNT,
    tilt: (i / RIBBON_COUNT) * Math.PI * 0.6,
    twist: 1.6 + i * 0.35,
    radiusScale: 0.72 + (i % 3) * 0.1,
    speed: 0.9 + (i % 3) * 0.12,
    thickness: i === 0 ? 2.4 : 1.2 + (i % 2) * 0.5,
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
    let ribbons = makeRibbons()
    let raf = null
    let t = 0
    let rotation = 0
    let rotationVel = 0.0026
    let tilt = 0
    let pointerYaw = 0
    let pointerPitch = 0

    const size = () => {
      const rect = wrap.getBoundingClientRect()
      width = rect.width
      height = rect.height
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const ro = new ResizeObserver(size)
    ro.observe(wrap)
    size()

    const project = (x, y, z, cx, cy, focal) => {
      const scale = focal / (focal + z)
      return { x: cx + x * scale, y: cy + y * scale, scale }
    }

    const drawRibbon = (ribbon, time, cx, cy, radius, focal, pointerTiltX, pointerTiltY) => {
      const points = []
      for (let s = 0; s <= SEGMENTS; s++) {
        const u = s / SEGMENTS
        const angle = ribbon.phase + rotation * ribbon.speed + u * Math.PI * ribbon.twist
        const bob = Math.sin(time * 0.6 + ribbon.phase + u * Math.PI * 2) * radius * 0.12
        const breathe = 0.85 + Math.sin(time * 0.35 + u * Math.PI * 3 + ribbon.phase) * 0.15

        const r = radius * ribbon.radiusScale * breathe
        let x = Math.cos(angle) * r
        let z = Math.sin(angle) * r
        let y = (u - 0.5) * radius * 1.5 + bob + Math.sin(time * 0.5 + ribbon.phase) * radius * 0.08

        const tiltX = ribbon.tilt + tilt + pointerTiltY
        const cosT = Math.cos(tiltX)
        const sinT = Math.sin(tiltX)
        const y2 = y * cosT - z * sinT
        const z2 = y * sinT + z * cosT

        const yaw = pointerTiltX
        const cosY = Math.cos(yaw)
        const sinY = Math.sin(yaw)
        const x2 = x * cosY - z2 * sinY
        const z3 = x * sinY + z2 * cosY

        points.push(project(x2, y2, z3, cx, cy, focal))
      }

      ctx.beginPath()
      points.forEach((p, i) => {
        if (i === 0) ctx.moveTo(p.x, p.y)
        else {
          const prev = points[i - 1]
          const mx = (prev.x + p.x) / 2
          const my = (prev.y + p.y) / 2
          ctx.quadraticCurveTo(prev.x, prev.y, mx, my)
        }
      })

      const avgScale = points.reduce((a, p) => a + p.scale, 0) / points.length
      const alpha = Math.min(1, Math.max(0.18, avgScale - 0.35))

      ctx.strokeStyle = ribbon.color
      ctx.lineWidth = ribbon.thickness * avgScale
      ctx.globalAlpha = alpha
      ctx.shadowColor = ribbon.color
      ctx.shadowBlur = 14 * avgScale
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
      ctx.stroke()
      ctx.shadowBlur = 0
      ctx.globalAlpha = 1
    }

    const render = (time) => {
      ctx.clearRect(0, 0, width, height)
      const cx = width / 2
      const cy = height / 2 + Math.sin(time * 0.25) * height * 0.02
      const radius = Math.min(width, height) * 0.34
      const focal = Math.max(width, height) * 0.9

      const targetYaw =
        pointer.current.inside && pointer.current.x != null
          ? ((pointer.current.x - width / 2) / width) * 0.6
          : 0
      const targetPitch =
        pointer.current.inside && pointer.current.y != null
          ? ((pointer.current.y - height / 2) / height) * 0.35
          : 0

      pointerYaw += (targetYaw - pointerYaw) * 0.04
      pointerPitch += (targetPitch - pointerPitch) * 0.04

      rotationVel += ((pointer.current.inside ? 0.0026 + targetYaw * 0.004 : 0.0026) - rotationVel) * 0.02
      rotation += rotationVel
      tilt = Math.sin(time * 0.18) * 0.18

      const ordered = [...ribbons].sort((a, b) => Math.sin(a.phase + rotation) - Math.sin(b.phase + rotation))
      ordered.forEach((ribbon) => drawRibbon(ribbon, time, cx, cy, radius, focal, pointerYaw, pointerPitch))
    }

    const step = () => {
      t += 0.012
      render(t)
      if (visible && !reduced) raf = requestAnimationFrame(step)
    }

    if (visible && !reduced) {
      raf = requestAnimationFrame(step)
    } else {
      render(0)
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
