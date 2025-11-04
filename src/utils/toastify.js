import { toast } from 'react-toastify';

export const notify = (type = 'success', message = '') => {
  const validTypes = ['success', 'error', 'info', 'warn', 'default'];
  const toastType = validTypes.includes(type) ? type : 'default';
  toast[toastType](message);
};
