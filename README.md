# md2pdf v2

Modern, privacy-first Markdown to PDF in your browser.

## Modernization

- React 19 + Vite replaces the legacy Create React App stack.
- CodeMirror 6 replaces CodeMirror 5.
- GitHub-flavored Markdown with tables and task lists.
- Syntax highlighting, safe raw HTML, heading anchors, and Mermaid diagrams.
- Responsive editor/preview layout for desktop and mobile.
- Local draft persistence and local Markdown import with a 2 MB guard.
- PDF export uses the browser print engine; no document is uploaded.
- Node 22 CI with current GitHub Actions.

## Development

Requires Node.js 22 or newer.

Commands: npm install, npm run dev, npm test, npm run build.

## Security

Markdown is processed in the browser. Rendered HTML is sanitized and Mermaid uses strict security mode.

This repository is a modernization/fork based on the MIT-licensed realdennis/md2pdf project.
