import { useState } from 'react'
import RegisterForm from '../components/RegisterForm'
import LoginForm from '../components/LoginForm'


export default function AuthPage() {
const [isLogin, setIsLogin] = useState(true)


return (
<div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 px-4">
<div className="w-full max-w-md">
{/* Auth card */}
<div className="bg-white/80 backdrop-blur-sm shadow-lg rounded-2xl p-8 border border-gray-100">
{/* Header with title and toggle button */}
<div className="flex justify-between items-center mb-6">
<h2 className="text-2xl font-semibold text-gray-800">
{isLogin ? 'Welcome back' : 'Create account'}
</h2>
<button
onClick={() => setIsLogin(!isLogin)}
className="text-sm text-indigo-600 hover:underline"
>
{isLogin ? 'Register' : 'Login'}
</button>
</div>


{/* Render the corresponding form */}
{isLogin ? <LoginForm /> : <RegisterForm />}
</div>


{/* Footer text */}
<p className="mt-6 text-center text-xs text-gray-500">
By continuing you agree to the terms and privacy.
</p>
</div>
</div>
)
}