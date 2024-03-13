'use client';

import { useEffect } from 'react';

import { ProductsData } from '@/app/model';
import { FCC } from '@/app/types';

import { AppProvider } from '../App';
import { ModalProvider } from '../Modal';
import { ToastProvider } from '../Toast';

export const Provider: FCC<ProductsData> = ({ children, ...props }) => {
  useEffect(() => {
    require('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);

  return (
    <ToastProvider>
      <AppProvider {...props}>
        <ModalProvider>{children}</ModalProvider>
      </AppProvider>
    </ToastProvider>
  );
};
