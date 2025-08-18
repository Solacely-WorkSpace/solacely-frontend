import ProfilePage from "@/UI/UserDashboard/ProfilePage"

const Profile = () => {
  return <ProfilePage />
}

// Force dynamic rendering since this page requires authentication
export const dynamic = 'force-dynamic'

export default Profile