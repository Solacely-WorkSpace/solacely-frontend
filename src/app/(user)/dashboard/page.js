import DashboardPage from "@/UI/UserDashboard/DashboardPage"

const Dashboard = () => {
  return <DashboardPage />
}

// Force dynamic rendering since this page requires authentication
export const dynamic = 'force-dynamic'

export default Dashboard