'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/swiper-bundle.css'

import { useEffect, useRef } from 'react'
import Link from 'next/link'

interface SliderContent {
  img: string
  title: string
  bg: string
  desc: string
}

interface CircleTextRef extends HTMLDivElement {
  innerText: string
  innerHTML: string
}

const HeroSection = () => {
  const circleTextRef = useRef<CircleTextRef>(null)

  useEffect(() => {
    if (circleTextRef.current) {
      const text: string = circleTextRef.current.innerText
      const chars: string[] = text.split('')
      const anglePerChar: number = 360 / chars.length

      circleTextRef.current.innerHTML = chars
        .map(
          (char: string, i: number): string =>
            `<span class="absolute left-1/2 origin-[0_75px]" style="transform:rotate(${
              i * anglePerChar
            }deg)">${char}</span>`
        )
        .join('')
    }
  }, [])

  const sliderContent: SliderContent[] = [
    {
      img: '/assets/images/hero_slider_img_1.png',
      title: 'Handyman',
      bg: 'bg-[#1B3B86]',
      desc: 'Fixing, Repairing, and Improving Your Spaces.',
    },
    {
      img: '/assets/images/hero_slider_img_2.png',
      title: 'Cleaning',
      bg: 'bg-[#E31C79]',
      desc: 'Expert Cleaning Services for Sparkling Homes and Offices.',
    },
    {
      img: '/assets/images/hero_slider_img_3.png',
      title: 'Photography',
      bg: 'bg-[#1B3B86]',
      desc: 'Expert Photography Services for Your Special Moments.',
    },
    {
      img: '/assets/images/hero_slider_img_4.png',
      title: 'Renovation',
      bg: 'bg-[#E31C79]',
      desc: 'Expert Renovation Services Available Now.',
    },
  ]

  return (
    <section className='relative bg-[#1B3B86]/5 pt-30 sm:pt-40 xl:pt-52'>
      <div className='container relative grid grid-cols-12 max-xl:overflow-x-hidden max-md:gap-6 lg:-mb-10'>
        {/* Left Column */}
        <div
          className='col-span-12 flex flex-col items-start justify-center sm:col-span-10 md:col-span-6 lg:col-span-5'
          data-aos='fade-right'
          data-aos-duration='1500'
        >
          <h5 className='heading-5 pb-3 font-[700] text-[#E31C79]'>
            Your Trusted Service Partner
          </h5>
          <div className='relative'>
            <h1 className='sm:display-3 text-[32px] font-[800] text-gray-900 max-sm:pr-10'>
              Find the Right <span className='text-[#1B3B86]'>Talent</span> for
              Any Task
            </h1>

            {/* Profile Images */}
            <div className='absolute -bottom-2 right-2 flex items-center justify-start rounded-full border border-[#1B3B86]/20 p-1 max-[450px]:hidden sm:bottom-0 sm:right-12 md:right-32 lg:right-20 xl:bottom-2 xl:right-28 xxl:right-44'>
              {[1, 2, 3, 4].map((num) => (
                <div
                  key={num}
                  className='-ml-2 first:ml-0 overflow-hidden rounded-full bg-white p-0.5 max-lg:size-8 lg:-ml-4'
                >
                  <img
                    src='/assets/images/people_small1.png'
                    alt='people small'
                    className='rounded-full'
                  />
                </div>
              ))}
              <div className='-ml-2 max-lg:size-8 lg:-ml-4'>
                <img
                  src='/assets/images/people_plus.png'
                  alt=''
                  className='rounded-full'
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div
          className='col-span-12 flex flex-col items-start justify-center sm:col-span-10 md:col-span-5 lg:col-span-4 lg:col-start-9'
          data-aos='fade-left'
          data-aos-duration='1500'
        >
          <p className='pb-6 font-semibold text-gray-600'>
            Access assistance from a vast network of reliable local experts.
          </p>

          {/* CTA Button */}
          <div>
            <Link
              href='/services'
              className='group relative flex items-center justify-start pr-12 font-semibold'
            >
              <span className='rounded-full bg-[#E31C79] text-white px-6 py-3 duration-500 group-hover:translate-x-12'>
                Explore Now
              </span>
              <i className='ph-bold ph-arrow-up-right absolute right-0 top-0 translate-x-0 rounded-full bg-[#E31C79] text-white p-[14px] text-xl !leading-none duration-500 group-hover:right-[152px] group-hover:rotate-45'></i>
            </Link>
          </div>

          {/* Rating Section */}
          <div className='flex items-center justify-start gap-6 pt-3'>
            <p className='display-4 font-[800] text-[#1B3B86]'>4.7</p>
            <div>
              <p className='font-medium text-gray-900'>
                Based on 10,000+ review on
              </p>
              <div className='text-xl text-[#E31C79]'>
                {[...Array(4)].map((_, i) => (
                  <i key={i} className='ph-fill ph-star'></i>
                ))}
                <i className='ph-fill ph-star-half'></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Circular Badge */}
      <div className='relative z-20'>
        <div className='-mb-20 flex items-center justify-center max-lg:hidden'>
          <div className='relative flex h-[160px] w-[160px] items-center justify-center rounded-full bg-white text-white'>
            <div className='logo absolute z-10 flex h-[100px] w-[100px] items-center justify-center rounded-full border border-white text-5xl !leading-none text-[#1B3B86]'>
              <i className='ph ph-paper-plane-tilt'></i>
            </div>
            <div
              ref={circleTextRef}
              className='circle absolute h-[95%] w-[95%] rounded-full bg-[#E31C79] font-medium'
            >
              <p>On Demand Service Available*</p>
            </div>
          </div>
        </div>
      </div>

      {/* Service Slider */}
      <div className='stp-15'>
        <Swiper
          className='hero-service-carousel smooth'
          modules={[Autoplay]}
          loop={true}
          speed={12000}
          autoplay={{
            delay: 1,
            disableOnInteraction: false,
          }}
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{
            0: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            300: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            350: {
              slidesPerView: 1.3,
              spaceBetween: 10,
            },
            450: {
              slidesPerView: 1.5,
              spaceBetween: 10,
            },
            700: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            1100: {
              slidesPerView: 3,
              spaceBetween: 24,
              centeredSlides: true,
            },
          }}
        >
          {sliderContent.map((slide, index) => (
            <SwiperSlide key={index}>
              <div
                className={`relative flex flex-col items-end justify-start gap-10 rounded-md ${slide.bg} pl-6 pt-4 md:pt-8 3xl:gap-3 3xl:px-8`}
              >
                <a
                  href='./find-workers'
                  className='flex items-center justify-center rounded-full bg-white text-[#1B3B86] p-3 !leading-none duration-500 hover:rotate-45 hover:bg-[#E31C79] hover:text-white max-3xl:mr-4'
                >
                  <i className='ph-bold ph-arrow-up-right'></i>
                </a>
                <div className='h-full'>
                  <img
                    src={slide.img}
                    alt={slide.title}
                    className='max-h-full self-stretch'
                  />
                </div>
                <div className='absolute left-4 top-4 md:top-8 lg:left-8'>
                  <p className='heading-2 pb-3 text-white'>{slide.title}</p>
                  <p className='max-w-[240px] font-medium text-white max-sm:text-sm'>
                    {slide.desc}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}

export default HeroSection
