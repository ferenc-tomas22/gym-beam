import { API_GET_PRODUCTS_BY_SPORTS_NUTRITION_CATEGORY_URL } from '../constants';
import { FilterOption } from '../context/App';
import { useToast } from '../context/Toast';
import { ProductsData } from '../model';

type ApiActions = {
  getProductsData: (filterOptions?: FilterOption[]) => Promise<ProductsData>;
};

const getErrorMessage = (caughtErr: unknown) => {
  if (caughtErr instanceof Error) {
    return caughtErr.message;
  }
  return String(caughtErr);
};

export const useApiActions = (): ApiActions => {
  const { showToast } = useToast();

  return {
    getProductsData: async (filterOptions: FilterOption[] = []): Promise<ProductsData> => {
      try {
        const response = await fetch(
          filterOptions.length > 0
            ? `${API_GET_PRODUCTS_BY_SPORTS_NUTRITION_CATEGORY_URL}?${filterOptions
                .map(({ filterCode, optionValue }) => `${filterCode}[]=${optionValue}`)
                .join('&')}`
            : API_GET_PRODUCTS_BY_SPORTS_NUTRITION_CATEGORY_URL,
          {
            cache: 'no-store',
            headers: { 'Content-Type': 'application/json' },
          }
        );

        return await response.json();
      } catch (err) {
        showToast(getErrorMessage(err), 'error');

        return { filters: [], items: [] };
      }
    },
  };
};
