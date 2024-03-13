'use client';

import { useApp } from '@/app/context/App';

import { Text } from '../Text';
import { ProductComponent } from './Product';

export const ProductsList = () => {
  const { items } = useApp();

  return (
    <div className='row g-2'>
      {items.length > 0 ? (
        items.map((product) => <ProductComponent key={product.id} {...product} />)
      ) : (
        <Text typography='titleMedium' className='text-center'>
          Neboli nájdené žiadne produkty
        </Text>
      )}
    </div>
  );
};
