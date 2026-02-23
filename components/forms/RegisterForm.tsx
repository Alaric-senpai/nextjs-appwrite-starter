'use client';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAction } from 'next-safe-action/hooks';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';

import { RegisterformSchema } from '@/lib/form-schema';
import { RegisterserverAction } from '@/actions/auth.actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Password } from '@/components/ui/password';
import { SocialLogin } from '@/components/forms/SocialLogin';
import { AlertCircle } from 'lucide-react';

type RegisterFormValues = z.infer<typeof RegisterformSchema>;

export function RegisterForm() {
  const router = useRouter();
  const [globalError, setGlobalError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(RegisterformSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      'confirm-password': '',
      agree: true,
    },
  });

  const { execute, isExecuting } = useAction(RegisterserverAction, {
    onSuccess: ({ data }) => {
      if (data?.success) {
        reset();
        // Redirect logic or show success message
        // Redirect to login after a delay
        setTimeout(() => {
            router.push('/login?registered=true');
        }, 2000);
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

  const onSubmit = (data: RegisterFormValues) => {
    setGlobalError(null);
    execute(data);
  };

  return (
    <div className="w-full max-w-sm mx-auto space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold tracking-tight">Create an Account</h1>
        <p className="text-muted-foreground text-sm">
          Enter your details below to create your account
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Full Name
          </label>
          <Input
            id="name"
            placeholder="John Doe"
            disabled={isExecuting || isSubmitting}
            {...register('name')}
          />
          {errors.name && (
            <p className="text-sm text-destructive font-medium">{errors.name.message}</p>
          )}
        </div>

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
          <label htmlFor="password" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Password
          </label>
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

        <div className="space-y-2">
          <label htmlFor="confirm-password" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Confirm Password
          </label>
          <Password
            id="confirm-password"
            placeholder="••••••••"
            disabled={isExecuting || isSubmitting}
            {...register('confirm-password')}
          />
          {errors['confirm-password'] && (
            <p className="text-sm text-destructive font-medium">{errors['confirm-password'].message}</p>
          )}
        </div>

        {globalError && (
          <div className="flex items-center gap-2 p-3 text-sm text-destructive bg-destructive/10 rounded-md">
            <AlertCircle className="h-4 w-4" />
            <p>{globalError}</p>
          </div>
        )}

        <Button className="w-full" type="submit" disabled={isExecuting || isSubmitting}>
          {isExecuting ? 'Creating Account...' : 'Create Account'}
        </Button>
      </form>

      <SocialLogin />

      <div className="text-center text-sm text-muted-foreground">
        Already have an account?{' '}
        <Link href="/login" className="underline underline-offset-4 hover:text-primary">
          Sign in
        </Link>
      </div>
    </div>
  );
}
