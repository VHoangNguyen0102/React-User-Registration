import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
const API_URL = import.meta.env.VITE_BACKEND_API_URL;

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm<{ email: string; password: string }>();
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const mutation = useMutation({
  mutationFn: (values: { email: string; password: string }) => axios.post(`${API_URL}/user/login`, values),
    onSuccess: () => {
      navigate('/home', { state: { message: 'Đăng nhập thành công' } });
    },
    onError: (err: unknown) => {
      const e = err as { response?: { data?: { error?: string } }; message?: string };
      const msg = e?.response?.data?.error || e?.message || 'Login failed.';
      setError(msg);
    },
  });

  const onSubmit = (data: { email: string; password: string }) => {
    setError('');
    mutation.mutate(data);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Welcome back</h2>
        <p className="auth-sub">Sign in to your account to continue</p>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <input
            className="auth-input"
            type="email"
            placeholder="Email"
            aria-invalid={errors.email ? 'true' : 'false'}
            aria-describedby="login-email-error"
            {...register('email', { required: 'Email is required', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email' } })}
          />
          {errors.email && <span id="login-email-error" className="auth-error">{errors.email.message}</span>}

          <input
            className="auth-input"
            type="password"
            placeholder="Password"
            aria-invalid={errors.password ? 'true' : 'false'}
            aria-describedby="login-password-error"
            {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters' } })}
          />
          {errors.password && <span id="login-password-error" className="auth-error">{errors.password.message}</span>}

          <button type="submit" className="auth-button" disabled={mutation.status === 'pending'} aria-busy={mutation.status === 'pending'}>
            {mutation.status === 'pending' ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
        {error && <div className="auth-error">{error}</div>}
        <div className="auth-footer">Don't have an account? <Link to="/signup">Sign up</Link></div>
      </div>
    </div>
  );
}