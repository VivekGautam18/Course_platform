import React, { useState } from 'react';
import { ShieldCheck, RefreshCw, FileText } from 'lucide-react';

// NOTE FOR THE SITE OWNER: the text below is a starting-point template, not
// legal advice. Replace the bracketed [placeholders] with your real
// business details, and consider having a lawyer review this before you
// go live and start accepting real payments -- Razorpay's live-mode
// activation checks that pages like these exist and are accurate.

type LegalTab = 'privacy' | 'refund' | 'terms';

interface LegalPageProps {
  initialTab?: LegalTab;
}

export const LegalPage: React.FC<LegalPageProps> = ({ initialTab = 'privacy' }) => {
  const [tab, setTab] = useState<LegalTab>(initialTab);

  const tabs: { id: LegalTab; label: string; icon: React.ReactNode }[] = [
    { id: 'privacy', label: 'Privacy Policy', icon: <ShieldCheck className="w-4 h-4" /> },
    { id: 'refund', label: 'Refund & Cancellation', icon: <RefreshCw className="w-4 h-4" /> },
    { id: 'terms', label: 'Terms & Conditions', icon: <FileText className="w-4 h-4" /> },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-wrap gap-2 mb-8 border-b border-slate-200 dark:border-slate-800 pb-4">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-4 py-2 text-sm font-semibold rounded-xl flex items-center gap-2 transition ${
              tab === t.id
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
            }`}
          >
            {t.icon}
            {t.label}
          </button>
        ))}
      </div>

      <div className="prose prose-slate dark:prose-invert max-w-none text-sm leading-relaxed">
        {tab === 'privacy' && (
          <div className="space-y-5">
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">Privacy Policy</h1>
            <p className="text-slate-500 text-xs">Last updated: [DD Month YYYY]</p>

            <p>
              This Privacy Policy explains how <strong>[Business/Owner Legal Name]</strong> ("we", "us",
              "our"), operating this website for Sneha Gupta (CA Finalist)'s courses and mentorship
              programs, collects, uses, and protects information about visitors and students ("you").
            </p>

            <h3 className="font-bold text-slate-900 dark:text-white">Information We Collect</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Account details you provide: name, email address, phone number, college, and exam attempt.</li>
              <li>Payment-related information processed via Razorpay (we never see or store your full card, UPI, or bank details -- Razorpay handles that directly).</li>
              <li>Course progress and activity within your account (videos watched, purchases made).</li>
              <li>Basic technical data such as browser type, for keeping the site working correctly.</li>
            </ul>

            <h3 className="font-bold text-slate-900 dark:text-white">How We Use Your Information</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>To create and manage your account and give you access to purchased courses/programs.</li>
              <li>To process payments and maintain records of transactions.</li>
              <li>To contact you about your enrollment, mentorship sessions, or support requests.</li>
              <li>To improve the site and course content.</li>
            </ul>

            <h3 className="font-bold text-slate-900 dark:text-white">Data Sharing</h3>
            <p>
              We do not sell your personal information. We share the minimum necessary data with
              trusted service providers who help us run this site -- currently <strong>Razorpay</strong>{' '}
              (payment processing) and <strong>Google Firebase</strong> (account login and data storage) -- 
              solely to provide the service to you.
            </p>

            <h3 className="font-bold text-slate-900 dark:text-white">Data Security</h3>
            <p>
              We use industry-standard measures (including encrypted connections and access-controlled
              databases) to protect your data. No online system is 100% secure, but we take reasonable
              steps to safeguard your information.
            </p>

            <h3 className="font-bold text-slate-900 dark:text-white">Your Rights</h3>
            <p>
              You may request access to, correction of, or deletion of your personal data by contacting
              us at <strong>[support email]</strong>.
            </p>

            <h3 className="font-bold text-slate-900 dark:text-white">Contact Us</h3>
            <p>
              For any privacy-related questions, reach out at <strong>[support email]</strong> or{' '}
              <strong>[WhatsApp/phone number]</strong>.
            </p>
          </div>
        )}

        {tab === 'refund' && (
          <div className="space-y-5">
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">Refund & Cancellation Policy</h1>
            <p className="text-slate-500 text-xs">Last updated: [DD Month YYYY]</p>

            <p>
              This policy applies to all purchases made on this website, including chapter-wise courses,
              mentorship programs, and 1:1 strategy sessions.
            </p>

            <h3 className="font-bold text-slate-900 dark:text-white">Digital Courses</h3>
            <p>
              [Example -- edit to match your actual policy:] Once a course is purchased and content has
              been accessed, it is generally non-refundable, since it is a digital product delivered
              instantly. If you did not access any content, you may request a refund within{' '}
              <strong>[X days]</strong> of purchase by emailing <strong>[support email]</strong>.
            </p>

            <h3 className="font-bold text-slate-900 dark:text-white">Mentorship Programs</h3>
            <p>
              [Example -- edit to match your actual policy:] Mentorship program fees are refundable
              within <strong>[X days]</strong> of enrollment if no sessions have been attended. After
              that period, or once sessions begin, fees are non-refundable.
            </p>

            <h3 className="font-bold text-slate-900 dark:text-white">1:1 Strategy Sessions</h3>
            <p>
              [Example -- edit to match your actual policy:] You may reschedule a booked session by
              contacting us at least <strong>[X hours]</strong> before the scheduled time. Sessions
              missed without notice are non-refundable.
            </p>

            <h3 className="font-bold text-slate-900 dark:text-white">Failed / Duplicate Payments</h3>
            <p>
              If money was deducted from your account but the purchase did not reflect in your account
              (course/mentorship not unlocked), please contact us with your payment ID at{' '}
              <strong>[support email]</strong> and we will investigate and process a refund if the
              payment was not successfully captured on our end.
            </p>

            <h3 className="font-bold text-slate-900 dark:text-white">How Refunds Are Processed</h3>
            <p>
              Approved refunds are processed via Razorpay back to your original payment method, typically
              within <strong>[5-7 business days]</strong>.
            </p>
          </div>
        )}

        {tab === 'terms' && (
          <div className="space-y-5">
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">Terms & Conditions</h1>
            <p className="text-slate-500 text-xs">Last updated: [DD Month YYYY]</p>

            <p>
              By accessing or using this website, you agree to the following terms. If you do not agree,
              please do not use this site.
            </p>

            <h3 className="font-bold text-slate-900 dark:text-white">Who We Are</h3>
            <p>
              This website is operated by <strong>[Business/Owner Legal Name]</strong>, providing
              educational courses and mentorship for CA Foundation/Inter/Final students under the "Sneha
              Gupta (CA Finalist)" brand. This is an independent educational service and is not
              affiliated with or endorsed by ICAI.
            </p>

            <h3 className="font-bold text-slate-900 dark:text-white">Account & Eligibility</h3>
            <p>
              You must provide accurate information when creating an account. You are responsible for
              keeping your login credentials secure and for all activity under your account.
            </p>

            <h3 className="font-bold text-slate-900 dark:text-white">Purchases & Payments</h3>
            <p>
              All prices are listed in Indian Rupees (INR) and are inclusive/exclusive of applicable
              taxes as shown at checkout. Payments are processed securely via Razorpay. Access to
              purchased courses/programs is granted to your registered account only and may not be
              shared, resold, or transferred.
            </p>

            <h3 className="font-bold text-slate-900 dark:text-white">Content Usage</h3>
            <p>
              All course materials (videos, notes, PDFs) are for your personal, non-commercial use only.
              Downloading, recording, redistributing, or sharing course content outside your account is
              prohibited and may result in account termination without refund.
            </p>

            <h3 className="font-bold text-slate-900 dark:text-white">No Guarantee of Results</h3>
            <p>
              While we aim to provide high-quality educational content and mentorship, we do not
              guarantee specific exam results or outcomes.
            </p>

            <h3 className="font-bold text-slate-900 dark:text-white">Limitation of Liability</h3>
            <p>
              To the extent permitted by law, we are not liable for any indirect or consequential loss
              arising from your use of this website or its content.
            </p>

            <h3 className="font-bold text-slate-900 dark:text-white">Changes to These Terms</h3>
            <p>
              We may update these Terms from time to time. Continued use of the site after changes means
              you accept the updated Terms.
            </p>

            <h3 className="font-bold text-slate-900 dark:text-white">Contact</h3>
            <p>
              Questions about these Terms can be sent to <strong>[support email]</strong>.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};