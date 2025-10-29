import { toast } from 'react-toastify';

export const notify = (type = 'success', message) => {
  toast[type](message);
};
