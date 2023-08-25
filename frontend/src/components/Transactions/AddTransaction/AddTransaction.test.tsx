import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { waitFor } from '@testing-library/dom';
import AddTransaction from '../AddTransaction';
import { GET_TRANSACTIONS, ADD_TRANSACTION } from '../graphql/transactions';

// Mocks for the mutations and queries
const mocks = [
  {
    request: {
      query: ADD_TRANSACTION,
      variables: {
        description: 'test',
        amount: 100.0,
        type: 'expense',
        date: new Date().toISOString(),
        userId: '1'
      },
    },
    result: {
      data: {
        addTransaction: { id: '2', description: 'test', amount: 100.0, type: 'expense', date: new Date().toISOString() }
      },
    },
  },
  {
    request: {
      query: GET_TRANSACTIONS,
      variables: { userId: '1' }
    },
    result: {
      data: {
        transactions: []
      }
    }
  }
];

describe('<AddTransaction />', () => {
  it('renders without crashing', () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <AddTransaction userId="1" />
      </MockedProvider>
    );
  });

  it('updates state on input change', async () => {
    const { getByLabelText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <AddTransaction userId="123" />
      </MockedProvider>
    );
    
    const descriptionInput = getByLabelText(/description/i) as HTMLInputElement;
  
    fireEvent.change(descriptionInput!, { target: { value: 'test' } });
    expect(descriptionInput!.value).toBe('test');
  });
  

  // Additional test for form submission can be added here.
  // This will involve simulating a form submission and checking if the appropriate GraphQL mutation is called.
  // Note: Testing mutations requires more setup with async act and await new Promise(res => setTimeout(res, 0))
  // to wait for the mocked response. 
});

