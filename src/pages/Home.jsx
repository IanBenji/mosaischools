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

export default function Home() {
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
