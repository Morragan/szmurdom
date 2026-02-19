'use client';

import { useState, useRef, useEffect } from 'react';
import { updateOfferNotes } from '../lib/queries';

interface NotesButtonProps {
  offerId: number;
  initialNotes: string | null;
}

export const NotesButton = ({ offerId, initialNotes }: NotesButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [notes, setNotes] = useState(initialNotes || '');
  const [originalNotes, setOriginalNotes] = useState(initialNotes || '');
  const dialogRef = useRef<HTMLDialogElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setNotes(initialNotes || '');
    setOriginalNotes(initialNotes || '');
  }, [initialNotes]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      dialog.showModal();
      setTimeout(() => textareaRef.current?.focus(), 0);
    } else {
      dialog.close();
    }
  }, [isOpen]);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = async () => {
    // optimistic update
    const updatedNotes = notes;
    setOriginalNotes(updatedNotes);
    setIsOpen(false);

    if (notes !== originalNotes) {
      await updateOfferNotes(offerId, notes);
    }
  };

  const handleCancel = () => {
    setNotes(originalNotes);
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={handleOpen}
        className='p-2 hover:bg-zinc-200 dark:hover:bg-gray-600 rounded-md transition-colors'
        aria-label='Edit notes'
        title='Edit notes'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
          className='w-5 h-5'
        >
          <path d='M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7' />
          <path d='M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z' />
        </svg>
      </button>

      <dialog
        ref={dialogRef}
        className='backdrop:bg-black/70 p-0 rounded-lg shadow-xl max-w-2xl w-[90vw] dark:bg-gray-800 
                   fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
        onClose={handleCancel}
      >
        <div className='flex flex-col h-full max-h-[80vh]'>
          <div className='flex items-center justify-between p-4 border-b border-gray-300 dark:border-gray-700'>
            <h2 className='text-lg font-semibold text-gray-900 dark:text-gray-100'>
              Notes
            </h2>
            <button
              onClick={handleCancel}
              className='p-1 hover:bg-zinc-200 dark:hover:bg-gray-600 rounded-md text-gray-900 dark:text-gray-100'
              aria-label='Cancel'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                className='w-5 h-5'
              >
                <line x1='18' y1='6' x2='6' y2='18' />
                <line x1='6' y1='6' x2='18' y2='18' />
              </svg>
            </button>
          </div>

          <div className='flex-1 p-4 overflow-y-auto'>
            <textarea
              ref={textareaRef}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className='w-full h-48 min-h-[12rem] p-3 border border-gray-300 dark:border-gray-600 rounded-md 
                         bg-white dark:bg-gray-700 
                         text-gray-900 dark:text-gray-100
                         placeholder:text-gray-500 dark:placeholder:text-gray-400
                         focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
                         resize-y'
              placeholder='Add notes about this offer...'
            />
          </div>

          <div className='flex gap-2 justify-end p-4 border-t border-gray-300 dark:border-gray-700'>
            <button
              onClick={handleCancel}
              className='px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-900 dark:text-gray-100 transition-colors'
            >
              Cancel
            </button>
            <button
              onClick={handleClose}
              className='px-4 py-2 rounded-md bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white transition-colors'
            >
              Save
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};
