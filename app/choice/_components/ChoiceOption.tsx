'use client';

import { Offer } from '@/app/lib/types';

type ChoiceOptionProps = {
  offer: Offer;
  onChoose: (offer: Offer) => void;
  onEliminate: (offer: Offer) => void;
};

export const ChoiceOption = ({
  offer,
  onChoose,
  onEliminate,
}: ChoiceOptionProps) => {
  return (
    <div>
      <a
        href={offer.link}
        target='_blank'
        rel='noopener noreferrer'
        className='block max-w-xs'
        aria-label={`Open offer ${offer.id}`}
      >
        <div className='bg-white dark:bg-transparent border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden transform transition duration-200 hover:-translate-y-1 hover:border-gray-300 dark:hover:border-gray-600 shadow-sm'>
          <img
            src={offer.imageUrl}
            alt={`Offer ${offer.id}`}
            className='w-full h-64 object-cover'
          />
          <div className='p-3'>
            <p className='text-md text-gray-700 dark:text-gray-200 break-words'>
              {offer.link}
            </p>
          </div>
        </div>
      </a>

      <div className='mt-3 max-w-xs flex gap-3'>
        <button
          type='button'
          onClick={() => onChoose(offer)}
          className='flex-1 px-4 py-2 rounded-md text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 active:translate-y-0.5 active:scale-95 transition transform shadow-sm dark:bg-emerald-500 dark:hover:bg-emerald-600'
        >
          Choose
        </button>

        <button
          type='button'
          onClick={() => onEliminate(offer)}
          className='flex-1 px-4 py-2 rounded-md text-sm font-medium text-red-600 bg-transparent border border-red-600 hover:bg-red-50 active:scale-95 transition dark:text-red-300 dark:border-red-400 dark:hover:bg-red-900'
        >
          Eliminate
        </button>
      </div>
    </div>
  );
};
