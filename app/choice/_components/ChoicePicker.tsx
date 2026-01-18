import { Offer } from '@/app/lib/types';
import { ChoiceOption } from './ChoiceOption';
import { eliminateOffer, increaseOfferScore } from '@/app/lib/queries';
import { setChoices } from '@/app/actions';

export const ChoicePicker = ({ offers }: { offers: Offer[] }) => {
  if (offers.length > 2 || offers.length === 0)
    throw new Error('Pass one or two offers');

  const onChoose = async (offer: Offer) => {
    'use server';
    await increaseOfferScore(offer.id);
    const newChoices = offers.filter((o) => o.id !== offer.id).map((o) => o.id);
    await setChoices(newChoices);
  };

  const onEliminate = async (offer: Offer) => {
    'use server';
    await eliminateOffer(offer.id);
    const newChoices = offers.filter((o) => o.id !== offer.id).map((o) => o.id);
    await setChoices(newChoices);
  };

  if (offers.length === 1) {
    return (
      <div className='flex justify-center'>
        <ChoiceOption
          offer={offers[0]}
          onChoose={onChoose}
          onEliminate={onEliminate}
        />
      </div>
    );
  }

  return (
    <div className='flex gap-8 justify-center flex-col items-center lg:flex-row lg:items-stretch'>
      <ChoiceOption
        offer={offers[0]}
        onChoose={onChoose}
        onEliminate={onEliminate}
      />
      <div className='hidden lg:flex w-[2px] mx-10 items-center justify-center mx-5 bg-[linear-gradient(to_bottom,transparent,var(--color-gray-200)_20%,var(--color-gray-200)_80%,transparent)] dark:bg-[linear-gradient(to_bottom,transparent,var(--color-gray-700)_20%,var(--color-gray-700)_80%,transparent)]'>
        <span className='block text-[2em] text-gray-200 font-bold text-shadow-xs text-shadow-gray-200 font-anta'>
          VS
        </span>
      </div>
      <div className='flex lg:hidden h-[2px] my-5 items-center justify-center w-full bg-[linear-gradient(to_right,transparent,var(--color-gray-200)_20%,var(--color-gray-200)_80%,transparent)] dark:bg-[linear-gradient(to_right,transparent,var(--color-gray-700)_20%,var(--color-gray-700)_80%,transparent)]'>
        <span className='block text-[2em] text-gray-200 font-bold text-shadow-xs text-shadow-gray-200 font-anta'>
          VS
        </span>
      </div>
      <ChoiceOption
        offer={offers[1]}
        onChoose={onChoose}
        onEliminate={onEliminate}
      />
    </div>
  );
};
