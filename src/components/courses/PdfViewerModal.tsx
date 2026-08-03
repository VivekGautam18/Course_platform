import React, { useState } from 'react';
import { FileText, Download, X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Eye, CheckCircle } from 'lucide-react';

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
  pageCount = 35,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [zoomLevel, setZoomLevel] = useState(100);

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
        <div className="px-5 py-2 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <button
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="p-1 hover:bg-slate-800 rounded disabled:opacity-30 disabled:hover:bg-transparent"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span>
              Page <strong className="text-slate-200">{currentPage}</strong> of {pageCount}
            </span>
            <button
              disabled={currentPage >= pageCount}
              onClick={() => setCurrentPage((p) => Math.min(pageCount, p + 1))}
              className="p-1 hover:bg-slate-800 rounded disabled:opacity-30 disabled:hover:bg-transparent"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

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

        {/* Reader Workspace / Document Preview Canvas */}
        <div className="flex-1 bg-slate-950 overflow-auto p-4 flex justify-center items-start">
          <div
            style={{ width: `${zoomLevel}%`, maxWidth: '800px' }}
            className="bg-white text-slate-900 rounded-xl p-8 sm:p-12 shadow-2xl space-y-6 transition-all duration-200 min-h-[600px] border border-slate-200 relative"
          >
            {/* Header branding in PDF */}
            <div className="border-b-2 border-blue-600 pb-4 flex justify-between items-end">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-blue-600">CA Finalist Sneha Gupta Notes</p>
                <h2 className="text-xl font-black text-slate-900 tracking-tight">{title}</h2>
              </div>
              <div className="text-right">
                <span className="text-[10px] bg-blue-100 text-blue-800 px-2 py-1 rounded font-bold">
                  PAGE {currentPage}
                </span>
              </div>
            </div>

            {/* Simulated Document Content Page */}
            {currentPage === 1 ? (
              <div className="space-y-4 text-sm leading-relaxed text-slate-700">
                <div className="p-4 bg-amber-50 border-l-4 border-amber-500 rounded-r-lg text-amber-900 text-xs">
                  <strong>Exam Tip by Sneha Gupta:</strong> Focus on section mnemonics and keyword structure. Highlighted terms are mandatory for ICAI valuation!
                </div>
                <h4 className="text-base font-bold text-slate-900 border-b pb-1">1. Executive Overview & Key Provisions</h4>
                <p>
                  Under CA Inter regulations, candidate answer scripts are evaluated based on precise technical vocabulary. This document synthesizes all RTP, MTP, and past attempt exam papers into high-impact point formats.
                </p>
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3 bg-blue-50/80 rounded-xl border border-blue-100">
                    <p className="text-xs font-bold text-blue-900">Key Formula / Mnemonics</p>
                    <p className="text-xs text-blue-700 mt-1">Section 54, 54B, 54EC, 54F exemptions structured flowchart.</p>
                  </div>
                  <div className="p-3 bg-indigo-50/80 rounded-xl border border-indigo-100">
                    <p className="text-xs font-bold text-indigo-900">Case Study Pointers</p>
                    <p className="text-xs text-indigo-700 mt-1">Landmark judicial precedents summarized in 3 sentences.</p>
                  </div>
                </div>
                <div className="pt-4 text-xs text-slate-500 font-mono text-center">
                  [ Scroll or use Next arrow to flip pages • Watermarked for Sneha Gupta Aspirants ]
                </div>
              </div>
            ) : (
              <div className="space-y-4 text-sm leading-relaxed text-slate-700">
                <h4 className="text-base font-bold text-slate-900 border-b pb-1">Chapter Sub-topic {currentPage} Notes & Exercises</h4>
                <p>
                  Detailed breakdown for Topic {currentPage}. Ensure you practice written answers for these questions before attempting mock tests.
                </p>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <p className="font-semibold text-slate-800 text-xs">Question {currentPage}.1 (ICAI May 2024 Past Paper Variant)</p>
                  <p className="text-xs text-slate-600">
                    Calculate total income and tax liability considering applicable surcharge, health and education cess under both normal provisions and Section 115BAC.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
