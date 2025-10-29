import { Outlet, Link, useLocation } from 'react-router';

export default function AuthPage() {
  const location = useLocation();
  const isAuthRoute =
    location.pathname === '/auth/login' ||
    location.pathname === '/auth/register';

  return (
    <div className="page min-h-screen flex items-center justify-center from-gray-50 to-gray-100 px-4">
      <div className="w-full max-w-md">
        {/* Auth card */}
        <div className="bg-white/80 backdrop-blur-sm shadow-lg rounded-2xl p-8 border border-gray-100">
          {/* Header with title and toggle button */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl ml-0.5 font-semibold text-gray-800">
              Welcome to our app!
            </h2>
          </div>

          {/* Render either welcome + buttons or child form */}
          {isAuthRoute ? (
            <Outlet />
          ) : (
            <div className="flex flex-col items-center gap-4">
              <p className="text-center text-gray-600 mb-4">
                Please choose an option to continue:
              </p>
              <div className="flex gap-4">
                <button>
                  <Link to="login" className="">
                    Login
                  </Link>
                </button>
                <button>
                  <Link to="register" className="">
                    Register
                  </Link>
                </button>
              </div>
            </div>
          )}
          <div className="flex justify-end mt-4">
            {location.pathname === '/auth/login' ? (
              <Link
                to="register"
                className="text-sm text-indigo-600 decoration-indigo-600"
              >
                <span className="hover:underline underline-offset-5">
                  Need to create account?
                </span>
              </Link>
            ) : location.pathname === '/auth/register' ? (
              <Link
                to="login"
                className="inline text-sm text-indigo-600 decoration-indigo-600"
              >
                <span className="hover:underline underline-offset-5">
                  Already have an account?
                </span>
              </Link>
            ) : null}
          </div>
        </div>

        {/* Footer text */}
        <p className="mt-6 text-center text-xs text-gray-500">
          By continuing you agree to the terms and privacy.
        </p>
      </div>
    </div>
  );
}
