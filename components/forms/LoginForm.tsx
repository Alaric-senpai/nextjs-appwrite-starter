'use client';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAction } from 'next-safe-action/hooks';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';

import { LoginformSchema } from '@/lib/form-schema';
import { LoginserverAction } from '@/actions/auth.actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Password } from '@/components/ui/password';
import { SocialLogin } from '@/components/forms/SocialLogin';
import { ForgotPasswordDialog } from '@/components/forms/ForgotPasswordDialog';
import { AlertCircle } from 'lucide-react';

type LoginFormValues = z.infer<typeof LoginformSchema>;

export function LoginForm() {
  const router = useRouter();
  const [globalError, setGlobalError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LoginFormValues>({
    resolver: zodResolver(LoginformSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { execute, isExecuting } = useAction(LoginserverAction, {
    onSuccess: ({ data }) => {
      if (data?.success && data.data) {
        reset();
        const role = data.data.role;
        // Redirect logic based on role
        if (role === 'admin') {
          router.push('/admin');
        } else {
          router.push('/dashboard');
        }
      }
    },
    onError: ({ error }) => {
      if (error?.serverError) {
        setGlobalError(error.serverError);
      } else {
        setGlobalError("An unexpected error occurred.");
      }
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    setGlobalError(null);
    execute(data);
  };

  return (
    <div className="w-full max-w-sm mx-auto space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold tracking-tight">Login</h1>
        <p className="text-muted-foreground text-sm">
          Enter your email below to login to your account
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Email
          </label>
          <Input
            id="email"
            placeholder="m@example.com"
            type="email"
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect="off"
            disabled={isExecuting || isSubmitting}
            {...register('email')}
          />
          {errors.email && (
            <p className="text-sm text-destructive font-medium">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Password
            </label>
            <ForgotPasswordDialog />
          </div>
          <Password
            id="password"
            placeholder="••••••••"
            disabled={isExecuting || isSubmitting}
            {...register('password')}
          />
          {errors.password && (
            <p className="text-sm text-destructive font-medium">{errors.password.message}</p>
          )}
        </div>

        {globalError && (
          <div className="flex items-center gap-2 p-3 text-sm text-destructive bg-destructive/10 rounded-md">
            <AlertCircle className="h-4 w-4" />
            <p>{globalError}</p>
          </div>
        )}

        <Button className="w-full" type="submit" disabled={isExecuting || isSubmitting}>
          {isExecuting ? 'Signing In...' : 'Sign In'}
        </Button>
      </form>

      <SocialLogin />

      <div className="text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{' '}
        <Link href="/signup" className="underline underline-offset-4 hover:text-primary">
          Sign up
        </Link>
      </div>
    </div>
  );
}
