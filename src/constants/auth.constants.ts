import { UpdateProfileReq } from '@/lib/schema';
import { FieldConfig } from '@/types';

export type AuthSectionProps = {
  title: string;
  desc: string;
};

export const LOGIN_SECTION: AuthSectionProps = {
  title: 'Welcome Back',
  desc: 'Good to see you again! Let’s eat ',
};

type AuthTabsType = {
  id: string;
  label: string;
};

export const authTabs: AuthTabsType[] = [
  {
    id: 'sign-in',
    label: 'Sign In',
  },
  {
    id: 'sign-up',
    label: 'Sign Up',
  },
];

const signInFields: FieldConfig[] = [
  {
    name: 'email',
    type: 'email',
    label: 'Email',
    autoComplete: 'email',
  },
  {
    name: 'password',
    type: 'password',
    label: 'Password',
    autoComplete: 'current-password',
    showToggle: true,
  },
  {
    name: 'remember-me',
    type: 'checkbox',
    label: 'Remember Me',
  },
];

export const signUpFields: FieldConfig[] = [
  {
    name: 'name',
    type: 'text',
    label: 'Nama Lengkap',
    autoComplete: 'name',
  },
  {
    name: 'email',
    type: 'email',
    label: 'Email',
    autoComplete: 'email',
  },
  {
    name: 'phone',
    type: 'tel',
    label: 'Nomor Telepon',
    autoComplete: 'tel',
  },
  {
    name: 'password',
    type: 'password',
    label: 'Password',
    autoComplete: 'new-password',
    showToggle: true,
  },
  {
    name: 'confirm-password',
    type: 'password',
    label: 'Confirm Password',
    autoComplete: 'confirm-new-password',
    showToggle: true,
  },
];

export const authFieldConfig = [
  { id: 'sign-in', field: signInFields },
  { id: 'sign-up', field: signUpFields },
];

export const profileFormConfig: FieldConfig<UpdateProfileReq>[] = [
  {
    name: 'name',
    type: 'text',
    label: 'Full Name',
    placeholder: 'Enter your full name',
    autoComplete: 'name',
  },
  {
    name: 'email',
    type: 'email',
    label: 'Email Address',
    placeholder: 'Enter your email',
    autoComplete: 'email',
  },
  {
    name: 'phone',
    type: 'tel',
    label: 'Phone Number',
    placeholder: 'Enter your phone number',
    autoComplete: 'tel',
  },
];
