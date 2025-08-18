import WishlistPage from "@/UI/UserDashboard/WishlistPage"

const Wishlist = () => {
  return <WishlistPage />
}

// Force dynamic rendering since this page requires authentication
export const dynamic = 'force-dynamic'

export default Wishlist