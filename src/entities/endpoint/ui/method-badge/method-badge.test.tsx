import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MethodBadge } from './method-badge';

describe('MethodBadge Component', () => {
  it('should render standard methods correctly', () => {
    const { rerender } = render(<MethodBadge type="get" />);
    expect(screen.getByText('GET')).toBeInTheDocument();

    rerender(<MethodBadge type="post" />);
    expect(screen.getByText('POST')).toBeInTheDocument();

    rerender(<MethodBadge type="delete" />);
    expect(screen.getByText('DELETE')).toBeInTheDocument();
  });
});
