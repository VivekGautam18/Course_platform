import React, { useState } from 'react';
import { FileText, Download, X, ZoomIn, ZoomOut, ExternalLink } from 'lucide-react';

interface PdfViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  fileUrl: string;
  type: 'notes' | 'question_bank';
  pageCount?: number;
}

export const PdfViewerModal: React.FC<PdfViewerModalProps> = ({
  isOpen,
  onClose,
  title,
  fileUrl,
  type,
}) => {
  const [zoomLevel, setZoomLevel] = useState(100);
  const [loadFailed, setLoadFailed] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-2 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-slate-900 text-white rounded-2xl shadow-2xl border border-slate-800 w-full max-w-4xl h-[90vh] flex flex-col overflow-hidden">
        {/* PDF Reader Header Bar */}
        <div className="px-5 py-3.5 bg-slate-800/90 border-b border-slate-700/80 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 truncate">
            <div className="p-2 bg-blue-600/20 text-blue-400 rounded-xl border border-blue-500/30">
              <FileText className="w-5 h-5" />
            </div>
            <div className="truncate">
              <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                type === 'notes' ? 'bg-indigo-500/20 text-indigo-300' : 'bg-amber-500/20 text-amber-300'
              }`}>
                {type === 'notes' ? 'Sneha Gupta Summary Notes' : 'ICAI RTP/MTP Question Bank'}
              </span>
              <h3 className="text-sm font-semibold text-slate-100 truncate">{title}</h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-white text-xs font-medium rounded-xl flex items-center gap-1.5 transition"
              title="Open in a new tab"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Open in Tab</span>
            </a>
            <a
              href={fileUrl}
              download={title}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium rounded-xl flex items-center gap-1.5 transition"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Download PDF</span>
            </a>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-700/80 rounded-xl transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Reader Toolbar */}
        <div className="px-5 py-2 bg-slate-900 border-b border-slate-800 flex items-center justify-end text-xs text-slate-400">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setZoomLevel((z) => Math.max(70, z - 15))}
              className="p-1 hover:bg-slate-800 rounded"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="font-mono text-[11px]">{zoomLevel}%</span>
            <button
              onClick={() => setZoomLevel((z) => Math.min(150, z + 15))}
              className="p-1 hover:bg-slate-800 rounded"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Reader Workspace: the actual uploaded PDF, rendered live */}
        <div className="flex-1 bg-slate-950 overflow-auto p-4 flex justify-center items-start">
          {!fileUrl ? (
            <div className="text-slate-400 text-sm p-8 text-center">
              No PDF file is attached to this resource.
            </div>
          ) : loadFailed ? (
            <div className="text-slate-300 text-sm p-8 text-center max-w-md space-y-3">
              <p>The PDF couldn't be previewed inline (this can happen with some browsers or file hosts).</p>
              <a
                href={fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-xl font-semibold text-white"
              >
                <ExternalLink className="w-4 h-4" />
                Open PDF in a new tab
              </a>
            </div>
          ) : (
            <div
              style={{ width: `${zoomLevel}%`, maxWidth: '900px' }}
              className="h-full min-h-[600px] transition-all duration-200"
            >
              <iframe
                key={fileUrl}
                src={fileUrl}
                title={title}
                className="w-full h-full min-h-[600px] rounded-xl border border-slate-700 bg-white"
                onError={() => setLoadFailed(true)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};