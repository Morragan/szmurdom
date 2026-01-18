import { shuffleChoices } from '../actions';
import { getOffersByIds } from '../lib/queries';
import { ChoicePicker } from './_components';
import { parseOffersParam } from './choiceUtils';

export default async function Choice({
  searchParams,
}: {
  searchParams: Promise<{ offers: string }>;
}) {
  const { offers } = await searchParams;
  const parsedOffers = await parseOffersParam(offers);

  if (parsedOffers.length == 0) {
    await shuffleChoices();
    return null;
  }

  const offersData = await getOffersByIds(parsedOffers);

  if (offersData.some((offer) => offer.status === 'ELIMINATED')) {
    await shuffleChoices();
    return null;
  }

  if (offersData.length !== parsedOffers.length) {
    throw new Error('some offers not found');
  }

  return (
    <div className='min-h-screen dark:bg-gray-900 dark:text-gray-200'>
      <main className='min-h-screen w-full py-8 px-16 flex flex-col items-center'>
        <h1 className='mb-8 text-4xl font-extrabold font-anta dark:text-white place-self-center'>
          <a href='/'>Szmurdom</a>
        </h1>
        <button
          type='button'
          onClick={shuffleChoices}
          className='mb-8 px-4 py-2 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 active:translate-y-0.5 active:scale-95 transition transform shadow-sm dark:bg-blue-500 dark:hover:bg-blue-600'
        >
          Shuffle choices
        </button>
        <ChoicePicker offers={offersData} />
      </main>
    </div>
  );
}
