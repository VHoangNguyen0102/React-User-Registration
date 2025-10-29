import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
const API_URL = import.meta.env.VITE_BACKEND_API_URL;

type FormData = {
  email: string;
  password: string;
};

export default function SignUp() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const mutation = useMutation({
  mutationFn: (values: FormData) => axios.post(`${API_URL}/user/register`, values),
    onSuccess: () => {
      navigate('/home', { state: { message: 'Đăng ký thành công' } });
    },
    onError: (err: unknown) => {
      // axios error
      const e = err as { response?: { data?: { error?: string } }; message?: string };
      const msg = e?.response?.data?.error || e?.message || 'Registration failed.';
      setError(msg);
    },
  });

  const onSubmit = (data: FormData) => {
    setMessage('');
    setError('');
    mutation.mutate(data);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Create your account</h2>
        <p className="auth-sub">Start your free account — no credit card required.</p>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <input
            className="auth-input"
            type="email"
            placeholder="Email"
            aria-invalid={errors.email ? 'true' : 'false'}
            aria-describedby="email-error"
            {...register('email', { required: 'Email is required', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email' } })}
          />
          {errors.email && <span id="email-error" className="auth-error">{errors.email.message}</span>}

          <input
            className="auth-input"
            type="password"
            placeholder="Password"
            aria-invalid={errors.password ? 'true' : 'false'}
            aria-describedby="password-error"
            {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters' } })}
          />
          {errors.password && <span id="password-error" className="auth-error">{errors.password.message}</span>}

          <button type="submit" className="auth-button" disabled={mutation.status === 'pending'} aria-busy={mutation.status === 'pending'}>
            {mutation.status === 'pending' ? 'Creating...' : 'Create account'}
          </button>
        </form>

        {message && <div className="auth-success">{message}</div>}
        {error && <div className="auth-error">{error}</div>}

        <div className="auth-footer">Already have an account? <Link to="/login">Sign in</Link></div>
      </div>
    </div>
  );
}