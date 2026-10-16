import { Fragment } from 'react'
import SEO from '@/shared/components/SEO'
import CTA from '@/shared/components/CTA'
import { site } from '@/config/site'
import { TechMarquee } from '@/features/technology'
import Hero from '../components/Hero'
import { visibleSections } from '../sections'
export default function HomePage() {
  return (
    <>
      <SEO title="Full-Stack Developer" description={site.defaultDescription} />
      <Hero />
      {visibleSections.map(({ key, Component, number, props, withMarquee }) => (
        <Fragment key={key}>
          {withMarquee && <TechMarquee />}
          <Component number={number} {...props} />
        </Fragment>
      ))}
      <CTA />
    </>
  )
}
