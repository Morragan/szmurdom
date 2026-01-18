'use server';

import { eliminateOffer, increaseOfferScore } from '../lib/queries';

export const chooseOfferHandler = async (offerId: number) => {
  await increaseOfferScore(offerId);
};

export const eliminateOfferHandler = async (offerId: number) => {
  await eliminateOffer(offerId);
};
