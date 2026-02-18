'use server';

import { cache } from 'react';
import { revalidatePath } from 'next/cache';
import { sql } from './db';
import { Offer } from './types';

export const getOffers = cache(async (): Promise<Offer[]> => {
  const offers = await sql.query(`SELECT * FROM offers LIMIT 100`);
  return offers.map<Offer>((offer) => ({
    id: offer.id,
    link: offer.offer_link,
    imageUrl: offer.image_link,
    score: offer.score,
    status: offer.status,
    lat: offer.lat,
    lon: offer.lon,
  }));
});

export const getOffersByIds = cache(async (ids: number[]): Promise<Offer[]> => {
  if (ids.length === 0) return [];
  const offers = await sql.query(`SELECT * FROM offers WHERE id = ANY($1)`, [
    ids,
  ]);
  return offers.map<Offer>((offer) => ({
    id: offer.id,
    link: offer.offer_link,
    imageUrl: offer.image_link,
    score: offer.score,
    status: offer.status,
    lat: offer.lat,
    lon: offer.lon,
  }));
});

export const increaseOfferScore = async (offerId: number) => {
  await sql`
    UPDATE offers
    SET score = score + 1
    WHERE id = ${offerId}
  `;
  revalidatePath('/');
};

export const eliminateOffer = async (offerId: number) => {
  await sql`
    UPDATE offers
    SET status = 'ELIMINATED'
    WHERE id = ${offerId}
  `;
  revalidatePath('/');
};

export const resetOffers = async () => {
  await sql`
    UPDATE offers
    SET score = 0,
    status = 'PERHAPS'
  `;
  revalidatePath('/');
};
