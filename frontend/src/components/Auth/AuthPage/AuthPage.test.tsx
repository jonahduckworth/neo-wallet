import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import AuthPage from '.';
import { LOGIN_MUTATION, SIGNUP_MUTATION } from '../graphql/auth';

// Mocks for the mutations
const mocks = [
  {
    request: {
      query: LOGIN_MUTATION,
      variables: { email: 'test@email.com', password: 'testpass' },
    },
    result: {
      data: {
        logIn: { userId: '1', token: 'test-token' }
      },
    },
  },
  {
    request: {
      query: SIGNUP_MUTATION,
      variables: { username: 'testuser', email: 'test@email.com', password: 'testpass' },
    },
    result: {
      data: {
        signUp: { userId: '1', token: 'test-token' }
      },
    },
  }
];

describe('<AuthPage />', () => {
  it('renders without crashing', () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <AuthPage onLogin={() => {}} />
      </MockedProvider>
    );
  });

  it('toggles between login and signup forms', () => {
    const { getByRole, getByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <AuthPage onLogin={() => {}} />
      </MockedProvider>
    );
  
    expect(getByRole('heading', { level: 4, name: /Login/i })).toBeInTheDocument();
  
    const toggleButton = getByText(/Switch to Sign Up/);
    fireEvent.click(toggleButton);
  
    expect(getByRole('heading', { level: 4, name: /Sign Up/i })).toBeInTheDocument();
  });  

  // Additional tests for form submissions and other behaviors can be added here.
  // For instance, you can simulate form submissions and check if the appropriate GraphQL mutations are called.

  // Note: Testing mutations requires more setup with async act and await new Promise(res => setTimeout(res, 0)) 
  // to wait for the mocked response. 

  // Similarly, you can test the handleInputChange function by simulating input changes and checking if the state updates.
});

