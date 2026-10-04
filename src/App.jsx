import React, { useEffect, useMemo, useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { markdown } from '@codemirror/lang-markdown';
import { oneDark } from '@codemirror/theme-one-dark';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSanitize from 'rehype-sanitize';
import rehypeHighlight from 'rehype-highlight';
import 'github-markdown-css/github-markdown.css';
import 'highlight.js/styles/github.css';

const SAMPLE = '# Markdown to PDF\n\n> Private Markdown conversion in your browser.\n\n## Features\n\n- **GitHub-flavored Markdown**\n- Tables and task lists\n- Syntax-highlighted code\n- Responsive editor and preview\n- No server upload\n\n| Feature | Status |\n| --- | --- |\n| Markdown | ✅ |\n| PDF export | ✅ |\n| Privacy | ✅ |\n\n```js\nconst privateByDesign = true;\nconsole.log(privateByDesign);\n```';

function titleFromMarkdown(text) {
  const match = text.match(/^#\s+(.+)$/m);
  return match?.[1]?.trim() || 'document';
}

export default function App() {
  const [source, setSource] = useState(() => localStorage.getItem('md2pdf:draft') || SAMPLE);
  const [dark, setDark] = useState(() => localStorage.getItem('md2pdf:theme') === 'dark');
  const [mobileMode, setMobileMode] = useState('editor');

  useEffect(() => localStorage.setItem('md2pdf:draft', source), [source]);
  useEffect(() => {
    document.documentElement.dataset.theme = dark ? 'dark' : 'light';
    localStorage.setItem('md2pdf:theme', dark ? 'dark' : 'light');
  }, [dark]);

  const stats = useMemo(() => ({
    words: (source.match(/\b[\w’'-]+\b/g) || []).length,
    chars: source.length
  }), [source]);

  const exportPdf = () => {
    const previous = document.title;
    document.title = titleFromMarkdown(source);
    window.print();
    setTimeout(() => { document.title = previous; }, 1000);
  };

  const importFile = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      alert('Please choose a Markdown file under 2 MB.');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setSource(String(reader.result || ''));
    reader.readAsText(file);
    event.target.value = '';
  };

  return (
    <div className="app-shell">
      <header className="toolbar no-print">
        <div className="brand"><span className="brand-mark">M</span><span>md2pdf</span><small>private by design</small></div>
        <div className="actions">
          <label className="button secondary">Import .md<input hidden type="file" accept=".md,text/markdown" onChange={importFile} /></label>
          <button className="button primary" onClick={exportPdf}>Export to PDF</button>
          <button className="icon-button" onClick={() => setDark(v => !v)} aria-label="Toggle theme">{dark ? '☀' : '☾'}</button>
        </div>
      </header>

      <div className="mobile-tabs no-print">
        <button className={mobileMode === 'editor' ? 'active' : ''} onClick={() => setMobileMode('editor')}>Editor</button>
        <button className={mobileMode === 'preview' ? 'active' : ''} onClick={() => setMobileMode('preview')}>Preview</button>
      </div>

      <main className="workspace">
        <section className={'editor-pane mobile-' + mobileMode}>
          <div className="pane-head no-print"><span>Markdown</span><span>{stats.words} words · {stats.chars} chars</span></div>
          <CodeMirror value={source} height="100%" extensions={[markdown()]} theme={dark ? oneDark : undefined} onChange={setSource} basicSetup={{ lineNumbers: true, foldGutter: true, autocompletion: true, searchKeymap: true }} />
        </section>

        <section className={'preview-pane mobile-' + mobileMode}>
          <div className="pane-head no-print"><span>Preview</span><span>Live</span></div>
          <div className="preview-scroll">
            <article className="markdown-body markdown-preview">
              <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSanitize, rehypeHighlight]}>{source}</ReactMarkdown>
            </article>
          </div>
        </section>
      </main>

      <footer className="statusbar no-print"><span>Runs locally in your browser · nothing uploaded</span><span>Markdown · GFM · PDF</span></footer>
    </div>
  );
}
