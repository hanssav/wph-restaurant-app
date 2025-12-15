import { PATH } from '@/constants';
import { AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 px-4'>
      <div className='max-w-md w-full text-center'>
        <div className='inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary-100/10 mb-6'>
          <AlertCircle className='w-10 h-10 text-primary-100' />
        </div>

        <h1 className='text-4xl font-bold text-gray-900 mb-3'>
          Page Not Found
        </h1>

        <p className='text-gray-600 mb-8'>
          Sorry, we couldn&apos;t find the page you&apos;re looking for. The
          page may have been moved or deleted.
        </p>

        <Link
          href={PATH.HOME}
          className='inline-block bg-primary-100 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-100/90 transition-colors'
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
