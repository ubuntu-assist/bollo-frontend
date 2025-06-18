interface OrderTableRow {
  clientName: string
  status: 'complete' | 'inprogress' | 'pending'
  location: string
  price: string
}

interface TodoItem {
  text: string
  completed?: boolean
}

const TodoOrderSection = () => {
  const orders: OrderTableRow[] = [
    {
      clientName: 'Gilbert Lawson',
      status: 'complete',
      location: 'Zefwewine',
      price: '$1862',
    },
    {
      clientName: 'Esther Barnett',
      status: 'inprogress',
      location: 'Wavgulpat',
      price: '$418',
    },
    {
      clientName: 'Elva Allen',
      status: 'complete',
      location: 'Genipi',
      price: '$5447',
    },
    {
      clientName: 'Donald Trump',
      status: 'pending',
      location: 'Adrozgi',
      price: '$1187',
    },
    {
      clientName: 'Bruce Farmer',
      status: 'pending',
      location: 'Zakisazu',
      price: '$6109',
    },
    {
      clientName: 'Harry Byrd',
      status: 'complete',
      location: 'Ukroke',
      price: '$9887',
    },
  ]

  const todos: TodoItem[] = [
    { text: 'It is a long established fact that a reader will be distracted.' },
    { text: 'It is a long established fact that a reader will be distracted.' },
    { text: 'It is a long established fact that a reader will be distracted.' },
    { text: 'It is a long established fact that a reader will be distracted.' },
  ]

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'complete':
        return 'bg-[#1B3B86]/10 text-[#1B3B86]'
      case 'inprogress':
        return 'bg-[#E31C79]/10 text-[#E31C79]'
      case 'pending':
        return 'bg-yellow-100 text-yellow-600'
      default:
        return 'bg-gray-100 text-gray-600'
    }
  }

  return (
    <section>
      <div className='4xl:large-container grid grid-cols-12 gap-6 pt-6 max-4xl:container'>
        {/* Orders Table */}
        <div className='col-span-12 rounded-2xl bg-white px-6 py-8 shadow-sm max-sm:overflow-x-auto lg:col-span-8'>
          <table className='w-full text-nowrap'>
            <thead>
              <tr className='w-full bg-[#1B3B86]/5 text-center text-lg font-semibold text-gray-900'>
                <th className='py-4'>Client Name</th>
                <th className='py-4'>Status</th>
                <th className='py-4'>Location</th>
                <th className='py-4'>Price</th>
              </tr>
            </thead>
            <tbody className='text-center font-medium text-gray-600'>
              {orders.map((order, index) => (
                <tr key={index} className='w-full'>
                  <td className='py-3'>{order.clientName}</td>
                  <td>
                    <div
                      className={`rounded-full px-8 py-2 text-xs ${getStatusStyle(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </div>
                  </td>
                  <td className='px-6'>{order.location}</td>
                  <td>{order.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Todo List */}
        <div className='col-span-12 rounded-2xl bg-white px-6 py-8 shadow-sm lg:col-span-4'>
          <div className='flex items-center justify-between pb-6'>
            <p className='heading-4 text-gray-900'>To Do List</p>
            <div className='flex cursor-pointer items-center justify-start gap-2 rounded-full border border-[#1B3B86]/10 bg-[#1B3B86]/5 px-4 py-2 text-sm font-medium text-gray-600 hover:border-[#1B3B86]/20 transition-colors'>
              <p>See More</p>
              <i className='ph ph-caret-right text-[#1B3B86]'></i>
            </div>
          </div>

          <div className='relative h-px'>
            <div className='absolute left-0 top-0 h-full w-full bg-[#1B3B86]/10'></div>
          </div>

          <div className='flex flex-col gap-6 pt-6 font-medium text-gray-600'>
            {todos.map((todo, index) => (
              <div key={index} className='flex items-start justify-start gap-3'>
                <i className='ph ph-check-square text-2xl text-[#1B3B86] hover:text-[#E31C79] transition-colors cursor-pointer'></i>
                <p className='lg:max-w-[400px]'>{todo.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default TodoOrderSection
