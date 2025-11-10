import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
export default function AddUserDialog({ open, onClose, onSubmit }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: { name: '', email: '', password: '' },
  });
  const [showPassword, setShowPassword] = useState(false);

  // Reset form when dialog opens
  useEffect(() => {
    if (open) reset({ name: '', email: '', password: '' });
  }, [open, reset]);

  // Handle form submission
  const onFormSubmit = (data) => {
    onSubmit(data);
  };

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Add New User</DialogTitle>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <DialogContent className="flex flex-col gap-4 mt-2">
          {/* Name input */}
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

          {/* Email input */}
          <TextField
            label="Email"
            {...register('email', {
              required: 'Email is required',
              pattern: { value: /^\S+@\S+\.\S+$/, message: 'Invalid email' },
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
            fullWidth
          />
          {/* Password input */}
          <TextField
            label="Password"
            type={showPassword ? 'text' : 'password'}
            {...register('password', {
              required: 'Password is required',
              minLength: { value: 6, message: 'Password too short' },
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
            fullWidth
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleTogglePassword}
                      edge="end"
                      aria-label="toggle password visibility"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
        </DialogContent>

        <DialogActions>
          {/* Cancel button */}
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

          {/* Submit button */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{
              ':hover': {
                backgroundColor: 'white',
                color: 'black',
                transition: '0.3s',
              },
            }}
          >
            Add
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
