import { useCampus }   from '../context/CampusContext'
import Hero          from '../sections/Hero'
import NewsTicker    from '../components/NewsTicker'
import StatsBar      from '../sections/StatsBar'
import Programs      from '../sections/Programs'
import SchoolLife    from '../sections/SchoolLife'
import Campuses      from '../sections/Campuses'
import WhyChooseUs   from '../sections/WhyChooseUs'
import Announcements from '../sections/Announcements'
import Testimonial   from '../sections/Testimonial'
import CTABanner     from '../sections/CTABanner'
import HomeBunono    from './HomeBunono'

/* Nalugala (flagship) home — the established, structured design. */
function HomeNalugala() {
  return (
    <main>
      <Hero />
      <NewsTicker />
      <StatsBar />
      <Programs />
      <SchoolLife />
      <WhyChooseUs />
      <Campuses />
      <Announcements />
      <Testimonial />
      <CTABanner />
    </main>
  )
}

/* Each campus renders its OWN home design — Bunono is a wholly separate,
 * storybook layout so the two campuses never resemble each other. */
export default function Home() {
  const { campus } = useCampus()
  return campus === 'bunono' ? <HomeBunono /> : <HomeNalugala />
}
