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
import { AlertCircle } from 'lucide-react';

type LoginFormValues = z.infer<typeof LoginformSchema>;

export function LoginForm() {
const [globalError, setGlobalError] = useState<string | null>(null);
const router = useRouter();
const form = useForm<Schema>({
  resolver: zodResolver(LoginformSchema),
  defaultValues: {
    email: "",
    password: ""
  }
})
const formAction = useAction(LoginserverAction, {
  onSuccess: ({ data }) => {
    if (data?.success) {
      form.reset();
      // Redirect to respective dashboard based on role
      const role = data.data?.role;
      setTimeout(() => {
        if (role === 'admin') {
          router.push('/admin');
        } else {
          router.push('/dashboard');
        }
      }, 1500);
    } else {
      form.setError("root", {
        message: data?.message || "Login failed"
      });
    }
  },
  onError: ({ error }) => {
    form.setError("root", {
      message: error.serverError || "An unexpected error occurred"
    });
    if (error?.serverError) {
      setGlobalError(error.serverError);
    } else {
      setGlobalError("An unexpected error occurred. Please try again.");
    }
  },
});
const handleSubmit = form.handleSubmit(async (data: Schema) => {
    setGlobalError(null);
    formAction.execute(data);
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

          {form.formState.errors.root && (
            <FieldError errors={[form.formState.errors.root]} className="text-center" />
          )}

        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="gap-2">
            <FieldLabel htmlFor="email" className="text-sm font-medium">Email</FieldLabel>
              <Input
                {...field}
                id="email"
                type="text"
                onChange={(e) => {
                field.onChange(e.target.value)
                }}
                aria-invalid={fieldState.invalid}
                placeholder="you@example.com"
                className="h-11"
              />
              
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Password
            </label>
            {/* Optional: Add Forgot Password Link here */}
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
