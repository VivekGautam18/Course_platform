import React from 'react';
import { BookOpen, GraduationCap, Phone, Mail, MessageSquare, ShieldCheck, Heart, ExternalLink } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white font-bold flex items-center justify-center text-lg">
                SG
              </div>
              <div>
                <h4 className="font-extrabold text-white text-base">Sneha Gupta</h4>
                <p className="text-xs text-blue-400 font-semibold">CA Finalist & Academic Educator</p>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Empowering CA Inter & Foundation aspirants through targeted chapter-wise mastery, handwritten notes, and 1:1 structured mentorship.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>5,000+ Students Mentored • 94% Exam Pass Rate</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <p className="text-xs font-bold text-white uppercase tracking-wider">Quick Navigation</p>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => setActiveTab('home')} className="hover:text-blue-400 transition">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('courses')} className="hover:text-blue-400 transition">
                  Chapter-wise Fastrack Courses
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('mentorship')} className="hover:text-blue-400 transition">
                  Mentorship Programs (Sept 26 / Jan 27)
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('strategy')} className="hover:text-blue-400 transition">
                  1:1 Personal Strategy Session (₹799)
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('reviews')} className="hover:text-blue-400 transition">
                  Student Reviews & WhatsApp Screenshots
                </button>
              </li>
            </ul>
          </div>

          {/* Student Support */}
          <div className="space-y-3">
            <p className="text-xs font-bold text-white uppercase tracking-wider">Direct Mentorship Support</p>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp: +91 98765 43210</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-400" />
                <span>Email: support@snehagupta.com</span>
              </li>
              <li className="flex items-center gap-2">
                <ExternalLink className="w-4 h-4 text-indigo-400" />
                <span>Telegram: CA Inter Rankers Hub</span>
              </li>
            </ul>
          </div>

          {/* Disclaimer */}
          <div className="space-y-3">
            <p className="text-xs font-bold text-white uppercase tracking-wider">Educational Disclaimer</p>
            <p className="text-xs text-slate-500 leading-relaxed">
              Sneha Gupta is an independent academic mentor and CA Finalist. This educational portal is not officially affiliated with or endorsed by ICAI. All trademarks belong to their respective owners.
            </p>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Sneha Gupta (CA Finalist). All Rights Reserved.</p>
          <div className="flex items-center gap-1">
            <span>Designed for CA Aspirants with</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 inline" />
          </div>
        </div>
      </div>
    </footer>
  );
};
