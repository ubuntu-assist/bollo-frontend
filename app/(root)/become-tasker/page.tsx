import BecomeYourBossSection from '@/components/become-tasker/become-your-boss'
import BrowseJobsSection from '@/components/become-tasker/browse-jobs-section'
import CompleteJobSection from '@/components/become-tasker/complete-job-section'
import FaqSection from '@/components/become-tasker/faq-section'
import FeaturesSection from '@/components/become-tasker/features-section'
import SetYourPriceSection from '@/components/become-tasker/set-your-price-section'

const BecomeTasker = () => {
  return (
    <>
      <BecomeYourBossSection />
      <FeaturesSection />
      <BrowseJobsSection />
      <SetYourPriceSection />
      <CompleteJobSection />
      <FaqSection />
    </>
  )
}

export default BecomeTasker
