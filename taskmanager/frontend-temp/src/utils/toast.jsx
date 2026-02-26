import React from 'react';
import { Toaster, toast as hotToast } from 'react-hot-toast';

export const ToastProvider = () => (
  <Toaster
    position="top-right"
    toastOptions={{
      className: 'text-sm',
      duration: 4000,
      style: {
        background: '#111827',
        color: '#f9fafb',
        borderRadius: '0.5rem'
      },
      success: {
        iconTheme: {
          primary: '#22c55e',
          secondary: '#111827'
        }
      },
      error: {
        iconTheme: {
          primary: '#ef4444',
          secondary: '#111827'
        }
      }
    }}
  />
);

const success = (message, options) => hotToast.success(message, options);
const error = (message, options) => hotToast.error(message, options);
const info = (message, options) => hotToast(message, options);
const promise = (promiseOrFn, messages, options) =>
  hotToast.promise(
    typeof promiseOrFn === 'function' ? promiseOrFn() : promiseOrFn,
    messages,
    options
  );

export const toast = {
  success,
  error,
  info,
  promise
};

