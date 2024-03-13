import { ProductsFilters } from '@/app/components/ProductsFilter';
import { ProductsList } from '@/app/components/ProductsList';

const Home = () => (
  <main className='container-fluid p-5'>
    <ProductsFilters />
    <ProductsList />
  </main>
);

export default Home;
