import LoginForm from "@/components/LoginForm";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="h-48 bg-gradient-to-br from-blue-900 to-blue-600 relative">
        <div className="max-w-6xl mx-auto h-full flex items-center px-6">
        </div>
      
      </div>

      {/* Centered login card */}
      <section className="relative -mt-16 flex justify-center px-4">
        <div className="w-full max-w-md">
          <div className="rounded-2xl bg-white shadow-xl border">
            <div className="px-8 pt-8 pb-4 text-center">
              <div className="text-xs text-gray-500">Welcome to</div>
              <div className="text-2xl font-extrabold tracking-wide">
                Camera<span className="text-blue-600">View</span>
              </div>
            </div>
            <div className="border-t" />
            <div className="px-8 py-6">
              <LoginForm />
            </div>
            <div className="px-8 pb-6 flex items-center justify-between text-sm text-gray-500">
              <a className="hover:text-blue-600" href="/forgot-password">Forgot Password</a>
              <a className="hover:text-blue-600" href="/register">Create New Account</a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
