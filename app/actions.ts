'use server';

import { redirect } from 'next/navigation';
import { getOffers } from './lib/queries';
import { revalidatePath } from 'next/cache';

export const invalidateCache = async () => {
  revalidatePath('/');
  redirect('/');
};

export const shuffleChoices = async () => {
  const offers = await getOffers();

  const currentStage = Math.min(
    ...offers
      .filter((offer) => offer.status !== 'ELIMINATED')
      .map((offer) => offer.score),
  );

  const uneliminatedOffers = offers.filter(
    (offer) => offer.status !== 'ELIMINATED' && offer.score === currentStage,
  );

  // pick 2 random offers from uneliminatedOffers
  const shuffled = uneliminatedOffers.sort(() => 0.5 - Math.random());

  if (shuffled.length === 0) {
    console.log('No more offers to choose from, redirecting to home');
    redirect('/');
  }

  const offersParam = shuffled
    .slice(0, 2)
    .map((offer) => offer.id.toString())
    .join(',');
  redirect(`/choice?offers=${offersParam}`);
};

export const setChoices = async (choiceIds: number[]) => {
  const offersParam = choiceIds
    .slice(0, 2)
    .map((offer) => offer.toString())
    .join(',');
  redirect(`/choice?offers=${offersParam}`);
};
