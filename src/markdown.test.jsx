import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MarkdownPreview } from './markdown.jsx';

describe('MarkdownPreview', () => {
  it('renders GFM tables', () => {
    const source = `| A | B |
|---|---|
| 1 | 2 |`;
    render(<MarkdownPreview source={source} />);
    expect(screen.getByRole('table')).toBeInTheDocument();
  });
});
