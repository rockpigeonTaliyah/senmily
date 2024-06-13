'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import * as z from 'zod';
import { useState } from 'react';
import { Input, Button, Spacer, Card } from '@nextui-org/react';

const formSchema = z.object({
  email: z.string().email({ message: 'Enter a valid email address' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters' }).max(16, { message: 'Password must be within 16 characters' })
});

type UserFormValue = z.infer<typeof formSchema>;

export default function UserAuthForm() {
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');
  const defaultValues = {
    email: '',
    password: '',
  };

  const { handleSubmit, control, formState: { errors } } = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (data: UserFormValue) => {
    setLoading(true);
    try {
      const result = await signIn('email-login', {
        email: data.email,
        password: data.password,
        callbackUrl: callbackUrl ?? '/home'
      });
      if (!result?.error) {
        // Handle successful authentication (e.g., redirect)
        console.log('Successfully signed in:', result);
      } else {
        // Handle authentication error
        console.log('Sign-in error:', result.error);
      }
    } catch (error) {
      console.log('Sign-in error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <Card>
        <Card>
          <h3>Login</h3>
        </Card>
        <Card>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <div>
                  <Input
                    {...field}
                    width="100%"
                    label="Email"
                    placeholder="Enter your email..."
                    isClearable
                    disabled={loading}
                  />
                  <Spacer y={1.5} />
                </div>
              )}
            />
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <div>
                  <Input
                    {...field}
                    width="100%"
                    label="Password"
                    placeholder="Enter your password..."
                    isClearable
                    type='password'
                    disabled={loading}
                  />
                  <Spacer y={1.5} />
                </div>
              )}
            />
            <Button disabled={loading} className='w-full' type="submit">
              Continue With Email
            </Button>
          </form>
          <Spacer y={1.5} />
          <div style={{ textAlign: 'center', textTransform: 'uppercase', fontSize: '12px' }}>
            Or continue with
          </div>
        </Card>
      </Card>
    </div>
  );
}