import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { GlassCard } from './glass-card';

describe('GlassCard Component', () => {
  it('should render children correctly', () => {
    render(<GlassCard>Card Content</GlassCard>);
    const contentElement = screen.getByText('Card Content');

    expect(contentElement).toBeInTheDocument();
  });

  it('should apply custom className', () => {
    const customClass = 'my-custom-card';
    render(<GlassCard className={customClass}>Content</GlassCard>);

    const cardElement = screen.getByText('Content');
    expect(cardElement).toHaveClass(customClass);
  });
});
