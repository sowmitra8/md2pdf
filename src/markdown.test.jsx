import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MarkdownPreview } from './markdown.jsx';
describe('MarkdownPreview',()=>{it('renders GFM tables',()=>{render(<MarkdownPreview source={'| A | B |\\n|---|---|\\n| 1 | 2 |'} />);expect(screen.getByRole('table')).toBeInTheDocument()})});
