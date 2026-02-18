import Link from 'next/link';

export function MapButton() {
  return (
    <Link
      href='/map'
      className='bg-purple-700 font-bold text-white mb-3 py-1 px-7 rounded-xl border tracking-wider hover:cursor-pointer hover:bg-purple-800 active:bg-purple-900 block'
    >
      View Map
    </Link>
  );
}
