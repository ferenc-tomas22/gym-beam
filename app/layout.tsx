import './globalStyles.css';

import type { Metadata } from 'next';

import { Navbar } from './components/Navbar';
import { API_GET_PRODUCTS_BY_SPORTS_NUTRITION_CATEGORY_URL } from './constants';
import { Provider } from './context/Provider';
import { FCC } from './types';

export const metadata: Metadata = {
  title: 'Gym Beam',
  description: 'Good energy for every sport',
  category: 'Sport & Fitness',
};

const getProductsData = async () => {
  try {
    const response = await fetch(API_GET_PRODUCTS_BY_SPORTS_NUTRITION_CATEGORY_URL);
    return await response.json();
  } catch (error) {
    console.error('Error fetching products data:', error);
    return { filters: [], items: [] };
  }
};

const RootLayout: FCC = async ({ children }) => {
  const productsData = await getProductsData();

  return (
    <html lang='en'>
      <body>
        <header>
          <Navbar />
        </header>
        <Provider {...productsData}>
          <main>{children}</main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
