import ChartArea from '@/components/dashboard/chart-area'
import TodoOrderSection from '@/components/dashboard/todo-order-section'
import UserInformation from '@/components/dashboard/user-info'

const Dashboard = () => {
  return (
    <>
      <UserInformation />
      <ChartArea />
      <TodoOrderSection />
    </>
  )
}

export default Dashboard
