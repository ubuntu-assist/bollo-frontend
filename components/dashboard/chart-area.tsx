'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import type { ApexOptions } from 'apexcharts'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

interface SeriesData {
  name: string
  type?: string
  data: number[]
}

interface ChartProps {
  title: string
  id: string
  selectedMonth: string
  onMonthSelect: (month: string) => void
}

const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

const ChartArea: React.FC = () => {
  const [selectedMonth1, setSelectedMonth1] = useState<string>('July')
  const [selectedMonth2, setSelectedMonth2] = useState<string>('July')
  const [isClient, setIsClient] = useState<boolean>(false)

  // Ensure client-side rendering
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Customer Impression Chart Options
  const customerImpressionOptions: ApexOptions = {
    series: [
      {
        name: 'Orders',
        type: 'area',
        data: [34, 65, 46, 68, 49, 61, 42, 44, 78, 52, 63, 67],
      },
      {
        name: 'Earnings',
        type: 'bar',
        data: [
          89.25, 98.58, 68.74, 108.87, 77.54, 84.03, 51.24, 28.57, 92.57, 42.36,
          88.51, 36.57,
        ],
      },
      {
        name: 'Refunds',
        type: 'line',
        data: [8, 12, 7, 17, 21, 11, 5, 9, 7, 29, 12, 35],
      },
    ],
    chart: {
      height: 400,
      type: 'line',
      toolbar: {
        show: false,
      },
      animations: {
        enabled: true,
        speed: 800,
      },
    },
    stroke: {
      curve: 'straight',
      dashArray: [0, 0, 8],
      width: [2, 0, 2.2],
    },
    fill: {
      opacity: [0.1, 0.9, 1],
    },
    markers: {
      size: [0, 0, 0],
      strokeWidth: 2,
      hover: {
        size: 4,
      },
    },
    xaxis: {
      categories: months,
    },
    grid: {
      show: true,
      borderColor: '#F5F6F7',
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: false,
        },
      },
      padding: {
        top: 0,
        right: -2,
        bottom: 15,
        left: 10,
      },
    },
    legend: {
      show: false,
    },
    plotOptions: {
      bar: {
        columnWidth: '30%',
        barHeight: '70%',
      },
    },
    colors: ['#FFC861', '#0065ff', '#00A385'],
    tooltip: {
      shared: true,
      y: [
        {
          formatter: (val: number | undefined) =>
            val !== undefined ? val.toFixed(0) : '',
        },
        {
          formatter: (val: number | undefined) =>
            val !== undefined ? `$${val.toFixed(2)}k` : '',
        },
        {
          formatter: (val: number | undefined) =>
            val !== undefined ? `${val.toFixed(0)} Sales` : '',
        },
      ],
    },
    responsive: [
      {
        breakpoint: 1400,
        options: {
          chart: {
            height: 280,
          },
        },
      },
      {
        breakpoint: 400,
        options: {
          chart: {
            height: 200,
          },
        },
      },
    ],
  }

  // Earning Overview Chart Options
  const earningOverviewOptions: ApexOptions = {
    series: [
      {
        name: 'Total Sales',
        data: [10, 80, 70, 65, 40, 88, 60, 99, 105],
      },
      {
        name: 'Total Expense',
        data: [13, 61, 70, 88, 68, 30, 100, 70, 98],
      },
      {
        name: 'Total Profit',
        data: [9, 38, 35, 52, 49, 70, 38, 22, 148],
      },
    ],
    chart: {
      height: 400,
      type: 'line',
      toolbar: {
        show: false,
      },
    },
    forecastDataPoints: {
      count: 3,
    },
    colors: ['#FFC861', '#00998B', '#5D69F4'],
    stroke: {
      width: 3,
    },
    xaxis: {
      type: 'category',
      categories: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
      ],
      tickAmount: 9,
      axisTicks: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
    },
    yaxis: {
      min: 0,
      max: 150,
      tickAmount: 6,
      labels: {
        offsetX: 0,
      },
    },
    fill: {
      colors: ['#FFC861', '#00998B', '#5D69F4'],
    },
    markers: {
      size: 6,
      colors: ['#fff'],
      strokeColors: ['#FFC861', '#00998B', '#5D69F4'],
      strokeWidth: 2,
      shape: 'circle',
      hover: {
        size: 8,
      },
    },
    dataLabels: {
      enabled: false,
      textAnchor: 'middle',
      distributed: false,
      offsetX: 0,
      offsetY: 0,
      background: {
        enabled: true,
        foreColor: '#fff',
        padding: 6,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#fff',
        opacity: 0.9,
      },
    },
    legend: {
      offsetY: 8,
      markers: {
        width: 4,
        height: 4,
        offsetX: -5,
      } as any, // Type assertion to bypass TypeScript error
      itemMargin: {
        horizontal: 20,
      },
    },
    grid: {
      borderColor: '#EBECEF',
      padding: {
        bottom: 16,
      },
    },
    responsive: [
      {
        breakpoint: 1400,
        options: {
          chart: {
            height: 280,
          },
        },
      },
      {
        breakpoint: 400,
        options: {
          chart: {
            height: 200,
          },
        },
      },
    ],
  }

  const MonthDropdown: React.FC<{
    selectedMonth: string
    id: string
    onSelect: (month: string) => void
  }> = ({ selectedMonth, id, onSelect }) => (
    <div
      className='relative flex cursor-pointer items-center justify-center gap-2 rounded-full border border-[#1B3B86]/10 bg-[#1B3B86]/5 px-4 py-2 text-sm font-medium text-gray-600 hover:border-[#1B3B86]/20'
      id={`monthModalButton${id}`}
    >
      <p className={`selectMonth${id}`}>{selectedMonth}</p>
      <i className='ph ph-caret-down text-[#1B3B86]'></i>
      <div
        className='modalClose absolute right-0 top-9 z-10 max-h-32 w-full origin-top-right overflow-y-auto rounded-xl border border-[#1B3B86]/10 bg-white p-3 shadow-sm duration-500 hidden'
        id={`monthModal${id}`}
      >
        <ul className='flex flex-col gap-3'>
          {months.map((month) => (
            <li
              key={month}
              className={`month${id} cursor-pointer text-gray-600 hover:text-[#E31C79] transition-colors`}
              onClick={() => onSelect(month)}
            >
              {month}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )

  const ChartCard: React.FC<ChartProps> = ({
    title,
    id,
    selectedMonth,
    onMonthSelect,
  }) => (
    <div className='col-span-12 rounded-2xl bg-white shadow-sm max-sm:pr-4 sm:px-8 sm:pt-6 lg:col-span-7'>
      <div className='flex items-center justify-between pb-4'>
        <p className='heading-4 text-gray-900 max-sm:px-4 max-sm:pt-4'>
          {title}
        </p>
        <MonthDropdown
          selectedMonth={selectedMonth}
          id={id}
          onSelect={onMonthSelect}
        />
      </div>
      <div className='relative h-px'>
        <div className='absolute left-0 top-0 h-full w-full bg-[#1B3B86]/5'></div>
      </div>
      <div className='pt-6'>
        {isClient && (
          <Chart
            options={
              id === '1' ? customerImpressionOptions : earningOverviewOptions
            }
            series={
              (id === '1'
                ? customerImpressionOptions.series
                : earningOverviewOptions.series) as SeriesData[]
            }
            type='line'
            height={400}
          />
        )}
      </div>
    </div>
  )

  return (
    <section>
      <div className='4xl:large-container grid grid-cols-12 gap-6 pt-6 max-4xl:container'>
        <ChartCard
          title='Weekly Work Summary'
          id='1'
          selectedMonth={selectedMonth1}
          onMonthSelect={setSelectedMonth1}
        />
        <div className='col-span-12 lg:col-span-5'>
          <ChartCard
            title='Total Earning Overview'
            id='2'
            selectedMonth={selectedMonth2}
            onMonthSelect={setSelectedMonth2}
          />
        </div>
      </div>
    </section>
  )
}

export default ChartArea
