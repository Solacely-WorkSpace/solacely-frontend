import AuthIllustration from "@/UI/Onboarding/components/AuthIllustration";

export default function AuthLayout({ children }) {
  return (
    <main className='flex flex-col md:flex-row w-screen min-h-screen '>
      <div className='h-svh h-screen w-[400px] p-12 hidden md:block'>
      </div>

      <AuthIllustration />

      {children}
    </main>
  );
}
