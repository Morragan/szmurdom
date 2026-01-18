import { shuffleChoices } from '../actions';

export const PlayButton = () => {
  return (
    <button
      type='button'
      className='bg-blue-700 font-bold text-white mx-auto mb-3 py-1 px-7 rounded-xl border tracking-wider hover:cursor-pointer hover:bg-blue-800 active:bg-blue-900 block'
      onClick={shuffleChoices}
    >
      Play
    </button>
  );
};
