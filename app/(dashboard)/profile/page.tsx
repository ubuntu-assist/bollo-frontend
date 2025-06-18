import Link from 'next/link'

const Profile = () => {
  return (
    <section>
      <div className='4xl:large-container grid grid-cols-12 gap-4 rounded-2xl bg-white p-4 max-4xl:mx-4 sm:gap-6 sm:p-10'>
        <div className='col-span-12 flex items-center justify-between gap-4'>
          <h4 className='heading-4'>Profile Information</h4>
          <Link
            href='/edit-profile'
            className='flex items-center justify-start gap-3 text-lg font-medium text-b300'
          >
            <i className='ph ph-pencil-simple-line text-2xl'></i>Edit Profile
          </Link>
        </div>
        <div className='col-span-12 sm:col-span-6'>
          <p className='pb-3 font-medium text-n100'>Name:</p>
          <input
            type='text'
            placeholder='Jhon Dhoe'
            readOnly
            className='w-full rounded-xl border border-b50 bg-n10 p-3 outline-none placeholder:text-n800'
          />
        </div>
        <div className='col-span-12 sm:col-span-6'>
          <p className='pb-3 font-medium text-n100'>Area:</p>
          <input
            type='text'
            placeholder='New york'
            readOnly
            className='w-full rounded-xl border border-b50 bg-n10 p-3 outline-none placeholder:text-n800'
          />
        </div>
        <div className='col-span-12 sm:col-span-6'>
          <p className='pb-3 font-medium text-n100'>Email:</p>
          <input
            type='text'
            placeholder='example@mail.com'
            readOnly
            className='w-full rounded-xl border border-b50 bg-n10 p-3 outline-none placeholder:text-n800'
          />
        </div>
        <div className='col-span-12 sm:col-span-6'>
          <p className='pb-3 font-medium text-n100'>Post Code:</p>
          <input
            type='text'
            placeholder='1234'
            readOnly
            className='w-full rounded-xl border border-b50 bg-n10 p-3 outline-none placeholder:text-n800'
          />
        </div>
        <div className='col-span-12 sm:col-span-6'>
          <p className='pb-3 font-medium text-n100'>Phone:</p>
          <input
            type='text'
            placeholder='+1234567'
            readOnly
            className='w-full rounded-xl border border-b50 bg-n10 p-3 outline-none placeholder:text-n800'
          />
        </div>
        <div className='col-span-12 sm:col-span-6'>
          <p className='pb-3 font-medium text-n100'>Address:</p>
          <input
            type='text'
            placeholder='3517 W. Gray St. Utica, Pennsylvani'
            readOnly
            className='w-full rounded-xl border border-b50 bg-n10 p-3 outline-none placeholder:text-n800'
          />
        </div>
        <div className='col-span-12'>
          <p className='pb-3 font-medium text-n100'>About:</p>
          <textarea
            placeholder='We understand that every space is unique, which is why we tailor our cleaning services to meet the specific needs and preferences of each client. Our team of experienced and trained cleaners uses industry-leading techniques, equipment, and eco-friendly products to deliver superior results while minimizing environmental impact.'
            readOnly
            className='min-h-40 w-full rounded-xl border border-b50 bg-n10 p-3 outline-none placeholder:text-n800'
          ></textarea>
        </div>
      </div>
    </section>
  )
}

export default Profile
