'use client';

import React, { Suspense } from 'react';

import { FormFields } from '@/components/container/form-fields';
import { AuthHeader } from '@/components/pages/auth';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { authFieldConfig, authTabs, LOGIN_SECTION } from '@/constants';
import { useLogin, useRegister } from '@/hooks';
import {
  LoginFormData,
  loginSchema,
  RegisterFormData,
  registerSchema,
} from '@/lib/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSearchParams } from 'next/navigation';
import { Control, useForm, UseFormReturn } from 'react-hook-form';

type AuthFormData = LoginFormData | RegisterFormData;

const AuthPageContent = () => {
  const { mutate: login, isPending: isPendingLogin } = useLogin();
  const { mutate: register, isPending: isPendingRegister } = useRegister();

  const searchParams = useSearchParams();
  const tabParam = searchParams.get('tab');

  const initialTab = authTabs.some((t) => t.id === tabParam)
    ? tabParam
    : authTabs[0].id;

  const [activeTab, setActiveTab] = React.useState(initialTab);

  React.useEffect(() => {
    if (tabParam && authTabs.some((t) => t.id === tabParam)) {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  const formLogin = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const formRegister = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
    },
  });

  const onSubmitLogin = (data: LoginFormData) => {
    login(data);
  };

  const onSubmitRegister = (data: RegisterFormData) => {
    register(data);
  };

  React.useEffect(() => {
    formLogin.reset();
    formRegister.reset();
  }, [activeTab, formLogin, formRegister]);

  return (
    <div className='container-auth space-y-4 md:space-y-5'>
      <AuthHeader {...LOGIN_SECTION} />
      <Tabs
        value={activeTab!}
        onValueChange={setActiveTab}
        defaultValue={authTabs[0].id}
        className='space-y-4 md:space-y-5'
      >
        <TabsList className='w-full'>
          {authTabs.map((tab) => (
            <TabsTrigger value={tab.id} key={tab.id}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {authFieldConfig.map((fieldContent) => {
          const isSignIn = fieldContent.id === 'sign-in';

          const currentForm = (
            isSignIn ? formLogin : formRegister
          ) as UseFormReturn<AuthFormData>;

          const fields = fieldContent.field;
          const isPending = isSignIn ? isPendingLogin : isPendingRegister;
          const buttonText = isSignIn ? 'Sign In' : 'Sign Up';

          const handleFormSubmit = isSignIn
            ? formLogin.handleSubmit(onSubmitLogin)
            : formRegister.handleSubmit(onSubmitRegister);

          return (
            <TabsContent key={fieldContent.id} value={fieldContent.id}>
              <Form {...currentForm}>
                <form
                  onSubmit={handleFormSubmit}
                  className='space-y-4 md:space-y-5'
                >
                  {fields?.map((field) => (
                    <FormFields
                      key={field.name}
                      control={currentForm.control as Control<AuthFormData>}
                      config={
                        field as typeof field & { name: keyof AuthFormData }
                      }
                    />
                  ))}

                  <Button type='submit' className='w-full' disabled={isPending}>
                    {isPending ? 'Loading...' : buttonText}
                  </Button>
                </form>
              </Form>
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
};

const AuthPageSkeleton = () => {
  return (
    <div className='container-auth space-y-4 md:space-y-5'>
      <div className='space-y-2'>
        <div className='h-6 w-32 animate-pulse rounded bg-muted' />
        <div className='h-4 w-48 animate-pulse rounded bg-muted' />
      </div>
      <div className='h-10 w-full animate-pulse rounded bg-muted' />
      <div className='space-y-3'>
        <div className='h-10 w-full animate-pulse rounded bg-muted' />
        <div className='h-10 w-full animate-pulse rounded bg-muted' />
        <div className='h-10 w-full animate-pulse rounded bg-muted' />
      </div>
    </div>
  );
};

const AuthPage = () => {
  return (
    <Suspense fallback={<AuthPageSkeleton />}>
      <AuthPageContent />
    </Suspense>
  );
};

export default AuthPage;
