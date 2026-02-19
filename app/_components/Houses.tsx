import { getOffers } from '../lib/queries';
import { NotesButton } from './NotesButton';

export const Houses = async () => {
  const houses = await getOffers();
  houses.sort((a, b) => {
    if (b.status === 'PERHAPS' && a.status !== 'PERHAPS') return 1;
    if (a.status === 'PERHAPS' && b.status !== 'PERHAPS') return -1;
    return b.score - a.score;
  });

  return (
    <>
      <table className='min-w-[700px] w-[90vw] mx-auto dark:bg-gray-800 font-semibold text-center rounded-sm overflow-hidden'>
        <thead>
          <tr className='bg-zinc-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700'>
            <th className='px-2 py-2 border border-inherit border-b-0 w-12'>
              Notes
            </th>
            <th className='px-4 py-2 border border-inherit border-b-0'>
              Offer
            </th>
            <th className='px-4 py-2 border border-inherit border-b-0'>
              Score
            </th>
            <th className='px-4 py-2 border border-inherit border-b-0'>
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {houses.map((house) => (
            <tr
              key={house.id}
              className='odd:bg-zinc-100 even:bg-zinc-50
                        dark:odd:bg-gray-700 dark:even:bg-gray-800
                        border-gray-300
                        dark:odd:border-gray-800 dark:even:border-gray-700
                        hover:bg-zinc-300
                        dark:hover:bg-gray-600
                        hover:border-gray-400
                        dark:hover:border-gray-600'
            >
              <td className='border border-inherit px-2'>
                <NotesButton offerId={house.id} initialNotes={house.notes} />
              </td>
              <td className='border border-inherit font-normal'>
                <a
                  target='_blank'
                  href={house.link}
                  className='px-4 py-2 block w-full h-full visited:text-gray-500 dark:visited:text-gray-400 hover:underline'
                >
                  {house.link}
                </a>
              </td>
              <td className='px-4 py-2 border border-inherit'>{house.score}</td>
              <td className='px-4 py-2 border border-inherit'>
                {house.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
