import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Input } from './input';

describe('Input Component', () => {
  it('should render label correctly', () => {
    render(<Input label="Username" />);
    const inputElement = screen.getByRole('textbox', { name: /username/i });

    expect(inputElement).toBeInTheDocument();
  });

  it('should allow user to type text', async () => {
    const user = userEvent.setup();
    render(<Input label="Username" />);

    const inputElement = screen.getByRole('textbox', { name: /username/i });
    await user.type(inputElement, 'John Doe');

    expect(inputElement).toHaveValue('John Doe');
  });

  it('should render error message when provided', () => {
    const errorMessage = 'Username is required';
    render(<Input label="Username" error={errorMessage} />);

    const errorElement = screen.getByText(errorMessage);
    expect(errorElement).toBeInTheDocument();
  });

  it('should pass native html attributes like placeholder and type', () => {
    render(<Input label="Password" type="password" placeholder="Enter password" />);

    const inputElement = screen.getByLabelText(/password/i);
    expect(inputElement).toHaveAttribute('type', 'password');
    expect(inputElement).toHaveAttribute('placeholder', 'Enter password');
  });

  it('should call onChange handler when typing', async () => {
    const onChangeMock = vi.fn();
    const user = userEvent.setup();

    render(<Input label="Username" onChange={onChangeMock} />);
    const inputElement = screen.getByRole('textbox', { name: /username/i });

    await user.type(inputElement, 'a');
    expect(onChangeMock).toHaveBeenCalledOnce();
  });
});
