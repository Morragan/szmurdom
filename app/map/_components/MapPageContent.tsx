'use client';

import { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import HouseSelector from './HouseSelector';
import { Offer } from '@/app/lib/types';

const Map = dynamic(() => import('@/app/_components/Map'), { ssr: false });

export default function MapPageContent({ offers }: { offers: Offer[] }) {
  const [showEliminated, setShowEliminated] = useState(false);

  const initialSelected = useMemo(() => {
    const validOffers = offers.filter(
      (offer) => offer.status === 'PERHAPS' && offer.lat && offer.lon,
    );
    return new Set(validOffers.map((offer) => offer.id));
  }, [offers]);

  const [selectedIds, setSelectedIds] = useState<Set<number>>(initialSelected);

  const displayedOffers = useMemo(() => {
    return offers.filter((offer) => selectedIds.has(offer.id));
  }, [offers, selectedIds]);

  return (
    <>
      <Map offers={displayedOffers} />
      <hr className='mt-8 mb-8 border-gray-300 dark:border-gray-700' />
      <div className='px-4 md:px-0'>
        <HouseSelector
          offers={offers}
          selectedIds={selectedIds}
          onSelectionChange={setSelectedIds}
          showEliminated={showEliminated}
          onToggleEliminated={setShowEliminated}
        />
      </div>
    </>
  );
}
