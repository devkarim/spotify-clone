'use client';

import { ToastContainer } from 'react-toastify';

interface ToastProviderProps {}

const ToastProvider: React.FC<ToastProviderProps> = ({}) => {
  return <ToastContainer position="top-center" bodyClassName="font-sans" />;
};

export default ToastProvider;
