'use client';

import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { FaXmark } from 'react-icons/fa6';

import { cn } from '@/lib/utils';

interface ModalProps {
  title?: string;
  subtitle?: string;
  isOpen?: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  disabled?: boolean;
  onOuterClick?: () => void;
  parentClassName?: string;
  className?: string;
}

const Modal: React.FC<ModalProps> = ({
  title,
  subtitle,
  isOpen,
  onClose,
  children,
  disabled = false,
  onOuterClick,
  parentClassName,
  className,
}) => {
  if (!isOpen) return null;

  return (
    <Transition show={isOpen} appear as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        open={isOpen}
        onClose={onClose}
      >
        <div
          className="fixed inset-0 bg-base-100/60 backdrop-blur-sm"
          aria-hidden="true"
        />
        <div
          className={cn('fixed inset-0 overflow-y-auto', parentClassName)}
          onClick={(e) => {
            if (disabled) return;
            if (e.target == e.currentTarget) {
              onOuterClick && onOuterClick();
            }
          }}
        >
          <div className="left-0 flex w-full min-h-full justify-center items-center p-4 overflow-y-auto">
            <Dialog.Panel
              className={cn(
                'card relative rounded-md w-full max-w-xl bg-card shadow-xl p-2',
                className
              )}
            >
              <button
                className="btn btn-circle btn-ghost absolute right-2"
                type="button"
                onClick={onClose}
              >
                <FaXmark className="opacity-60" />
              </button>
              <div className="card-body space-y-4">
                <div className="space-y-1">
                  {title && (
                    <h2 className="font-semibold text-xl lg:text-2xl">
                      {title}
                    </h2>
                  )}
                  {subtitle && <p className="text-sm opacity-60">{subtitle}</p>}
                </div>
                {children}
              </div>
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
