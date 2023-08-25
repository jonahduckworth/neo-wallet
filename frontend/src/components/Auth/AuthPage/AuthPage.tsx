import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { SIGNUP_MUTATION, LOGIN_MUTATION } from '../graphql/auth';
import LoginForm from '../LoginForm';
import SignUpForm from '../SignUpForm';
import { AuthPageProps } from '../Types';

import { Button, Container, Typography, Box } from '@mui/material';

const AuthPage: React.FC<AuthPageProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });

  const [signup] = useMutation(SIGNUP_MUTATION);
  const [login] = useMutation(LOGIN_MUTATION);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (isLogin) {
      // Handle Login
      const { data } = await login({ variables: { email: formData.email, password: formData.password } });
      if (data) {
        onLogin(data.logIn.userId);
      }
      console.log("Logged in:", data);
    } else {
      // Handle Signup
      const { data } = await signup({ variables: formData });
      console.log("Signed up:", data);
    }
  };

  const propsForLoginForm = {
    formData: formData,
    onInputChange: handleInputChange,
    onSubmit: handleSubmit
  };

  const propsForSignUpForm = {
    formData: formData,
    onInputChange: handleInputChange,
    onSubmit: handleSubmit
  };

  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" align="center" gutterBottom>
          {isLogin ? 'Login' : 'Sign Up'}
        </Typography>
        {isLogin ? <LoginForm {...propsForLoginForm} /> : <SignUpForm {...propsForSignUpForm} />}
        <Box mt={2}>
          <Button fullWidth variant="outlined" onClick={() => setIsLogin(!isLogin)}>
            Switch to {isLogin ? 'Sign Up' : 'Login'}
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default AuthPage;
