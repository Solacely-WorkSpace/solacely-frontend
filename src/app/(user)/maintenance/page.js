import MaintenancePage from "@/UI/UserDashboard/MaintenancePage"

const Maintenance = () => {
  return <MaintenancePage />
}

// Force dynamic rendering since this page requires authentication
export const dynamic = 'force-dynamic'

export default Maintenance