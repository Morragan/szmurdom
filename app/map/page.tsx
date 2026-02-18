import { getOffers } from '../lib/queries';
import MapPageContent from './_components/MapPageContent';
import Link from 'next/link';

export default async function MapPage() {
  const offers = await getOffers();

  return (
    <div className='min-h-screen dark:bg-gray-900 dark:text-gray-200'>
      <main className='w-full py-8 px-16'>
        <div className='flex items-center justify-between mb-8'>
          <h1 className='text-4xl font-extrabold font-anta dark:text-white'>
            House Locations
          </h1>
          <Link
            href='/'
            className='px-4 py-2 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 active:translate-y-0.5 active:scale-95 transition transform shadow-sm dark:bg-blue-500 dark:hover:bg-blue-600'
          >
            Back to Home
          </Link>
        </div>
        <MapPageContent offers={offers} />
      </main>
    </div>
  );
}
