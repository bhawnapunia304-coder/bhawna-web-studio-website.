import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  CheckCircle2,
  Calendar,
  MessageSquare,
  AlertCircle,
  Loader2,
  Zap,
  Mail,
} from 'lucide-react';

export interface PricingPackage {
  id: 'starter' | 'standard' | 'premium';
  name: string;
  usdPrice: number;
  gbpPrice: number;
  delivery: string;
  inclusions: string;
  features: string[];
}

export const PRICING_PACKAGES: Record<'starter' | 'standard' | 'premium', PricingPackage> = {
  starter: {
    id: 'starter',
    name: 'Starter',
    usdPrice: 299,
    gbpPrice: 249,
    delivery: 'Live in 3 days',
    inclusions: '1-page website, mobile-friendly design, contact form, Google Maps embed, basic SEO setup',
    features: [
      '1-page website',
      'Mobile-friendly design',
      'Contact form',
      'Google Maps embed',
      'Basic SEO setup',
      'Live in 3 days',
    ],
  },
  standard: {
    id: 'standard',
    name: 'Standard',
    usdPrice: 599,
    gbpPrice: 499,
    delivery: 'Live in 5 days',
    inclusions: '4–5 pages, booking or enquiry form, Google Business link, Core Web Vitals tuning, social share preview cards',
    features: [
      '4–5 pages',
      'Booking or enquiry form',
      'Google Business link',
      'Core Web Vitals tuning',
      'Social share preview cards',
      'Live in 5 days',
    ],
  },
  premium: {
    id: 'premium',
    name: 'Premium',
    usdPrice: 1199,
    gbpPrice: 999,
    delivery: 'Live in 7 days',
    inclusions: '6–8 pages, AI chatbot or booking/ordering system, SEO setup, 1 month support',
    features: [
      '6–8 pages',
      'AI chatbot or booking/ordering system',
      'SEO setup',
      '1 month support',
      'Live in 7 days',
    ],
  },
};

const FORMSPREE_PRICING_ENDPOINT = 'https://formspree.io/f/xaengywe';

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPackageId: 'starter' | 'standard' | 'premium';
}

export const PricingModal: React.FC<PricingModalProps> = ({
  isOpen,
  onClose,
  initialPackageId,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [packageId, setPackageId] = useState<'starter' | 'standard' | 'premium'>(initialPackageId);
  const [currency, setCurrency] = useState<'USD' | 'GBP'>('USD');
  const [includeCarePlan, setIncludeCarePlan] = useState(false);

  // Form inputs
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [website, setWebsite] = useState('');
  const [message, setMessage] = useState('');
  const [contactMethod, setContactMethod] = useState<'Email' | 'WhatsApp'>('Email');

  // UI state
  const [errors, setErrors] = useState<{
    fullName?: string;
    email?: string;
    businessName?: string;
    message?: string;
  }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedData, setSubmittedData] = useState<{ name: string; packageName: string } | null>(
    null
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Sync initial package when opened
  useEffect(() => {
    if (isOpen) {
      setPackageId(initialPackageId);
      setIsSuccess(false);
      setErrorMessage(null);
      setErrors({});
    }
  }, [isOpen, initialPackageId]);

  // Esc key and focus lock
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    // Focus on first input
    if (modalRef.current) {
      const focusable = modalRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length > 0) {
        focusable[0].focus();
      }
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentPkg = PRICING_PACKAGES[packageId];
  const symbol = currency === 'USD' ? '$' : '£';
  const basePrice = currency === 'USD' ? currentPkg.usdPrice : currentPkg.gbpPrice;
  const carePlanRate = currency === 'USD' ? 39 : 31;
  const formattedPrice = `${symbol}${basePrice.toLocaleString()}${includeCarePlan ? ` + ${symbol}${carePlanRate}/mo care plan` : ''}`;

  const validate = () => {
    const newErrors: {
      fullName?: string;
      email?: string;
      businessName?: string;
      message?: string;
    } = {};

    if (!fullName.trim()) {
      newErrors.fullName = 'Full name is required.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!emailRegex.test(email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!businessName.trim()) {
      newErrors.businessName = 'Business name is required.';
    }

    if (!message.trim()) {
      newErrors.message = 'Please describe what you need for this project.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      console.log('Submitting to Formspree endpoint:', 'https://formspree.io/f/xaengywe');
      console.log('[PricingModal] Selected package:', currentPkg.name, 'Price:', formattedPrice);

      // Construct clean FormData with explicit required fields
      const formData = new FormData();
      formData.append('name', fullName.trim());
      formData.append('email', email.trim());
      formData.append('business_name', businessName.trim());
      formData.append('website', website.trim() || 'None provided');
      formData.append('message', message.trim());
      formData.append('package', currentPkg.name);
      formData.append('price', formattedPrice);
      formData.append('currency', currency);
      formData.append('care_plan', includeCarePlan ? `Yes (${symbol}${carePlanRate}/mo)` : 'No');
      formData.append('contact_method', contactMethod);
      formData.append('_subject', `New package enquiry: ${currentPkg.name}`);
      formData.append('_gotcha', '');

      const res = await fetch('https://formspree.io/f/xaengywe', {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      });

      console.log('Formspree response status:', res.status, res.statusText, 'ok:', res.ok);

      if (res.ok) {
        setSubmittedData({
          name: fullName.trim(),
          packageName: currentPkg.name,
        });
        setIsSuccess(true);
      } else {
        setIsSuccess(false);
        const data = await res.json().catch(() => null);
        console.error('Formspree error response:', res.status, data);
        const errorMsg =
          'Error ' +
          res.status +
          ': ' +
          (data?.errors
            ? data.errors.map((e: { message?: string }) => e.message).join(', ')
            : data?.error || 'unknown');
        setErrorMessage(errorMsg);
      }
    } catch (error: any) {
      setIsSuccess(false);
      console.error('Network error on submit:', error);
      setErrorMessage('Network error: ' + (error?.message || String(error)));
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Hi Bhawna, I just enquired about the ${currentPkg.name} package`
  );

  const mailtoBody = encodeURIComponent(
    `Hi Bhawna,\n\nI would like to enquire about the ${currentPkg.name} package.\n\n` +
      `Name: ${fullName || 'Not provided'}\n` +
      `Email: ${email || 'Not provided'}\n` +
      `Business: ${businessName || 'Not provided'}\n` +
      `Website / Instagram: ${website || 'None'}\n` +
      `Package: ${currentPkg.name} (${formattedPrice})\n` +
      `Currency: ${currency}\n` +
      `Care Plan: ${includeCarePlan ? 'Yes' : 'No'}\n` +
      `Preferred Contact: ${contactMethod}\n\n` +
      `Project Details:\n${message || 'Not provided'}\n`
  );

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="pricing-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/60 backdrop-blur-xs animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-2xl max-h-[92vh] bg-white rounded-[20px] border border-[#e2e8f0] shadow-2xl flex flex-col overflow-hidden text-[#131b2e]"
      >
        {/* Header */}
        <div className="px-6 py-4 bg-[#f2f3ff] border-b border-[#e2e8f0] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#4338ca] text-white flex items-center justify-center">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <h2
                id="pricing-modal-title"
                className="font-heading font-bold text-base text-[#131b2e] leading-snug"
              >
                Package Enquiry
              </h2>
              <p className="text-[11px] text-[#64748b]">
                Reserve your project timeline with fixed transparent pricing
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white border border-[#e2e8f0] text-[#64748b] hover:text-[#131b2e] hover:bg-[#faf8ff] transition-colors cursor-pointer"
            title="Close modal (Esc)"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-7 space-y-6">
          {isSuccess && submittedData ? (
            /* Thank-You Screen */
            <div className="space-y-6 py-4 animate-fadeIn" aria-live="polite">
              <div className="w-14 h-14 rounded-full bg-[#4338ca]/10 text-[#4338ca] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="text-center space-y-2 max-w-lg mx-auto">
                <h3 className="font-heading text-2xl font-bold text-[#131b2e]">
                  Thanks {submittedData.name}, I&apos;ve received your enquiry for the{' '}
                  {submittedData.packageName} package.
                </h3>
                <p className="text-xs sm:text-sm text-[#464554] leading-relaxed">
                  Your project slot has been noted. Here are the immediate next steps:
                </p>
              </div>

              {/* 3 Next Steps */}
              <div className="p-5 rounded-[16px] bg-[#f2f3ff] border border-[#e2e8f0] space-y-3.5 max-w-lg mx-auto">
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#4338ca] text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    1
                  </span>
                  <div>
                    <span className="text-xs font-semibold text-[#131b2e] block">
                      I&apos;ll reply within 24 hours
                    </span>
                    <span className="text-[11px] text-[#464554]">
                      Personal review of your business goals and confirmation of project scope.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#4338ca] text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    2
                  </span>
                  <div>
                    <span className="text-xs font-semibold text-[#131b2e] block">
                      You&apos;ll get a free homepage mockup
                    </span>
                    <span className="text-[11px] text-[#464554]">
                      An initial concept to visualize design direction, typography, and layout.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#4338ca] text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    3
                  </span>
                  <div>
                    <span className="text-xs font-semibold text-[#131b2e] block">
                      If you like it, we start with a 50% deposit
                    </span>
                    <span className="text-[11px] text-[#464554]">
                      Balance is paid only after your site is complete, verified, and ready to launch.
                    </span>
                  </div>
                </div>
              </div>

              {/* Two CTA Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href="https://calendly.com/bhawnawebstudio/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto h-[44px] px-6 rounded-[10px] bg-[#4338ca] hover:bg-[#4f46e5] text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-[0_10px_20px_-8px_rgba(67,56,202,0.3)]"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book a Free 30-min Call</span>
                </a>

                <a
                  href={`https://wa.me/919205272400?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto h-[44px] px-6 rounded-[10px] bg-white border border-[#e2e8f0] hover:bg-[#faf8ff] text-[#131b2e] text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-xs"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-600" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="text-xs text-[#64748b] hover:text-[#131b2e] hover:underline cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            /* Enquiry Form */
            <form
              onSubmit={handleSubmit}
              action={FORMSPREE_PRICING_ENDPOINT}
              method="POST"
              noValidate
              className="space-y-5"
            >
              {/* Honeypot Spam Protection */}
              <input
                type="text"
                name="_gotcha"
                value=""
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', opacity: 0 }}
                readOnly
              />
              <input
                type="hidden"
                name="_subject"
                value={`New package enquiry: ${currentPkg.name}`}
              />
              <input type="hidden" name="package" value={currentPkg.name} />
              <input type="hidden" name="price" value={formattedPrice} />
              <input
                type="hidden"
                name="care_plan"
                value={includeCarePlan ? `Yes (${symbol}${carePlanRate}/mo)` : 'No'}
              />

              {/* Package Selection & Currency Bar */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label
                    htmlFor="select-package"
                    className="block text-xs font-semibold text-[#131b2e] mb-1.5"
                  >
                    Select Package
                  </label>
                  <select
                    id="select-package"
                    value={packageId}
                    onChange={(e) =>
                      setPackageId(e.target.value as 'starter' | 'standard' | 'premium')
                    }
                    className="w-full h-[42px] px-3.5 rounded-[8px] bg-white border border-[#e2e8f0] text-sm text-[#131b2e] font-medium transition-all focus:outline-none focus:border-[#4338ca] focus:ring-2 focus:ring-[#4338ca]/20 cursor-pointer"
                  >
                    <option value="starter">Starter ({symbol === '$' ? '$299' : '£249'}) — 1 Page</option>
                    <option value="standard">Standard ({symbol === '$' ? '$599' : '£499'}) — 4–5 Pages (Most Popular)</option>
                    <option value="premium">Premium ({symbol === '$' ? '$1,199' : '£999'}) — 6–8 Pages</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="select-currency"
                    className="block text-xs font-semibold text-[#131b2e] mb-1.5"
                  >
                    Currency
                  </label>
                  <select
                    id="select-currency"
                    name="currency"
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value as 'USD' | 'GBP')}
                    className="w-full h-[42px] px-3.5 rounded-[8px] bg-white border border-[#e2e8f0] text-sm text-[#131b2e] font-medium transition-all focus:outline-none focus:border-[#4338ca] focus:ring-2 focus:ring-[#4338ca]/20 cursor-pointer"
                  >
                    <option value="USD">USD ($)</option>
                    <option value="GBP">GBP (£)</option>
                  </select>
                </div>
              </div>

              {/* Top Summary Card of Selected Package */}
              <div className="p-4 rounded-[14px] bg-[#faf8ff] border border-[#e2e8f0] space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-heading font-bold text-base text-[#131b2e]">
                      {currentPkg.name} Package
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-[#eaedff] text-[#4338ca] text-[10px] font-semibold tracking-wider uppercase font-mono">
                      {currentPkg.delivery}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="font-heading font-bold text-xl text-[#131b2e]">
                      {symbol}
                      {basePrice.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-[#64748b] block -mt-0.5">fixed quote</span>
                  </div>
                </div>

                <div className="text-xs text-[#464554] leading-relaxed pt-2 border-t border-[#e2e8f0]/80">
                  <strong className="text-[#131b2e] font-semibold">Key inclusions: </strong>
                  {currentPkg.inclusions}
                </div>
              </div>

              {/* Diagnosable Error Banner & Direct Fallback Actions */}
              {errorMessage && (
                <div
                  className="p-4 rounded-[12px] bg-rose-50 border border-rose-200 text-rose-900 text-xs space-y-3 animate-fadeIn"
                  aria-live="polite"
                >
                  <div className="flex items-start gap-2.5">
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <span className="font-semibold block mb-0.5">Submission could not be completed:</span>
                      <p className="font-mono text-[11px] text-rose-700 break-words">{errorMessage}</p>
                    </div>
                  </div>

                  {/* Fallback buttons to preserve the lead */}
                  <div className="pt-2 border-t border-rose-200/80 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                    <a
                      href={`mailto:bhawnawebstudio@gmail.com?subject=Package%20Enquiry:%20${encodeURIComponent(currentPkg.name)}&body=${mailtoBody}`}
                      className="inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-[8px] bg-rose-700 hover:bg-rose-800 text-white font-medium text-xs transition-colors shadow-xs"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Email me directly</span>
                    </a>
                    <a
                      href={`https://wa.me/919205272400?text=${whatsappMessage}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-[8px] bg-white border border-rose-300 hover:bg-rose-100 text-rose-900 font-medium text-xs transition-colors shadow-xs"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Chat on WhatsApp</span>
                    </a>
                  </div>
                </div>
              )}

              {/* Form Input Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="pricing-name"
                    className="block text-xs font-medium text-[#131b2e] mb-1"
                  >
                    Full name *
                  </label>
                  <input
                    id="pricing-name"
                    name="name"
                    type="text"
                    required
                    placeholder="e.g. Michael Harris"
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                      if (errors.fullName)
                        setErrors((prev) => ({ ...prev, fullName: undefined }));
                    }}
                    className={`w-full h-[42px] px-3 rounded-[8px] bg-white border text-sm text-[#131b2e] placeholder-[#94a3b8] transition-all focus:outline-none focus:ring-2 ${
                      errors.fullName
                        ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-200'
                        : 'border-[#e2e8f0] focus:border-[#4338ca] focus:ring-[#4338ca]/20'
                    }`}
                  />
                  {errors.fullName && (
                    <p className="text-rose-600 text-xs mt-1">{errors.fullName}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="pricing-email"
                    className="block text-xs font-medium text-[#131b2e] mb-1"
                  >
                    Email address *
                  </label>
                  <input
                    id="pricing-email"
                    name="email"
                    type="email"
                    required
                    placeholder="michael@company.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                    }}
                    className={`w-full h-[42px] px-3 rounded-[8px] bg-white border text-sm text-[#131b2e] placeholder-[#94a3b8] transition-all focus:outline-none focus:ring-2 ${
                      errors.email
                        ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-200'
                        : 'border-[#e2e8f0] focus:border-[#4338ca] focus:ring-[#4338ca]/20'
                    }`}
                  />
                  {errors.email && (
                    <p className="text-rose-600 text-xs mt-1">{errors.email}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="pricing-business"
                    className="block text-xs font-medium text-[#131b2e] mb-1"
                  >
                    Business name *
                  </label>
                  <input
                    id="pricing-business"
                    name="business_name"
                    type="text"
                    required
                    placeholder="e.g. Haven Pilates"
                    value={businessName}
                    onChange={(e) => {
                      setBusinessName(e.target.value);
                      if (errors.businessName)
                        setErrors((prev) => ({ ...prev, businessName: undefined }));
                    }}
                    className={`w-full h-[42px] px-3 rounded-[8px] bg-white border text-sm text-[#131b2e] placeholder-[#94a3b8] transition-all focus:outline-none focus:ring-2 ${
                      errors.businessName
                        ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-200'
                        : 'border-[#e2e8f0] focus:border-[#4338ca] focus:ring-[#4338ca]/20'
                    }`}
                  />
                  {errors.businessName && (
                    <p className="text-rose-600 text-xs mt-1">{errors.businessName}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="pricing-website"
                    className="block text-xs font-medium text-[#131b2e] mb-1"
                  >
                    Current website or Instagram link{' '}
                    <span className="text-[#64748b] font-normal">(optional)</span>
                  </label>
                  <input
                    id="pricing-website"
                    name="website"
                    type="text"
                    placeholder="e.g. instagram.com/havenpilates"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    className="w-full h-[42px] px-3 rounded-[8px] bg-white border border-[#e2e8f0] text-sm text-[#131b2e] placeholder-[#94a3b8] transition-all focus:outline-none focus:border-[#4338ca] focus:ring-2 focus:ring-[#4338ca]/20"
                  />
                </div>
              </div>

              {/* What do you need */}
              <div>
                <label
                  htmlFor="pricing-message"
                  className="block text-xs font-medium text-[#131b2e] mb-1"
                >
                  What do you need? *
                </label>
                <textarea
                  id="pricing-message"
                  name="message"
                  required
                  rows={3}
                  placeholder="Tell me about your business goals, required sections, timeline, or any reference websites you like..."
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    if (errors.message) setErrors((prev) => ({ ...prev, message: undefined }));
                  }}
                  className={`w-full p-3 rounded-[8px] bg-white border text-sm text-[#131b2e] placeholder-[#94a3b8] transition-all focus:outline-none focus:ring-2 resize-y ${
                    errors.message
                      ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-200'
                      : 'border-[#e2e8f0] focus:border-[#4338ca] focus:ring-[#4338ca]/20'
                  }`}
                />
                {errors.message && (
                  <p className="text-rose-600 text-xs mt-1">{errors.message}</p>
                )}
              </div>

              {/* Preferred Contact & Care Plan Checkbox */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                <div>
                  <span className="block text-xs font-medium text-[#131b2e] mb-1.5">
                    Preferred contact method
                  </span>
                  <div className="flex items-center gap-4 text-xs font-medium text-[#131b2e]">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="contact_method"
                        value="Email"
                        checked={contactMethod === 'Email'}
                        onChange={() => setContactMethod('Email')}
                        className="text-[#4338ca] focus:ring-[#4338ca]"
                      />
                      <span>Email</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="contact_method"
                        value="WhatsApp"
                        checked={contactMethod === 'WhatsApp'}
                        onChange={() => setContactMethod('WhatsApp')}
                        className="text-[#4338ca] focus:ring-[#4338ca]"
                      />
                      <span>WhatsApp</span>
                    </label>
                  </div>
                </div>

                <div className="pt-1">
                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includeCarePlan}
                      onChange={(e) => setIncludeCarePlan(e.target.checked)}
                      className="mt-0.5 rounded text-[#4338ca] focus:ring-[#4338ca] cursor-pointer"
                    />
                    <span className="text-xs text-[#131b2e] font-medium leading-snug">
                      Add optional care plan, $39/month (£31/month)
                    </span>
                  </label>
                </div>
              </div>

              {/* Live Estimated Total & Deposit Note */}
              <div className="p-4 rounded-[12px] bg-[#f2f3ff] border border-[#e2e8f0] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-[#64748b] font-semibold block">
                    Estimated Total
                  </span>
                  <div className="flex items-baseline gap-1.5 mt-0.5">
                    <span className="font-heading text-2xl font-bold text-[#131b2e]">
                      {symbol}
                      {basePrice.toLocaleString()}
                    </span>
                    {includeCarePlan && (
                      <span className="text-xs font-medium text-[#4338ca]">
                        + {symbol}
                        {carePlanRate}/mo care plan
                      </span>
                    )}
                  </div>
                </div>

                <div className="text-xs text-[#464554] sm:text-right max-w-xs leading-relaxed">
                  <span className="font-medium text-[#131b2e]">
                    50% deposit to start, balance on launch.
                  </span>{' '}
                  <span className="text-[#64748b] block">No payment is taken now.</span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-[46px] rounded-[10px] bg-[#4338ca] hover:bg-[#4f46e5] disabled:bg-[#4338ca]/70 disabled:cursor-not-allowed text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-[0_10px_20px_-8px_rgba(67,56,202,0.35)] cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <span>Send Package Enquiry</span>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
