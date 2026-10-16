import FormaMock from './mocks/FormaMock'
import FrequencyMock from './mocks/FrequencyMock'
import NovaMock from './mocks/NovaMock'
import IndigoMock from './mocks/IndigoMock'
const mocks = {
  forma: FormaMock,
  frequency: FrequencyMock,
  nova: NovaMock,
  indigo: IndigoMock,
}
const labels = {
  forma: 'Forma workspace dashboard with task columns and team activity',
  frequency: 'Frequency analytics dashboard with blue data charts',
  nova: 'Nova AI assistant conversation interface',
  indigo: 'Indigo Studio editorial website concept',
}
export default function ProjectVisual({ kind, className = '' }) {
  const Mock = mocks[kind]
  return (
    <div
      className={`project-visual visual-${kind} ${className}`}
      role="img"
      aria-label={`${labels[kind] || 'Project interface'}. Illustrative project concept.`}
    >
      <div aria-hidden="true" className="project-art-inner">
        {Mock && <Mock />}
      </div>
    </div>
  )
}
