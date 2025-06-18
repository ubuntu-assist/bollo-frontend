import { Feature } from '@/types/feature'

const FeatureCard = ({ icon, title, description }: Feature) => (
  <div className='col-span-12 flex flex-col items-center justify-start rounded-full border border-[#1B3B86]/10 px-6 py-10 text-center min-[400px]:col-span-6 sm:px-8 sm:py-20 lg:col-span-3 lg:py-10 xl:py-20 transition-all duration-300 hover:border-[#E31C79]/20 hover:bg-[#1B3B86]/5'>
    <div className='flex items-center justify-center rounded-full bg-[#1B3B86]/5 p-6 transition-colors duration-300 group-hover:bg-[#E31C79]/5'>
      <i
        className={`ph-bold ${icon} text-4xl !leading-none text-[#1B3B86] group-hover:text-[#E31C79]`}
      ></i>
    </div>
    <p className='heading-5 pb-3 pt-8 text-gray-900'>{title}</p>
    <p className='font-medium text-gray-600'>{description}</p>
  </div>
)

const FeaturesSection = () => {
  const features = [
    {
      icon: 'ph-file-text',
      title: 'All on your terms',
      description: 'Find jobs that fit your skills and schedule.',
    },
    {
      icon: 'ph-thumbs-up',
      title: 'Get going for free',
      description: 'Join for free and start earning straight away.',
    },
    {
      icon: 'ph-lock',
      title: 'Payments on lock',
      description: 'Direct bank payments upon task completion assured.',
    },
    {
      icon: 'ph-currency-dollar-simple',
      title: 'Skills can thrill',
      description: 'Design Logos, Declutter Homes, and More!',
    },
  ]

  return (
    <section className='sbp-30'>
      <div className='container grid grid-cols-12 gap-6'>
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
    </section>
  )
}

export default FeaturesSection
