import { invalidateCache } from '../actions';

export const RefreshButton = () => {
  return (
    <button
      type='button'
      className='bg-orange-700 font-bold text-white mb-3 py-1 px-7 rounded-xl border tracking-wider hover:cursor-pointer hover:bg-orange-800 active:bg-orange-900 block'
      onClick={invalidateCache}
    >
      Refresh
    </button>
  );
};
