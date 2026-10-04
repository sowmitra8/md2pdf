import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App.jsx';
describe('App',()=>{it('renders the main controls',()=>{render(<App/>);expect(screen.getByText('md2pdf')).toBeInTheDocument();expect(screen.getByText('Export to PDF')).toBeInTheDocument();expect(screen.getByText('Preview')).toBeInTheDocument()})});
