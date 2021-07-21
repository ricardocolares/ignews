import { render, screen } from '@testing-library/react';
import { useSession } from 'next-auth/client';
import { mocked } from 'ts-jest/utils';
import { SignInButton } from '.';

jest.mock('next-auth/client');

describe('Header component', () => {
  it('should render correctly when user is not authenticated', () => {
    const useSessionMocker = mocked(useSession);

    useSessionMocker.mockReturnValueOnce([null, false]);

    render(<SignInButton />);

    expect(screen.getByText('Sign in with Github')).toBeInTheDocument();
  });

  it('should render correctly when user is authenticated', () => {
    const useSessionMocker = mocked(useSession);

    useSessionMocker.mockReturnValueOnce([
      { user: { name: 'John Doe', email: 'john.doe@mail.com' }, expires: 'fake-expires' },
      false,
    ]);

    render(<SignInButton />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });
});
