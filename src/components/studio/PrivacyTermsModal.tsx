import React from 'react';
import { X, Shield } from 'lucide-react';

interface PrivacyTermsModalProps {
  type: 'privacy' | 'terms' | null;
  onClose: () => void;
}

export const PrivacyTermsModal: React.FC<PrivacyTermsModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white rounded-[20px] border border-[#e2e8f0] shadow-2xl p-6 sm:p-8 max-h-[85vh] overflow-y-auto space-y-5">
        <div className="flex items-center justify-between pb-4 border-b border-[#e2e8f0]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#f2f3ff] text-[#4338ca] flex items-center justify-center">
              <Shield className="w-4 h-4" />
            </div>
            <h3 className="text-lg font-bold text-[#131b2e] font-heading">
              {type === 'privacy' ? 'Privacy Policy' : 'Terms of Service'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#64748b] hover:text-[#131b2e] hover:bg-[#f2f3ff] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {type === 'privacy' ? (
          <div className="space-y-4 text-xs sm:text-sm text-[#464554] leading-relaxed">
            <p>
              <strong>Effective Date:</strong> January 2026
            </p>
            <p>
              Bhawna Punia (&ldquo;Studio&rdquo;) respects your privacy. When you reach out via our contact form, email, or schedule a consultation call, we only collect the contact information necessary to reply to your inquiry (such as your name, email address, and project brief).
            </p>
            <h4 className="font-semibold text-[#131b2e] pt-2">Information Handling</h4>
            <p>
              We do not sell, rent, or trade your personal information with third parties or data brokers. Information submitted through our site is used solely to assess your project scope, schedule discovery discussions, and deliver requested development services.
            </p>
            <h4 className="font-semibold text-[#131b2e] pt-2">Data Storage &amp; Cache</h4>
            <p>
              This website uses standard client-side browser caching to improve page load speed and support offline access. No invasive tracking cookies or telemetry agents are deployed.
            </p>
            <h4 className="font-semibold text-[#131b2e] pt-2">Direct Contact</h4>
            <p>
              If you have any questions or wish to request the deletion of your inquiry details, please email us directly at{' '}
              <a href="mailto:bhawnawebstudio@gmail.com" className="text-[#4338ca] font-medium underline">
                bhawnawebstudio@gmail.com
              </a>.
            </p>
          </div>
        ) : (
          <div className="space-y-4 text-xs sm:text-sm text-[#464554] leading-relaxed">
            <p>
              <strong>Effective Date:</strong> January 2026
            </p>
            <p>
              These Terms outline the standard client engagement practices for web development services provided by Bhawna Punia.
            </p>
            <h4 className="font-semibold text-[#131b2e] pt-2">1. Scope &amp; Estimates</h4>
            <p>
              Every web development engagement starts with a defined scope, fixed investment quote, and targeted timeline. Project milestones are confirmed in writing prior to commencing work.
            </p>
            <h4 className="font-semibold text-[#131b2e] pt-2">2. Payment Milestones</h4>
            <p>
              Standard engagements require a 50% upfront deposit to secure the studio sprint schedule, with the remaining 50% balance invoiced upon final client approval of the staging site before domain DNS launch.
            </p>
            <h4 className="font-semibold text-[#131b2e] pt-2">3. 100% Code &amp; Asset Ownership</h4>
            <p>
              Upon final settlement of invoices, all bespoke source code, visual assets, and deployment configurations belong entirely to you with zero proprietary licensing lock-in.
            </p>
            <h4 className="font-semibold text-[#131b2e] pt-2">4. Post-Launch Guarantee</h4>
            <p>
              All projects include 14 days of post-launch technical adjustments and bug fixes to ensure smooth deployment.
            </p>
          </div>
        )}

        <div className="pt-3 border-t border-[#e2e8f0] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-[10px] bg-[#4338ca] hover:bg-[#4f46e5] text-white text-xs font-semibold transition-colors"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};
