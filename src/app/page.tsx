import { PATH } from '@/constants';
import { redirect } from 'next/navigation';

export default function RootPage() {
  redirect(PATH.HOME);
}
