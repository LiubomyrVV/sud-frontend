import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
} from '@mui/material';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

export default function UpdateUserDialog({ open, user, onClose, onSubmit }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: { name: '', role: '' },
  });

  useEffect(() => {
    if (user) {
      reset({ name: user.name || '', role: user.role || 'user' });
    }
  }, [user, reset]);

  const onFormSubmit = (data) => {
    onSubmit(data);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Edit User</DialogTitle>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <DialogContent className="flex flex-col gap-4 mt-2">
          <TextField
            label="Name"
            {...register('name', {
              required: 'Name is required',
              minLength: {
                value: 2,
                message: 'Name must be at least 2 characters',
              },
            })}
            error={!!errors.name}
            helperText={errors.name?.message}
            fullWidth
          />

          <TextField
            label="Role"
            select
            {...register('role', { required: 'Role is required' })}
            error={!!errors.role}
            helperText={errors.role?.message}
            fullWidth
          >
            <MenuItem value="user">User</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
          </TextField>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={onClose}
            color="inherit"
            sx={{
              ':hover': {
                color: 'white',
                transition: '0.3s',
              },
            }}
          >
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary">
            OK
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
