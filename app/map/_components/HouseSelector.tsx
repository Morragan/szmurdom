'use client';

import { Offer } from '@/app/lib/types';

type HouseSelectorProps = {
  offers: Offer[];
  selectedIds: Set<number>;
  onSelectionChange: (ids: Set<number>) => void;
  showEliminated: boolean;
  onToggleEliminated: (show: boolean) => void;
  onHoverChange: (id: number | null) => void;
};

export default function HouseSelector({
  offers,
  selectedIds,
  onSelectionChange,
  showEliminated,
  onToggleEliminated,
  onHoverChange,
}: HouseSelectorProps) {
  const handleToggleAll = () => {
    const validOffers = offers.filter(
      (offer) =>
        offer.lat &&
        offer.lon &&
        (showEliminated || offer.status === 'PERHAPS'),
    );
    if (selectedIds.size === validOffers.length) {
      onSelectionChange(new Set());
    } else {
      onSelectionChange(new Set(validOffers.map((offer) => offer.id)));
    }
  };

  const handleToggleOffer = (id: number) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    onSelectionChange(newSelected);
  };

  const validOffers = offers.filter(
    (offer) =>
      offer.lat && offer.lon && (showEliminated || offer.status === 'PERHAPS'),
  );

  return (
    <div>
      <h2 className='text-2xl font-bold mb-4'>Select Houses to Display</h2>

      <div className='flex gap-4 mb-4'>
        <button
          onClick={handleToggleAll}
          className='bg-blue-700 font-bold text-white py-1 px-4 rounded-xl border tracking-wider hover:cursor-pointer hover:bg-blue-800 active:bg-blue-900'
        >
          {selectedIds.size === validOffers.length
            ? 'Deselect All'
            : 'Select All'}
        </button>

        <label className='flex items-center gap-2 cursor-pointer hidden'>
          <input
            type='checkbox'
            checked={showEliminated}
            onChange={(e) => onToggleEliminated(e.target.checked)}
            className='w-4 h-4 cursor-pointer'
          />
          <span className='text-sm font-medium'>Show Eliminated Houses</span>
        </label>
      </div>

      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 max-h-96 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-800 rounded-lg'>
        {validOffers.map((offer) => (
          <label
            key={offer.id}
            className={`flex items-center gap-2 p-2 rounded cursor-pointer transition ${
              selectedIds.has(offer.id)
                ? 'bg-blue-100 dark:bg-blue-900'
                : 'bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600'
            } ${offer.status === 'ELIMINATED' ? 'opacity-60' : ''}`}
            onMouseEnter={() => onHoverChange(offer.id)}
            onMouseLeave={() => onHoverChange(null)}
          >
            <input
              type='checkbox'
              checked={selectedIds.has(offer.id)}
              onChange={() => handleToggleOffer(offer.id)}
              className='w-4 h-4 cursor-pointer'
            />
            <div className='flex-1 min-w-0'>
              <img
                src={offer.imageUrl}
                alt={`House ${offer.id}`}
                className='w-full h-30 object-cover rounded mb-1'
              />
              <div className='text-xs truncate'>
                {offer.link}
                {offer.status === 'ELIMINATED' && (
                  <span className='text-red-600 dark:text-red-400 ml-1'>
                    (Eliminated)
                  </span>
                )}
              </div>
            </div>
          </label>
        ))}
      </div>

      <div className='mt-4 text-sm text-gray-600 dark:text-gray-400'>
        {selectedIds.size} of {validOffers.length} houses selected
      </div>
    </div>
  );
}
