import HeroSection from '@/components/common/hero-section'
import HowItWorksSection from '@/components/common/how-it-works-section'
import NewsletterSection from '@/components/common/newsletter-section'
import FixedPriceServiceSection from '@/components/landing/fixed-prize-service-section'
import GetHelpSection from '@/components/landing/get-help-section'
import GetWorkersGigs from '@/components/landing/get-workers-gigs'
import LookingForServiceSection from '@/components/landing/looking-for-service-section'
import SecureGuardSection from '@/components/landing/secure-guard-section'
import TopExpertsSection from '@/components/landing/top-experts-section'

const Home = () => {
  return (
    <>
      <HeroSection />
      <HowItWorksSection />
      <FixedPriceServiceSection />
      <TopExpertsSection />
      <LookingForServiceSection />
      <NewsletterSection />
      <SecureGuardSection />
      <GetWorkersGigs />
      <GetHelpSection />
    </>
  )
}

export default Home
