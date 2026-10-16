export default function SocialScene() {
  return (
    <div className="social-concept">
      {['A clear voice.', 'A useful story.', 'A real connection.'].map((text, i) => (
        <div className="social-fragment" style={{ '--card': i }} key={text}>
          <span className="eyebrow">STUDIO / NOTES</span>
          <p className="mt-10 text-3xl leading-tight tracking-tight">{text}</p>
          <span className="mt-8 block text-5xl">✳</span>
          <p className="mt-8 text-[9px]">CONTENT WITH INTENTION ↗</p>
        </div>
      ))}
    </div>
  )
}
