import EarntrcPage from "@/UI/UserDashboard/EarnTRCPage"

const EarnTRC = () => {
  return <EarntrcPage />
}

// Force dynamic rendering since this page requires authentication
export const dynamic = 'force-dynamic'

export default EarnTRC