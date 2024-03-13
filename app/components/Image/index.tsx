'use client';

import Image from 'next/image';

import styles from './styles.module.css';

type ImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
};

export const ImageComponent: React.FC<ImageProps> = (props) => (
  <div className='overflow-hidden'>
    <Image
      {...props}
      onMouseEnter={({ currentTarget: { classList } }) => {
        classList.remove(styles.shrink);
        classList.add(styles.enlarge);
      }}
      onMouseLeave={({ currentTarget: { classList } }) => {
        classList.remove(styles.enlarge);
        classList.add(styles.shrink);
      }}
    />
  </div>
);
