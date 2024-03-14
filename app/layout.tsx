import './globalStyles.css';

import type { Metadata } from 'next';

import { Navbar } from './components/Navbar';
import { API_GET_PRODUCTS_URL } from './constants';
import { Provider } from './context/Provider';
import { FCC } from './types';

export const metadata: Metadata = {
  title: 'Gym Beam',
  description: 'Good energy for every sport',
  category: 'Sport & Fitness',
};

const getProductsData = async () => {
  try {
    const response = await fetch(API_GET_PRODUCTS_URL, {
      // revalidate at most every hour
      next: { revalidate: 3600 },
    });

    return await response.json();
  } catch (error) {
    console.error('Error fetching products data:', error);

    return { filters: [], items: [] };
  }
};

const RootLayout: FCC = async ({ children }) => (
  <html lang='en'>
    <body>
      <header>
        <Navbar />
      </header>
      <Provider {...await getProductsData()}>
        <main>{children}</main>
      </Provider>
    </body>
  </html>
);

export default RootLayout;
