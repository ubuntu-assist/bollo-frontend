const UserInformation = () => {
  const statCards = [
    {
      icon: 'ph-list-checks',
      label: 'Order',
      value: 145,
      bg: 'bg-[#1B3B86]',
    },
    {
      icon: 'ph-currency-dollar-simple',
      label: 'Earning',
      value: 7500,
      prefix: '$',
      bg: 'bg-[#E31C79]',
    },
    {
      icon: 'ph-money',
      label: 'Balance',
      value: 4205,
      bg: 'bg-[#1B3B86]',
    },
    {
      icon: 'ph-person',
      label: 'Repeat Buyer',
      value: 740,
      bg: 'bg-[#E31C79]',
    },
  ]

  const statsOverview = [
    {
      icon: 'ph-list-checks',
      label: 'Order Pending',
      value: 17,
      bg: 'bg-[#E31C79]',
    },
    {
      icon: 'ph-handshake',
      label: 'Order Completed',
      value: 2740,
      bg: 'bg-[#1B3B86]',
    },
    {
      icon: 'ph-currency-circle-dollar',
      label: 'Total Earning',
      value: 7,
      bg: 'bg-[#E31C79]',
    },
    { icon: 'ph-money', label: 'Balance', value: 1204, bg: 'bg-[#1B3B86]' },
  ]

  return (
    <section>
      <div className='4xl:large-container grid grid-cols-12 gap-6 max-4xl:container'>
        <div className='col-span-12 xxl:col-span-9'>
          {/* Header Stats */}
          <div className='sbp-15 flex w-full items-start justify-between gap-6 max-md:flex-col md:items-center md:gap-3'>
            <h3 className='heading-3 text-gray-900'>
              User <br />
              Information
            </h3>
            <div className='flex items-center justify-start gap-6 max-lg:flex-wrap 3xl:gap-12'>
              {statsOverview.map((stat, index) => (
                <div
                  key={index}
                  className='flex items-center justify-start gap-3'
                >
                  <div
                    className={`flex items-center justify-center rounded-full ${stat.bg} text-white p-[14px] text-3xl !leading-none`}
                  >
                    <i className={`ph ${stat.icon}`}></i>
                  </div>
                  <div>
                    <p className='text-2xl font-medium text-gray-900'>
                      {stat.value}
                    </p>
                    <p className='font-medium text-gray-500'>{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Monthly Summary */}
          <div className='w-full rounded-2xl bg-white p-8 shadow-sm'>
            <h4 className='heading-4 text-gray-900'>This Month Summary</h4>
            <div className='grid grid-cols-12 gap-3 pt-6'>
              {statCards.map((card, index) => (
                <div
                  key={index}
                  className={`col-span-12 rounded-2xl ${card.bg} px-8 py-6 sm:col-span-6 xxl:col-span-3`}
                >
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center justify-start gap-3'>
                      <div className='flex items-center justify-center rounded-full bg-white/90 p-3 text-2xl !leading-none text-[#1B3B86]'>
                        <i className={`ph ${card.icon}`}></i>
                      </div>
                      <p className='text-lg font-medium text-white'>
                        {card.label}
                      </p>
                    </div>
                    <a
                      href='./payment-details'
                      className='-mr-4 -mt-4 flex items-center justify-center rounded-full border border-white/20 p-3 !leading-none text-white hover:bg-white/10 transition-colors'
                    >
                      <i className='ph ph-arrow-up-right'></i>
                    </a>
                  </div>
                  <div className='flex items-center justify-between pt-8'>
                    <p className='heading-3 text-white'>
                      {card.prefix || ''}
                      <span
                        className='odometer'
                        data-odometer-final={card.value}
                      >
                        0
                      </span>
                    </p>
                    <div className='flex'>
                      {[1, 2, 3].map((img, idx) => (
                        <img
                          key={img}
                          src='/assets/images/review_people_1.png'
                          alt=''
                          className={`size-10 rounded-full bg-white p-0.5 ${
                            idx !== 0 ? '-ml-4' : ''
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Profile Card */}
        <div className='col-span-12 xxl:col-span-3'>
          <div className='rounded-xl border border-[#1B3B86]/10 bg-white p-8 shadow-sm'>
            <div className='flex items-start justify-between'>
              <p className='rounded-full bg-[#E31C79] px-2 py-1 text-sm font-medium text-white'>
                PRO
              </p>
              <div>
                <div>
                  <img src='/assets/images/review_img.png' alt='' />
                </div>
                <div className='flex gap-2 pt-2'>
                  <p className='flex items-center justify-start gap-2 text-sm font-semibold !leading-none'>
                    <i className='ph-fill ph-star text-[#E31C79]'></i>
                    <span className='text-[#1B3B86]'>4.4</span>
                    <span className='text-gray-500'>(45)</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Profile Hexagon */}
            <div className='flex flex-col items-center justify-center py-3.5'>
              <div className='max-md:overflow-hidden'>
                <div className='hexagon-styles my-[calc(160px*0.5/2)] h-[calc(160px*0.57736720554273)] w-[160px] rounded-[calc(160px/36.75)] bg-[#1B3B86]/5 before:rounded-[calc(160px/18.75)] after:rounded-[calc(160px/18.75)]'>
                  <div className='absolute -top-[32px] left-[8px]'>
                    <div className='hexagon-styles z-10 my-[calc(144px*0.5/2)] h-[calc(144px*0.57736720554273)] w-[144px] rounded-[calc(144px/50)] bg-[#1B3B86] before:rounded-[calc(144px/50)] after:rounded-[calc(144px/50)]'>
                      <div className='absolute -top-[31px] left-[5px] z-20'>
                        <div className='hexagon-styles z-10 my-[calc(134px*0.5/2)] h-[calc(134px*0.57736720554273)] w-[134px] rounded-[calc(134px/50)] bg-[#1B3B86]/5 before:rounded-[calc(134px/50)] after:rounded-[calc(134px/50)]'>
                          <div className='r-hex3 absolute -left-0.5 -top-[30px] z-30 inline-block w-[138px] overflow-hidden'>
                            <div className='r-hex-inner3'>
                              <div className='expertImgBig r-hex-inner-3 before:h-[138px] before:bg-cover'></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Profile Info */}
              <div className='flex w-full flex-col items-center justify-center border-b border-[#1B3B86]/10 pb-6 pt-3'>
                <div className='flex-col items-center justify-center gap-3'>
                  <h5 className='heading-5 text-gray-900'>Duclair Fopa</h5>
                </div>
                <p className='pt-2 text-gray-500'>Addis Ababa, Ethiopia</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className='flex items-center justify-center gap-3'>
              {[
                'pencil-simple-line',
                'envelope-simple',
                'phone',
                'plus',
                'calendar-plus',
              ].map((icon, index) => (
                <div
                  key={index}
                  className='flex cursor-pointer items-center justify-center rounded-full bg-[#1B3B86]/5 p-3 !leading-none text-[#1B3B86] hover:bg-[#E31C79] hover:text-white transition-colors'
                >
                  <i className={`ph-bold ph-${icon}`}></i>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default UserInformation
