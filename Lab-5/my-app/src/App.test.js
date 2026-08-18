import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

test('renders the card form and primary action', () => {
  render(<App />);

  expect(screen.getByLabelText(/Cardholder name/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /confirm/i })).toBeInTheDocument();
});

test('shows validation errors for empty fields', async () => {
  render(<App />);

  await userEvent.click(screen.getByRole('button', { name: /confirm/i }));

  expect(screen.getAllByText(/Can't be blank/i).length).toBeGreaterThan(0);
});
