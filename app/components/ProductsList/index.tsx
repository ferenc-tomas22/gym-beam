'use client';

import { useApp } from '@/app/context/App';

import { Text } from '../Text';
import { ProductComponent } from './Product';

export const ProductsList = () => {
  const { items } = useApp();

  if (items.length > 0) {
    return (
      <div className='row g-2'>
        {items.map((product) => (
          <ProductComponent key={product.id} {...product} />
        ))}
      </div>
    );
  }

  return (
    <Text typography='titleMedium' className='text-center'>
      Neboli nájdené žiadne produkty
    </Text>
  );
};
