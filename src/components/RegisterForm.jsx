import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const password = watch('password', '');

  const onSubmit = async (data) => {
    // Simulate API call
    await new Promise((r) => setTimeout(r, 800));
    console.log('Registered user:', data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Full name field */}
      <label className="block">
        <div className="flex">
          <span className="text-xs text-gray-600">Full name:</span>
        </div>
        <input
          {...register('name', {
            required: 'Name is required',
            minLength: { value: 2, message: 'Too short' },
          })}
          type="text"
          placeholder="Jane Doe"
          className={`mt-1 block w-full rounded-lg border px-3 py-2 text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-200 ${
            errors.name ? 'border-red-300' : 'border-gray-200'
          }`}
        />
        {errors.name && (
          <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>
        )}
      </label>

      {/* Email field */}
      <label className="block">
        <div className="flex">
          <span className="text-xs text-gray-600">Email:</span>
        </div>
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
          className={`mt-1 block w-full rounded-lg border px-3 py-2 text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-200 ${
            errors.email ? 'border-red-300' : 'border-gray-200'
          }`}
        />
        {errors.email && (
          <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>
        )}
      </label>

      {/* Password field */}
      <label className="block">
        <div className="flex">
          <span className="text-xs text-gray-600">Password:</span>
        </div>
        <div className="mt-1 relative">
          <input
            {...register('password', {
              required: 'Password is required',
              minLength: { value: 6, message: 'Password too short' },
            })}
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter password"
            className={`block w-full rounded-lg border px-3 py-2 text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-200 ${
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

      {/* Confirm password field */}
      <label className="block">
        <div className="flex">
          <span className="text-xs text-gray-600">Confirm password:</span>
        </div>
        <input
          {...register('confirm', {
            required: 'Please confirm password',
            validate: (value) => value === password || "Passwords don't match",
          })}
          type={showPassword ? 'text' : 'password'}
          placeholder="Repeat password"
          className={`mt-1 block w-full rounded-lg border px-3 py-2 text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-200 ${
            errors.confirm ? 'border-red-300' : 'border-gray-200'
          }`}
        />
        {errors.confirm && (
          <p className="mt-1 text-xs text-red-600">{errors.confirm.message}</p>
        )}
      </label>

      {/* Submit button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full mt-1 inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium shadow-sm transition-all disabled:opacity-60 disabled:cursor-not-allowed"
        style={{
          background: 'linear-gradient(90deg,#6366f1,#8b5cf6)',
          color: 'white',
        }}
      >
        {isSubmitting ? 'Creating...' : 'Create account'}
      </button>

      {isSubmitSuccessful && (
        <p className="text-center text-sm text-green-600">
          Account created successfully ✅
        </p>
      )}
    </form>
  );
}
