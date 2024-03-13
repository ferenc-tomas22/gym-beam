import { StarIcon } from '@/app/icons';
import { Product } from '@/app/model';

import { ImageComponent } from '../../Image';
import { Text } from '../../Text';

export const ProductComponent: React.FC<Product> = ({
  formatted_price,
  rating_summary,
  reviews_count,
  image,
  name,
}) => (
  <div className='col-12 col-md-4 col-lg-3 text-center'>
    <div className='p-3 border rounded-3 shadow-sm cursor-pointer'>
      <ImageComponent src={image} alt={name} width={200} height={200} />
      <Text typography='labelLarge' className='mb-0'>
        {name}
      </Text>
      <Text typography='labelLarge' className='mb-0'>
        {formatted_price}
      </Text>
      <ul className='list-unstyled d-flex justify-content-center gap-1 mb-1'>
        {Array.from({ length: 5 }, (__, index) => (
          <li key={index}>
            <StarIcon
              width='1rem'
              height='1rem'
              className={`text-${index < rating_summary / 20 ? 'warning' : 'secondary'}`}
            />
          </li>
        ))}
      </ul>
      <Text typography='labelRegular' className='mb-0'>
        {`${rating_summary} % (${reviews_count})`}
      </Text>
    </div>
  </div>
);
