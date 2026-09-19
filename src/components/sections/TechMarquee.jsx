import { useState } from 'react'
import { Pause, Play } from 'lucide-react'
import { technologies } from '../../data/navigation'
export default function TechMarquee() {
  const [paused, setPaused] = useState(false)
  return (
    <section
      aria-label="Technologies and capabilities"
      className="relative overflow-hidden border-y border-white/10 py-7"
    >
      <div className="sr-only">{technologies.join(', ')}</div>
      {[technologies.slice(0, 7), technologies.slice(7)].map((row, index) => (
        <div
          key={index}
          className={`marquee-track ${index ? 'reverse mt-4' : ''}`}
          style={paused ? { animationPlayState: 'paused' } : undefined}
          aria-hidden="true"
        >
          {[0, 1, 2, 3].map((copy) => (
            <div className="marquee-group" key={copy}>
              {row.map((tech) => (
                <span
                  className="flex shrink-0 items-center gap-8 pr-8 text-lg font-medium tracking-tight text-white/55 md:text-2xl"
                  key={tech}
                >
                  {tech}
                  <span className="text-sm text-accent">✳</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      ))}
      <button
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-background p-3 text-muted hover:text-white"
        aria-label={paused ? 'Play technology marquee' : 'Pause technology marquee'}
        aria-pressed={paused}
        onClick={() => setPaused(!paused)}
      >
        {paused ? <Play size={14} /> : <Pause size={14} />}
      </button>
    </section>
  )
}
