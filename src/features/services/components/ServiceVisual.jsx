import BrowserScene from './scenes/BrowserScene'
import DeviceScene from './scenes/DeviceScene'
import NeuralScene from './scenes/NeuralScene'
import DataScene from './scenes/DataScene'
import SearchScene from './scenes/SearchScene'
import SocialScene from './scenes/SocialScene'
import InterfaceScene from './scenes/InterfaceScene'
import ContentScene from './scenes/ContentScene'
const scenes = {
  browser: BrowserScene,
  device: DeviceScene,
  neural: NeuralScene,
  data: DataScene,
  search: SearchScene,
  social: SocialScene,
  interface: InterfaceScene,
  content: ContentScene,
}
export default function ServiceVisual({ type = 'browser', className = '' }) {
  const Scene = scenes[type]
  return (
    <div
      className={`service-visual scene-${type} ${className}`}
      role="img"
      aria-label={`${type} interface concept`}
      data-cursor="image"
    >
      <div className="visual-grid" aria-hidden="true" />
      <div className="visual-composition" aria-hidden="true">
        {Scene && <Scene />}
      </div>
    </div>
  )
}
