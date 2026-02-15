import { Houses, PlayButton, RefreshButton } from './_components';

export default async function Home() {
  return (
    <div className='min-h-screen dark:bg-gray-900 dark:text-gray-200'>
      <main className='w-full py-8 px-16'>
        <h1 className='mb-8 text-4xl font-extrabold font-anta dark:text-white place-self-center'>
          Szmurdom
        </h1>
        <div className='flex justify-center space-x-4'>
          <PlayButton />
          <RefreshButton />
        </div>
        <div className='overflow-x-auto'>
          <Houses />
        </div>
      </main>
    </div>
  );
}
