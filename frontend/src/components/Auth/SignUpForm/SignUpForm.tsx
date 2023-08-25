import React from 'react';
import { SignUpFormProps } from '../Types';

import { Button, TextField, Box } from '@mui/material';

const SignUpForm: React.FC<SignUpFormProps> = ({ formData, onInputChange, onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      <Box my={2}>
        <TextField
          fullWidth
          label="Username"
          variant="outlined"
          type="text"
          name="username"
          value={formData.username}
          onChange={onInputChange}
          size="small"
        />
      </Box>
      <Box my={2}>
        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          type="email"
          name="email"
          value={formData.email}
          onChange={onInputChange}
          size="small"
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
          size="small"
        />
      </Box>
      <Button fullWidth variant="contained" color="primary" type="submit">
        Sign Up
      </Button>
    </form>
  );
}

export default SignUpForm;
