import { API_GET_PRODUCTS_URL } from '../constants';
import { FilterOption } from '../context/App';
import { useToast } from '../context/Toast';
import { ProductsData } from '../model';

type ApiActions = {
  getProductsData: (filterOptions?: FilterOption[]) => Promise<ProductsData>;
};

const getErrorMessage = (caughtErr: unknown) =>
  caughtErr instanceof Error ? caughtErr.message : String(caughtErr);

export const useApiActions = (): ApiActions => {
  const { showToast } = useToast();

  const getProductsData = async (filterOptions: FilterOption[] = []): Promise<ProductsData> => {
    try {
      const response = await fetch(
        filterOptions.length > 0
          ? `${API_GET_PRODUCTS_URL}&${filterOptions
              .map(({ filterCode, optionValue }) => `${filterCode}[]=${optionValue}`)
              .join('&')}`
          : API_GET_PRODUCTS_URL,
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
  };

  return { getProductsData };
};
