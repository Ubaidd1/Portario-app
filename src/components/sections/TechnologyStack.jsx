import { useState } from 'react'
import { stack, stackGroups } from '../../data/technologies'
import Container from '../common/Container'
import SectionTitle from '../common/SectionTitle'
export default function TechnologyStack() {
  const [active, setActive] = useState(null)
  const selected = stack.find((item) => item.name === active)
  return (
    <section className="section-space overflow-hidden border-y border-white/10">
      <Container>
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionTitle
            number="06"
            label="TECHNOLOGY"
            title={
              <>
                The tools
                <br />
                behind the work.
              </>
            }
          />
          <p className="max-w-xs text-sm leading-7 text-muted">
            A connected toolkit, chosen around the problem. Select a technology to explore its
            connections.
          </p>
        </div>
        <div className="technology-constellation mt-10">
          <svg
            className="constellation-lines"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {selected &&
              stack
                .filter((item) => item.group === selected.group && item.name !== selected.name)
                .map((item) => (
                  <line
                    key={item.name}
                    x1={selected.x}
                    y1={selected.y}
                    x2={item.x}
                    y2={item.y}
                    stroke="#f04436"
                    strokeWidth=".12"
                  />
                ))}
          </svg>
          {stack.map((item) => (
            <button
              key={item.name}
              onPointerEnter={(event) => {
                if (event.pointerType === 'mouse') setActive(item.name)
              }}
              onFocus={() => setActive(item.name)}
              onClick={() => setActive(item.name)}
              aria-pressed={active === item.name}
              className={`technology-node ${active === item.name ? 'selected' : ''} ${selected?.group === item.group ? 'connected' : ''}`}
              style={{ '--x': `${item.x}%`, '--y': `${item.y}%` }}
            >
              {item.name}
              <span className="technology-point" />
            </button>
          ))}
        </div>
        <div className="mt-7 flex flex-wrap justify-between gap-4 border-t border-white/15 pt-5">
          <p className="eyebrow text-muted" aria-live="polite">
            {selected
              ? `${selected.name} / ${stackGroups[selected.group]}`
              : 'HOVER, FOCUS, OR SELECT TO CONNECT THE DOTS'}
          </p>
          <span className="eyebrow text-accent">PURPOSE → TOOL → POSSIBILITY</span>
        </div>
      </Container>
    </section>
  )
}
