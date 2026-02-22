'use client';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAction } from 'next-safe-action/hooks';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, Suspense, useEffect } from 'react';
import { AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';

import { ResetPasswordSchema } from '@/lib/form-schema';
import { ResetPasswordAction } from '@/actions/auth.actions';
import { Button } from '@/components/ui/button';
import { Password } from '@/components/ui/password';

type ResetPasswordValues = z.infer<typeof ResetPasswordSchema>;

function ResetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get('userId');
  const secret = searchParams.get('secret');

  const [globalError, setGlobalError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // If parameters are missing, show error
  const isMissingParams = !userId || !secret;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<ResetPasswordValues>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      password: '',
      'confirm-password': '',
      userId: userId || '',
      secret: secret || '',
    },
  });

  // Update hidden fields if params change (though they shouldn't)
  useEffect(() => {
    if (userId) setValue('userId', userId);
    if (secret) setValue('secret', secret);
  }, [userId, secret, setValue]);

  const { execute, isExecuting } = useAction(ResetPasswordAction, {
    onSuccess: ({ data }) => {
      if (data?.success) {
        setSuccess(true);
        setTimeout(() => {
          router.push('/login');
        }, 3000);
      }
    },
    onError: ({ error }) => {
      if (error?.serverError) {
        setGlobalError(error.serverError);
      } else {
        setGlobalError('An unexpected error occurred.');
      }
    },
  });

  const onSubmit = (data: ResetPasswordValues) => {
    setGlobalError(null);
    execute(data);
  };

  if (isMissingParams) {
    return (
      <div className="w-full max-w-sm mx-auto space-y-6 text-center">
        <div className="flex justify-center">
          <AlertCircle className="h-12 w-12 text-destructive" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight">Invalid Link</h1>
        <p className="text-muted-foreground">
          The password reset link is invalid or missing required parameters. Please request a new one.
        </p>
        <Button onClick={() => router.push('/login')} className="w-full">
          Back to Login
        </Button>
      </div>
    );
  }

  if (success) {
    return (
      <div className="w-full max-w-sm mx-auto space-y-6 text-center">
        <div className="flex justify-center">
          <CheckCircle2 className="h-12 w-12 text-green-500" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight">Password Reset</h1>
        <p className="text-muted-foreground">
          Your password has been successfully reset. Redirecting to login...
        </p>
        <Button onClick={() => router.push('/login')} className="w-full">
          Go to Login
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-sm mx-auto space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold tracking-tight">Set New Password</h1>
        <p className="text-muted-foreground text-sm">
          Create a new strong password for your account.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            New Password
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

        {/* Hidden fields for userId and secret */}
        <input type="hidden" {...register('userId')} />
        <input type="hidden" {...register('secret')} />

        {globalError && (
          <div className="flex items-center gap-2 p-3 text-sm text-destructive bg-destructive/10 rounded-md">
            <AlertCircle className="h-4 w-4" />
            <p>{globalError}</p>
          </div>
        )}

        <Button className="w-full" type="submit" disabled={isExecuting || isSubmitting}>
          {isExecuting ? 'Resetting...' : 'Reset Password'}
        </Button>
      </form>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    }>
      <div className="flex h-screen w-full items-center justify-center p-4">
        <ResetPasswordContent />
      </div>
    </Suspense>
  );
}
