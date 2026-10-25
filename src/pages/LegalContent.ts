// Legal copy for the three policy pages. Edit text here -- LegalPage.tsx only renders it.

export type LegalPageId = 'terms' | 'refund' | 'privacy';

export type Block =
  | { t: 'p'; text: string }
  | { t: 'sub'; text: string }
  | { t: 'ul'; items: string[] }
  | { t: 'contact'; rows: { label: string; value: string; href?: string }[] };

export interface Section {
  heading: string;
  blocks: Block[];
}

export interface LegalDoc {
  title: string;
  subtitle: string;
  lastUpdated: string;
  highlights?: { title: string; points: string[] };
  sections: Section[];
}

export const LAST_UPDATED = '26 September 2026';
export const SUPPORT_EMAIL = 'support@snehagupta.com';
export const TELEGRAM_URL = 'https://t.me/snehastudiess';

/* ------------------------------------------------------------------ */
/* TERMS & CONDITIONS                                                  */
/* ------------------------------------------------------------------ */
const terms: LegalDoc = {
  title: 'Terms & Conditions',
  subtitle: 'CA Mentorship and Strategy Call',
  lastUpdated: LAST_UPDATED,
  sections: [
    {
      heading: 'A. About the Service',
      blocks: [
        {
          t: 'p',
          text:
            'The CA Mentorship Program is an educational guidance and academic-support service intended to help students plan and execute their CA examination preparation through personalized study planning, strategy, accountability and academic guidance.',
        },
      ],
    },
    {
      heading: 'B. Services Included',
      blocks: [
        { t: 'p', text: 'The mentorship may include:' },
        {
          t: 'ul',
          items: [
            'Initial 30-minute strategy call',
            'Personalized study planners',
            'Subject-wise study strategy',
            'Progress and accountability guidance',
            'Learning and memory techniques',
            'Revision and examination strategy',
            'WhatsApp support for academic and mentorship-related communication',
            'Calls/support as included in the mentorship service',
          ],
        },
        { t: 'p', text: 'Answer checking/evaluation is not included in the mentorship program.' },
      ],
    },
    {
      heading: 'C. Duration and Validity',
      blocks: [
        {
          t: 'p',
          text:
            'The validity of the mentorship is linked to the examination attempt and group for which the student has enrolled. The mentorship remains valid until the last examination of the relevant group for the enrolled attempt.',
        },
        { t: 'p', text: 'For example:' },
        {
          t: 'ul',
          items: [
            "For a Group 1 student, the mentorship will remain valid until the student's last Group 1 examination (i.e. the Taxation examination).",
            "For a Group 2 student, the mentorship will remain valid until the student's last Group 2 examination (i.e. the FM/SM examination).",
          ],
        },
        {
          t: 'p',
          text:
            'The duration does not depend on how early or late the student enrolls. Whether the student enrolls 10 days, 15 days, one month or several months before the examination, the mentorship validity will end on the last examination date of the relevant enrolled attempt and group.',
        },
        { t: 'p', text: 'The mentorship does not automatically extend to a subsequent examination attempt.' },
      ],
    },
    {
      heading: 'D. Student Responsibilities',
      blocks: [
        { t: 'p', text: 'The student is responsible for:' },
        {
          t: 'ul',
          items: [
            'Providing accurate academic and personal information required for preparation of the study plan.',
            'Following the recommended study plan to the best of their ability.',
            'Completing the suggested study/revision tasks.',
            'Communicating their progress and difficulties with the mentor.',
            'Making appropriate use of the mentorship services during the validity period.',
            'Preparing independently for the CA examination.',
          ],
        },
        {
          t: 'p',
          text:
            'The mentor provides planning, guidance, strategy and accountability. The student remains responsible for implementing the guidance and preparing for the examination.',
        },
      ],
    },
    {
      heading: 'E. Study Planner',
      blocks: [
        {
          t: 'p',
          text: 'One personalized study planner will be provided after the initial 30-minute strategy call.',
        },
        {
          t: 'p',
          text:
            "Additional/revised planners may be provided subsequently based on the student's progress, completion of the existing planner, preparation stage and individual requirements.",
        },
        {
          t: 'p',
          text:
            "Planner revisions are not provided according to a fixed number of days or fixed frequency. They will be provided as reasonably required based on the student's preparation and circumstances.",
        },
      ],
    },
    {
      heading: 'F. WhatsApp Support',
      blocks: [
        { t: 'p', text: 'WhatsApp support is intended for:' },
        {
          t: 'ul',
          items: [
            'Academic/study-related communication',
            'Study planning',
            'Progress updates',
            'Accountability',
            'Examination strategy',
            'Mentorship-related queries',
          ],
        },
        { t: 'p', text: 'WhatsApp support does not constitute 24/7 availability.' },
        {
          t: 'p',
          text:
            'Response time may vary depending on workload, holidays, personal commitments and other circumstances. The normal/ideal response time will generally be within 24 hours, but a response within a fixed or guaranteed time period is not promised.',
        },
        {
          t: 'p',
          text: 'Students are expected to communicate clearly and provide sufficient context when seeking guidance.',
        },
      ],
    },
    {
      heading: 'G. Calls',
      blocks: [
        { t: 'p', text: 'The initial 30-minute strategy call is part of the mentorship service.' },
        {
          t: 'p',
          text:
            "Any additional calls/support will be provided as reasonably required and subject to the mentor's availability and the nature of the mentorship.",
        },
        { t: 'p', text: 'Calls may need to be scheduled in advance.' },
      ],
    },
    {
      heading: 'H. No Examination Result Guarantee',
      blocks: [
        { t: 'p', text: 'Enrollment in the mentorship does not guarantee:' },
        {
          t: 'ul',
          items: [
            'Passing the CA examination',
            'Any particular marks or score',
            'Exemption in any subject',
            'Rank',
            'Distinction',
            'Improvement by a particular number of marks',
            'Any other specific examination result',
          ],
        },
        {
          t: 'p',
          text:
            "The outcome of the examination depends on various factors, including the student's preparation, consistency, implementation of guidance, examination performance and other factors outside the mentor's control.",
        },
      ],
    },
    {
      heading: 'I. Non-Participation / Failure to Avail Services',
      blocks: [
        {
          t: 'p',
          text: 'Students are expected to actively participate in the mentorship during its validity period.',
        },
        { t: 'p', text: 'If, after enrollment, a student:' },
        {
          t: 'ul',
          items: [
            "Does not respond to the mentor's messages,",
            'Does not communicate their progress,',
            'Does not follow or attempt the study plan,',
            'Is unable to study,',
            'Is unable to attend/appear for the examination,',
            'Does not avail the mentorship services,',
            'Stops communicating with the mentor, or',
            'Is unable to benefit from the mentorship for any personal reason,',
          ],
        },
        {
          t: 'p',
          text: 'the mentorship validity will not be extended to the next examination attempt.',
        },
        {
          t: 'p',
          text:
            "This applies irrespective of the reason, including personal circumstances, health-related circumstances, family circumstances, changes in schedule, inability to study, inability to appear for the examination or any other reason from the student's side.",
        },
        {
          t: 'p',
          text: 'Failure to utilize the mentorship during its validity period does not create an entitlement to:',
        },
        {
          t: 'ul',
          items: [
            'Extension of the mentorship to another attempt',
            'Free mentorship for the next attempt',
            'Discount on future enrollment',
            'Refund of the existing mentorship fee',
          ],
        },
      ],
    },
    {
      heading: 'J. Pause / Transfer / Rollover',
      blocks: [
        {
          t: 'p',
          text:
            'Once the mentorship has commenced or the initial 30-minute strategy call has been initiated/completed, the mentorship cannot be paused, transferred to another student or carried forward/rolled over to a subsequent examination attempt.',
        },
        {
          t: 'p',
          text:
            'A student who wishes to avail mentorship for a subsequent attempt will need to enroll afresh, subject to the applicable terms and pricing for that attempt.',
        },
      ],
    },
    {
      heading: 'K. Refund & Cancellation',
      blocks: [
        {
          t: 'p',
          text:
            'The detailed refund and cancellation terms are provided in the separate Refund & Cancellation Policy. In general, once the initial 30-minute strategy call has been conducted, the mentorship fee becomes non-refundable.',
        },
        {
          t: 'p',
          text:
            'If the student requests cancellation before the initial 30-minute strategy call has taken place and before any personalized planner has been provided, the request may be discussed and considered on a case-by-case basis, subject to the applicable Refund & Cancellation Policy.',
        },
      ],
    },
    {
      heading: 'L. Intellectual Property',
      blocks: [
        {
          t: 'p',
          text:
            "All original materials provided as part of the mentorship, including personalized planners, templates, strategies, documents, notes, frameworks and other resources created/provided by the mentor, are intended for the enrolled student's personal educational use.",
        },
        {
          t: 'p',
          text:
            'Students may not reproduce, redistribute, resell, publish, upload, commercially exploit or share such materials with third parties without prior permission.',
        },
      ],
    },
    {
      heading: 'M. Privacy',
      blocks: [
        {
          t: 'p',
          text:
            'Student information may be collected and used for purposes including enrollment, communication, preparation of personalized planners, delivery of mentorship services, progress tracking and related administrative purposes.',
        },
        {
          t: 'p',
          text:
            'Detailed information regarding collection, use, storage and handling of personal information is provided in the separate Privacy Policy.',
        },
      ],
    },
    {
      heading: 'N. Changes to Services',
      blocks: [
        {
          t: 'p',
          text:
            'The mentor may reasonably modify the structure, process or method of delivering the mentorship services where required, while continuing to provide the core nature of the enrolled service.',
        },
      ],
    },
    {
      heading: 'O. Misuse of Mentorship',
      blocks: [
        {
          t: 'p',
          text:
            'The mentorship is intended for genuine educational purposes. Any misuse, unauthorized sharing of mentorship material, abusive communication, impersonation, resale of access or other inappropriate use may result in restriction or termination of access to the mentorship, subject to applicable law.',
        },
      ],
    },
    {
      heading: 'P. Governing Law',
      blocks: [
        {
          t: 'p',
          text:
            'These Terms are governed by the laws of India. Nothing in these Terms limits any right that a student may have under applicable consumer protection or other laws in India.',
        },
      ],
    },
  ],
};

/* ------------------------------------------------------------------ */
/* REFUND & CANCELLATION POLICY                                        */
/* ------------------------------------------------------------------ */
const refund: LegalDoc = {
  title: 'Refund & Cancellation Policy',
  subtitle: 'CA Mentorship Program and Strategy Call',
  lastUpdated: LAST_UPDATED,
  highlights: {
    title: 'Key points at a glance',
    points: [
      'Once the initial 30-minute strategy call has been conducted, the mentorship fee is non-refundable.',
      'If the strategy call has not taken place and no personalized planner has been provided, a refund request may be considered case by case.',
      'After the strategy call, the mentorship cannot be paused, transferred or carried forward to another attempt.',
    ],
  },
  sections: [
    {
      heading: '1. Scope',
      blocks: [
        {
          t: 'p',
          text:
            'This Refund & Cancellation Policy applies to enrollment in the CA Mentorship Program, including the initial 30-minute strategy call. It should be read together with our Terms & Conditions. Please read it carefully before making a payment.',
        },
      ],
    },
    {
      heading: '2. Cancellation Before the Strategy Call',
      blocks: [
        {
          t: 'p',
          text:
            'If the initial 30-minute strategy call has not taken place and no personalized planner has been provided, a student may request cancellation and a refund. Such a request may be discussed and considered on a case-by-case basis.',
        },
        {
          t: 'p',
          text: `To make a request, please write to ${SUPPORT_EMAIL} from your registered email address, mentioning your name, registered mobile number and payment/transaction ID.`,
        },
      ],
    },
    {
      heading: '3. No Refund After the Strategy Call',
      blocks: [
        {
          t: 'p',
          text:
            'Once the initial 30-minute strategy call has been conducted, the mentorship fee is non-refundable.',
        },
        {
          t: 'p',
          text:
            'If a student requests cancellation after the 30-minute strategy call has been conducted, no refund will be provided, irrespective of whether:',
        },
        {
          t: 'ul',
          items: [
            'The student received all planners or not;',
            'The student no longer wishes to continue;',
            'The student is unable to study;',
            'The student does not use the mentorship services;',
            'The student does not appear for the examination; or',
            'Any personal, family, health, academic or other circumstances prevent the student from availing the mentorship.',
          ],
        },
      ],
    },
    {
      heading: '4. No Pause, Transfer or Carry Forward',
      blocks: [
        {
          t: 'p',
          text:
            'Once the mentorship has commenced through the initial strategy call, the student cannot pause, transfer or carry forward the mentorship to another examination attempt.',
        },
      ],
    },
    {
      heading: '5. Non-Utilization of the Mentorship',
      blocks: [
        {
          t: 'p',
          text:
            'Failure to utilize the mentorship during its validity period does not create an entitlement to a refund, extension, free mentorship or discount for a future attempt.',
        },
      ],
    },
    {
      heading: '6. Failed or Duplicate Payments',
      blocks: [
        {
          t: 'p',
          text:
            'If money has been debited from your account but your enrollment has not been confirmed, or if you have been charged more than once for the same enrollment, please contact us with your payment/transaction ID. After verification, the excess or unconfirmed amount will be refunded to the original payment method.',
        },
        {
          t: 'p',
          text: 'This section is separate from, and is not affected by, the rules on mentorship fees above.',
        },
      ],
    },
    {
      heading: '7. How Refunds Are Processed',
      blocks: [
        {
          t: 'p',
          text:
            'Any refund that is approved will be processed in accordance with this Policy and applicable law, to the original payment method used for the transaction (through our payment partner, Razorpay).',
        },
        {
          t: 'p',
          text:
            'Once a refund is approved, it is generally credited within 5–7 working days. The exact time may vary depending on your bank or payment provider.',
        },
      ],
    },
    {
      heading: '8. Your Statutory Rights',
      blocks: [
        {
          t: 'p',
          text:
            'Nothing in this Policy affects any right you may have under applicable Indian law, including consumer protection laws, that cannot be excluded by agreement.',
        },
      ],
    },
    {
      heading: '9. Contact Us',
      blocks: [
        {
          t: 'p',
          text: 'For any refund, cancellation or payment-related query, or to raise a grievance:',
        },
        {
          t: 'contact',
          rows: [
            { label: 'Name', value: 'Sneha Gupta' },
            { label: 'Email', value: SUPPORT_EMAIL, href: `mailto:${SUPPORT_EMAIL}` },
            { label: 'Telegram', value: TELEGRAM_URL, href: TELEGRAM_URL },
          ],
        },
      ],
    },
  ],
};

/* ------------------------------------------------------------------ */
/* PRIVACY POLICY                                                      */
/* ------------------------------------------------------------------ */
const privacy: LegalDoc = {
  title: 'Privacy Policy',
  subtitle: 'How we collect, use and protect your information',
  lastUpdated: LAST_UPDATED,
  sections: [
    {
      heading: 'Introduction',
      blocks: [
        {
          t: 'p',
          text:
            'This Privacy Policy explains how Sneha Gupta collects, uses, stores and protects information provided by students and visitors using our website and CA Mentorship Program (“Mentorship”).',
        },
        {
          t: 'p',
          text:
            'By using our website or enrolling in the Mentorship, you acknowledge that you have read and understood this Privacy Policy.',
        },
      ],
    },
    {
      heading: '1. Information We Collect',
      blocks: [
        {
          t: 'p',
          text: 'We may collect information that is necessary to provide and administer the Mentorship, including:',
        },
        { t: 'sub', text: 'Personal Information' },
        {
          t: 'ul',
          items: [
            'Name',
            'Mobile/WhatsApp number',
            'Email address',
            'Other contact information voluntarily provided by you',
          ],
        },
        { t: 'sub', text: 'Academic Information' },
        {
          t: 'p',
          text:
            'To provide personalized academic guidance, we may collect information such as:',
        },
        {
          t: 'ul',
          items: [
            'CA course/level',
            'Examination attempt',
            'Group(s) enrolled for',
            'Subjects being prepared',
            'Preparation status',
            'Study schedule and available study hours',
            'Academic goals',
            'Previous examination performance, where voluntarily provided',
            'Other information relevant to preparing a personalized study plan',
          ],
        },
        { t: 'sub', text: 'Communication Information' },
        {
          t: 'p',
          text:
            'When you communicate with us regarding the Mentorship, we may retain relevant information from those communications for the purpose of providing mentorship, maintaining records and understanding your progress.',
        },
        { t: 'sub', text: 'Payment and Transaction Information' },
        {
          t: 'p',
          text:
            'Payments may be processed through third-party payment service providers. We may receive limited transaction-related information, such as payment status, transaction reference or other information necessary to confirm your enrollment.',
        },
        {
          t: 'p',
          text:
            'We do not intend to collect or store your complete debit/credit card, UPI PIN, banking password or other sensitive payment credentials on our own systems.',
        },
      ],
    },
    {
      heading: '2. How We Use Your Information',
      blocks: [
        { t: 'p', text: 'We may use the information collected for purposes including:' },
        {
          t: 'ul',
          items: [
            'Processing and confirming Mentorship enrollment',
            'Providing the Mentorship services',
            'Preparing personalized study planners',
            'Understanding your academic requirements and preparation status',
            'Providing study guidance, strategy and accountability support',
            'Communicating with you regarding the Mentorship',
            'Responding to queries and requests',
            'Maintaining appropriate records of enrollment and communication',
            'Processing payments and managing transactions',
            'Improving the Mentorship and website',
            'Preventing misuse, fraud or unauthorized use of our services',
            'Complying with applicable legal and regulatory requirements',
          ],
        },
        {
          t: 'p',
          text:
            'We will use your information primarily for the purposes for which it was collected or for other purposes reasonably related to providing and administering our services.',
        },
      ],
    },
    {
      heading: '3. WhatsApp and Other Communication',
      blocks: [
        {
          t: 'p',
          text:
            'The Mentorship may involve communication through WhatsApp, email, phone calls or other communication channels.',
        },
        {
          t: 'p',
          text:
            'Information shared through these channels may contain academic or personal information voluntarily provided by you. Such communication may be retained where reasonably necessary for providing the Mentorship, maintaining records or resolving service-related issues.',
        },
        {
          t: 'p',
          text:
            'Students should avoid sharing unnecessary sensitive personal information through communication channels.',
        },
      ],
    },
    {
      heading: '4. Personalized Study Plans',
      blocks: [
        {
          t: 'p',
          text:
            'Information provided by you regarding your academic preparation, available study time, goals and circumstances may be used to prepare personalized study planners and provide individualized academic guidance.',
        },
        {
          t: 'p',
          text:
            'The information is used for the purpose of delivering the Mentorship and is not intended to be publicly disclosed.',
        },
      ],
    },
    {
      heading: '5. Sharing of Information',
      blocks: [
        { t: 'p', text: 'We do not sell or rent your personal information to third parties.' },
        {
          t: 'p',
          text:
            'Your information may be shared or made available to third-party service providers where reasonably necessary to operate the website or provide the Mentorship, such as:',
        },
        {
          t: 'ul',
          items: [
            'Payment processing providers',
            'Website/hosting providers',
            'Communication or messaging service providers',
            'Technical/service providers',
            'Other vendors who assist in operating the Mentorship',
          ],
        },
        {
          t: 'p',
          text: 'Such third parties may process information according to their own applicable privacy policies and terms.',
        },
        {
          t: 'p',
          text:
            'We may also disclose information where required or permitted by applicable law, legal process, court order or governmental authority.',
        },
      ],
    },
    {
      heading: '6. Data Security',
      blocks: [
        {
          t: 'p',
          text:
            'We take reasonable measures to protect the personal information provided to us from unauthorized access, misuse, alteration, disclosure or destruction.',
        },
        {
          t: 'p',
          text:
            'However, no method of electronic transmission, storage or communication over the internet can be guaranteed to be completely secure. Therefore, while we take reasonable precautions, we cannot guarantee absolute security of information.',
        },
      ],
    },
    {
      heading: '7. Data Retention',
      blocks: [
        {
          t: 'p',
          text: 'We may retain personal and academic information for as long as reasonably necessary to:',
        },
        {
          t: 'ul',
          items: [
            'Provide and administer the Mentorship',
            'Maintain appropriate business and transaction records',
            'Resolve disputes or service-related issues',
            'Comply with applicable legal, accounting or regulatory requirements',
            'Protect our legitimate business interests',
          ],
        },
        {
          t: 'p',
          text:
            'When information is no longer reasonably required for these purposes, it may be deleted, anonymized or securely disposed of, subject to applicable legal requirements.',
        },
      ],
    },
    {
      heading: '8. Cookies and Website Technologies',
      blocks: [
        {
          t: 'p',
          text:
            'Our website may use cookies or similar technologies to improve website functionality, understand website usage and provide a better user experience.',
        },
        {
          t: 'p',
          text:
            "If third-party analytics, advertising or similar technologies are used on the website, information may be collected in accordance with the applicable third party's privacy policy.",
        },
        {
          t: 'p',
          text:
            'You may be able to manage certain cookie preferences through your browser settings or available website controls.',
        },
      ],
    },
    {
      heading: '9. Third-Party Websites and Services',
      blocks: [
        { t: 'p', text: 'Our website may contain links to third-party websites, platforms or services.' },
        {
          t: 'p',
          text:
            'We are not responsible for the privacy practices, security or content of third-party websites or services. Students and visitors are encouraged to review the privacy policies of those third parties before providing them with personal information.',
        },
      ],
    },
    {
      heading: "10. Children's Privacy",
      blocks: [
        { t: 'p', text: 'The Mentorship is intended for students who are legally permitted to use the service.' },
        {
          t: 'p',
          text:
            'We do not knowingly collect personal information from children in violation of applicable law. If you believe that a child has provided personal information to us without appropriate authorization, please contact us so that we can take appropriate steps.',
        },
      ],
    },
    {
      heading: '11. Your Rights and Choices',
      blocks: [
        {
          t: 'p',
          text:
            'Subject to applicable law, you may have rights regarding your personal information, including the ability to:',
        },
        {
          t: 'ul',
          items: [
            'Request information about personal data held by us',
            'Request correction of inaccurate information',
            'Request deletion of information where applicable',
            'Withdraw consent where processing is based on consent',
            'Raise concerns regarding the handling of your personal information',
          ],
        },
        {
          t: 'p',
          text:
            'Certain information may need to be retained where required by law or reasonably necessary for legitimate business purposes.',
        },
        {
          t: 'p',
          text:
            'To exercise an applicable right or raise a privacy-related concern, please contact us using the details provided below.',
        },
      ],
    },
    {
      heading: '12. Changes to This Privacy Policy',
      blocks: [
        {
          t: 'p',
          text:
            'We may update this Privacy Policy from time to time to reflect changes in our services, website, technology, legal requirements or privacy practices.',
        },
        {
          t: 'p',
          text: 'Any updated version will be published on this page with a revised “Last Updated” date.',
        },
        { t: 'p', text: 'We encourage users to periodically review this page for any changes.' },
      ],
    },
    {
      heading: '13. Contact Us',
      blocks: [
        {
          t: 'p',
          text:
            'If you have any questions, concerns or requests regarding this Privacy Policy or the handling of your personal information, you may contact us at:',
        },
        {
          t: 'contact',
          rows: [
            { label: 'Name', value: 'Sneha Gupta' },
            { label: 'Email', value: SUPPORT_EMAIL, href: `mailto:${SUPPORT_EMAIL}` },
            { label: 'Telegram group', value: TELEGRAM_URL, href: TELEGRAM_URL },
          ],
        },
      ],
    },
    {
      heading: '14. Consent',
      blocks: [
        {
          t: 'p',
          text:
            'By using our website or voluntarily providing personal information for enrollment or participation in the Mentorship, you acknowledge that you have read this Privacy Policy and understand how your information may be collected and used as described above, subject to applicable law.',
        },
      ],
    },
  ],
};

export const LEGAL_DOCS: Record<LegalPageId, LegalDoc> = { terms, refund, privacy };
