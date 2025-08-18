import WalletPage from "@/UI/UserDashboard/WalletPage"

const Wallet = () => {
  return <WalletPage />
}

// Force dynamic rendering since this page requires authentication
export const dynamic = 'force-dynamic'

export default Wallet