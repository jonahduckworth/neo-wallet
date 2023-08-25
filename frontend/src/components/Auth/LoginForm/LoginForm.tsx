import React from 'react';
import { LoginFormProps } from '../Types';

import { Button, TextField, Box } from '@mui/material';

const LoginForm: React.FC<LoginFormProps> = ({ formData, onInputChange, onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      <Box my={2}>
        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          type="email"
          name="email"
          value={formData.email}
          onChange={onInputChange}
        />
      </Box>
      <Box my={2}>
        <TextField
          fullWidth
          label="Password"
          variant="outlined"
          type="password"
          name="password"
          value={formData.password}
          onChange={onInputChange}
        />
      </Box>
      <Button fullWidth variant="contained" color="primary" type="submit">
        Login
      </Button>
    </form>
  );
}

export default LoginForm;
