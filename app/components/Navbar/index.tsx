import Image from 'next/image';
import Link from 'next/link';

import logo from '@/public/logo.png';

export const Navbar = () => (
  <nav className='navbar bg-body-tertiary'>
    <div className='container-fluid'>
      <Link href='/' className='navbar-brand mx-auto'>
        <Image src={logo} alt='GymBeam' height={60} />
      </Link>
    </div>
  </nav>
);
