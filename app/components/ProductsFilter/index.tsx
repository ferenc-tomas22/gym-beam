'use client';

import { useApp } from '@/app/context/App';
import { useModal } from '@/app/context/Modal';

import { Text } from '../Text';
import { FilterModalComponent } from './FilterModalComponent';

export const ProductsFilters = () => {
  const { filterOptions, setFilterOptions, refetch } = useApp();
  const { showModal } = useModal();

  return (
    <>
      <div className='d-flex align-items-center justify-content-end gap-1 mb-2 mb-md-0'>
        {filterOptions.length > 0 && (
          <button
            className='btn btn-sm btn-light border-secondary-subtle rounded-3 shadow-sm px-4'
            onClick={() => {
              setFilterOptions([]);
              refetch();
            }}
          >
            <Text typography='labelLarge' className='mb-0'>
              Zrušiť filter{' '}
              <span className='badge rounded-circle text-bg-secondary'>{filterOptions.length}</span>
            </Text>
          </button>
        )}
        <button
          className='btn btn-sm btn-light border-secondary-subtle rounded-3 shadow-sm px-4'
          onClick={() =>
            showModal({
              header: 'Filter',
              body: <FilterModalComponent />,
            })
          }
        >
          <Text typography='labelLarge' className='mb-0'>
            Zobraziť filter
          </Text>
        </button>
      </div>
      {filterOptions.length > 0 && (
        <div className='d-flex align-items-center gap-1 mb-2'>
          {filterOptions.map(({ optionName, optionValue }) => (
            <Text
              key={optionValue}
              typography='labelSmall'
              className='badge rounded-pill text-bg-secondary mb-0'
            >
              {optionName}
            </Text>
          ))}
        </div>
      )}
    </>
  );
};
