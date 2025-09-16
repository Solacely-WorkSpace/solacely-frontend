import { Suspense } from 'react'
import SignInPage from "@/UI/Onboarding/SignInPage"

const SingIn = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignInPage />
    </Suspense>
  )
}

export default SingIn