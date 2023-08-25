import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { SIGNUP_MUTATION, LOGIN_MUTATION } from '../graphql/auth';
import LoginForm from '../LoginForm';
import SignUpForm from '../SignUpForm';
import { AuthPageProps } from '../Types';

import {
  Container,
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Divider,
  useTheme,
} from '@mui/material';

const AuthPage: React.FC<AuthPageProps> = ({ onLogin }) => {
  const theme = useTheme();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });

  const [signup] = useMutation(SIGNUP_MUTATION);
  const [login] = useMutation(LOGIN_MUTATION);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { target: { name: string, value: string | number } }) => {
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
      if (data?.signUp?.userId) { // Check if sign up was successful by checking for a userId in the response
        setIsLogin(true); // Redirect to login
      }
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
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Card style={{ width: '55%' }}>
          <CardContent>
            <Typography variant="h4" align="center" gutterBottom>
              {isLogin ? 'Login' : 'Sign Up'}
            </Typography>
            {isLogin ? <LoginForm {...propsForLoginForm} /> : <SignUpForm {...propsForSignUpForm} />}
            
            <Box mt={3}>
              <Divider />
            </Box>

            <Box mt={2} display="flex" justifyContent="center">
              <Button 
                color="primary" 
                size="small"
                onClick={() => setIsLogin(!isLogin)}
              >
                Switch to {isLogin ? 'Sign Up' : 'Login'}
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}

export default AuthPage;
