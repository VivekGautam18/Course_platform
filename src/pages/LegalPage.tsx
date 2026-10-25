import React, { useEffect } from 'react';
import { ShieldCheck, RefreshCw, FileText, ExternalLink, Info } from 'lucide-react';
import { LEGAL_DOCS, LegalPageId, Block } from './LegalContent';

interface LegalPageProps {
  /** Which policy to show. Each policy is its own page. */
  page: LegalPageId;
  setActiveTab: (tab: string) => void;
}

const NAV: { id: LegalPageId; label: string; icon: React.ReactNode }[] = [
  { id: 'terms', label: 'Terms & Conditions', icon: <FileText className="w-4 h-4" /> },
  { id: 'refund', label: 'Refund & Cancellation', icon: <RefreshCw className="w-4 h-4" /> },
  { id: 'privacy', label: 'Privacy Policy', icon: <ShieldCheck className="w-4 h-4" /> },
];

const renderBlock = (b: Block, i: number) => {
  switch (b.t) {
    case 'p':
      return (
        <p key={i} className="text-slate-600 dark:text-slate-300">
          {b.text}
        </p>
      );
    case 'sub':
      return (
        <h3 key={i} className="font-bold text-slate-900 dark:text-white pt-1">
          {b.text}
        </h3>
      );
    case 'ul':
      return (
        <ul key={i} className="list-disc pl-5 space-y-1.5 text-slate-600 dark:text-slate-300 marker:text-blue-500">
          {b.items.map((it, j) => (
            <li key={j}>{it}</li>
          ))}
        </ul>
      );
    case 'contact':
      return (
        <div
          key={i}
          className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 divide-y divide-slate-100 dark:divide-slate-800"
        >
          {b.rows.map((r, j) => (
            <div key={j} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 px-4 py-3">
              <span className="w-32 shrink-0 text-xs font-bold uppercase tracking-wider text-slate-500">{r.label}</span>
              {r.href ? (
                <a
                  href={r.href}
                  target={r.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 font-medium break-all hover:underline inline-flex items-center gap-1"
                >
                  {r.value}
                  {r.href.startsWith('http') && <ExternalLink className="w-3.5 h-3.5 shrink-0" />}
                </a>
              ) : (
                <span className="text-slate-800 dark:text-slate-200 font-medium">{r.value}</span>
              )}
            </div>
          ))}
        </div>
      );
  }
};

export const LegalPage: React.FC<LegalPageProps> = ({ page, setActiveTab }) => {
  const doc = LEGAL_DOCS[page];

  // Start each policy at the top when navigating between them.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [page]);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Switch between the three pages */}
      <nav aria-label="Legal pages" className="flex flex-wrap gap-2 mb-8 border-b border-slate-200 dark:border-slate-800 pb-4">
        {NAV.map((n) => (
          <button
            key={n.id}
            onClick={() => setActiveTab(n.id)}
            aria-current={page === n.id ? 'page' : undefined}
            className={`px-4 py-2 text-sm font-semibold rounded-xl flex items-center gap-2 transition ${
              page === n.id
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            {n.icon}
            {n.label}
          </button>
        ))}
      </nav>

      <header className="mb-8 space-y-2">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">{doc.title}</h1>
        <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">{doc.subtitle}</p>
        <p className="text-xs text-slate-500">Last updated: {doc.lastUpdated}</p>
      </header>

      {doc.highlights && (
        <aside className="mb-8 rounded-2xl border border-blue-200 dark:border-blue-900/60 bg-blue-50 dark:bg-blue-950/30 p-5">
          <p className="flex items-center gap-2 text-sm font-bold text-blue-800 dark:text-blue-300 mb-3">
            <Info className="w-4 h-4" />
            {doc.highlights.title}
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-700 dark:text-slate-300 marker:text-blue-500">
            {doc.highlights.points.map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </ul>
        </aside>
      )}

      <article className="space-y-8 text-sm leading-relaxed">
        {doc.sections.map((s, i) => (
          <section key={i} className="space-y-3">
            <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">{s.heading}</h2>
            {s.blocks.map(renderBlock)}
          </section>
        ))}
      </article>
    </div>
  );
};
