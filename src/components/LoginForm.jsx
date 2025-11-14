import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { loginUser } from '../api/api';
import { useNavigate } from 'react-router';
import { notify } from '../utils/toastify';

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data) => {
    try {
      const response = await loginUser(data);
      if (!response) throw new Error('Server error');

      if (response.status === 200) {
        notify('success', response.message);
        navigate('/home');
      } else {
        notify('error', response.message || 'Login failed');
      }
    } catch (err) {
      notify('error', err.message || 'Something went wrong');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Email */}
      <label className="flex flex-col">
        <span className="inline-block self-start text-xs text-gray-600 ">
          Email:
        </span>
        <input
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Invalid email format',
            },
          })}
          type="email"
          placeholder="you@example.com"
          className={`mt-1 block w-full rounded-lg border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-200 ${
            errors.email ? 'border-red-300' : 'border-gray-200'
          }`}
        />
        {errors.email && (
          <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>
        )}
      </label>

      {/* Password */}
      <label className="flex flex-col">
        <span className="inline-block self-start text-xs text-gray-600 ">
          Password:
        </span>
        <div className="mt-1 relative">
          <input
            {...register('password', {
              required: 'Password is required',
            })}
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter password"
            className={`block w-full rounded-lg border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-200 ${
              errors.password ? 'border-red-300' : 'border-gray-200'
            }`}
          />
          <button
            type="button"
            onClick={() => setShowPassword((s) => !s)}
            className="absolute right-0 top-1/2 -translate-y-1/2 text-xs text-gray-500"
          >
            <span>{showPassword ? 'Hide' : 'Show'}</span>
          </button>
        </div>
        {errors.password && (
          <p className="mt-1 text-xs text-red-600">{errors.password.message}</p>
        )}
      </label>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full mt-2 inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium shadow-sm transition-all disabled:opacity-60 disabled:cursor-not-allowed"
        style={{
          background: 'linear-gradient(90deg,#6366f1,#8b5cf6)',
          color: 'white',
        }}
      >
        {isSubmitting ? 'Signing in...' : 'Login'}
      </button>
    </form>
  );
}
