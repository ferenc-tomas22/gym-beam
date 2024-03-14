'use client';

import { createContext, useCallback, useContext, useMemo, useState } from 'react';

import { Loader } from '@/app/components/Loader';
import { noop } from '@/app/helpers';
import { useApiActions } from '@/app/hooks';
import { Filter, Option, ProductsData } from '@/app/model';
import { FCC } from '@/app/types';

export type FilterOption = {
  filterCode: Filter['code'];
  optionName: Option['name'];
  optionValue: Option['value'];
};

type IAppContext = ProductsData & {
  filterOptions: FilterOption[];

  refetch: () => void;
  setFilterOptions: (
    filterOptions: FilterOption[] | ((prevState: FilterOption[]) => FilterOption[])
  ) => void;
};

const initAppContext: IAppContext = {
  filterOptions: [],
  filters: [],
  items: [],

  setFilterOptions: noop,
  refetch: noop,
};

type AppContextState = ProductsData &
  Pick<IAppContext, 'filterOptions'> & {
    loading: boolean;
  };

const AppContext = createContext(initAppContext);

export const AppProvider: FCC<ProductsData> = ({ children, ...props }) => {
  const [appContext, setAppContext] = useState<AppContextState>({
    ...props,
    loading: false,
    filterOptions: [],
  });

  const { getProductsData } = useApiActions();
  const refetch = useCallback(
    () =>
      setAppContext((prevState) => {
        void getProductsData(prevState.filterOptions).then((data) => {
          setAppContext((prev) => ({ ...prev, items: data.items, loading: false }));
        });

        return { ...prevState, loading: true };
      }),
    [getProductsData]
  );

  const value = useMemo(
    () => ({
      ...appContext,
      refetch,
      setFilterOptions: (
        filterOptions: FilterOption[] | ((prevState: FilterOption[]) => FilterOption[])
      ) =>
        setAppContext((prevState) => ({
          ...prevState,
          filterOptions:
            typeof filterOptions === 'function'
              ? filterOptions(prevState.filterOptions)
              : filterOptions,
        })),
    }),
    [appContext, refetch]
  );

  return (
    <AppContext.Provider value={value}>
      {appContext.loading && <Loader />}
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
