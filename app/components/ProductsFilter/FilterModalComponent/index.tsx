'use client';

import { useApp } from '@/app/context/App';
import { useModal } from '@/app/context/Modal';

import { Text } from '../../Text';

export const FilterModalComponent = () => {
  const { filters, filterOptions, setFilterOptions, refetch } = useApp();
  const { hideModal } = useModal();

  return (
    <>
      {filters
        .filter(({ options = [] }) => options.length > 0)
        .map(({ name: filterName, code: filterCode, options = [] }, index) => (
          <div key={filterCode} className='border-bottom border-secondary'>
            <div id={`faq-accordion-${filterCode}-${index}`} className='accordion accordion-flush'>
              <div className='accordion-item'>
                <h2
                  id={`faq-accordion-${filterCode}-${index}-heading`}
                  className='accordion-header'
                >
                  <button
                    type='button'
                    aria-expanded='false'
                    data-bs-toggle='collapse'
                    className='accordion-button collapsed bg-transparent shadow-none'
                    aria-controls={`faq-accordion-${filterCode}-${index}-collapse`}
                    data-bs-target={`#faq-accordion-${filterCode}-${index}-collapse`}
                  >
                    <Text typography='labelRegular' className='mb-0'>
                      {filterName}
                    </Text>
                  </button>
                </h2>
                <div
                  id={`faq-accordion-${filterCode}-${index}-collapse`}
                  className='accordion-collapse collapse'
                  aria-labelledby={`faq-accordion-${filterCode}-${index}-heading`}
                  data-bs-parent={`#faq-accordion-${filterCode}-${index}`}
                >
                  <div className='accordion-body'>
                    {options.map(({ name: optionName, value: optionValue }) => (
                      <div key={optionValue} className='form-check'>
                        <input
                          id={optionValue}
                          type='checkbox'
                          className='form-check-input'
                          checked={filterOptions.some(
                            (state) =>
                              state.filterCode === filterCode && state.optionValue === optionValue
                          )}
                          onChange={() =>
                            setFilterOptions((prevState) =>
                              prevState.some(
                                (state) =>
                                  state.filterCode === filterCode &&
                                  state.optionValue === optionValue
                              )
                                ? prevState.filter(
                                    (state) =>
                                      state.filterCode !== filterCode &&
                                      state.optionValue !== optionValue
                                  )
                                : [...prevState, { filterCode, optionName, optionValue }]
                            )
                          }
                        />
                        <label htmlFor={optionValue} className='form-check-label'>
                          <Text typography='labelRegular' className='mb-0'>
                            {optionName}
                          </Text>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

      <button
        className='btn btn-primary shadow-sm w-100 mt-3'
        onClick={() => {
          refetch();
          hideModal();
        }}
      >
        <Text typography='labelLarge' className='mb-0'>
          Apply
        </Text>
      </button>
    </>
  );
};
