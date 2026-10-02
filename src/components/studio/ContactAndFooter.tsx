import React, { useState } from 'react';
import { OfflineCache } from '../../services/offlineCache';
import { PrivacyTermsModal } from './PrivacyTermsModal';
import {
  Mail,
  MessageSquare,
  Video,
  Linkedin,
  Send,
  CheckCircle2,
  AlertCircle,
  ArrowUp,
  Loader2,
  Calendar,
} from 'lucide-react';

interface ContactAndFooterProps {
  preselectedService?: string;
}

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xaengywe';

export const ContactAndFooter: React.FC<ContactAndFooterProps> = ({ preselectedService }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [service, setService] = useState('Business Website');
  const [budget, setBudget] = useState('$300-$600');
  const [message, setMessage] = useState('');

  // Form submission & validation states
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedName, setSubmittedName] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [modalType, setModalType] = useState<'privacy' | 'terms' | null>(null);

  // Sync preselectedService if passed from project modal
  React.useEffect(() => {
    if (preselectedService) {
      setService(preselectedService);
    }
  }, [preselectedService]);

  const validate = () => {
    const newErrors: { name?: string; email?: string; message?: string } = {};

    if (!name.trim()) {
      newErrors.name = 'Full name is required.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!emailRegex.test(email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!message.trim()) {
      newErrors.message = 'Project details are required.';
    } else if (message.trim().length < 20) {
      newErrors.message = 'Please provide at least 20 characters about your project.';
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
      console.log('[ContactForm] Submitting service:', service, 'Budget:', budget);

      const formData = new FormData();
      formData.append('name', name.trim());
      formData.append('email', email.trim());
      formData.append('business_name', businessName.trim() || 'Not specified');
      formData.append('website', 'None provided');
      formData.append('message', message.trim());
      formData.append('package', service);
      formData.append('price', budget);
      formData.append('currency', 'USD');
      formData.append('care_plan', 'No');
      formData.append('contact_method', 'Email');
      formData.append('_subject', `New project enquiry from Bhawna Web Studio website (${service})`);
      formData.append('_gotcha', '');

      const res = await fetch('https://formspree.io/f/xaengywe', {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      });

      console.log('Formspree response status:', res.status, res.statusText, 'ok:', res.ok);

      if (res.ok) {
        // Also save lead to local offline cache so it displays in Studio Dashboard CRM
        try {
          OfflineCache.addLead({
            fullName: name.trim(),
            email: email.trim(),
            service,
            budget,
            details: businessName.trim()
              ? `[${businessName.trim()}] ${message.trim()}`
              : message.trim(),
          });
        } catch (cacheErr) {
          console.warn('Local cache recording skipped:', cacheErr);
        }

        setSubmittedName(name.trim());
        setIsSuccess(true);
        setName('');
        setEmail('');
        setBusinessName('');
        setMessage('');
        setErrors({});
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

  const handleResetForm = () => {
    setIsSuccess(false);
    setErrorMessage(null);
    setErrors({});
  };

  return (
    <>
      {/* 12. CONTACT */}
      <section className="w-full py-24 lg:py-28 border-b border-[#e2e8f0]" id="contact">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Direct channels */}
            <div className="lg:col-span-5 flex flex-col gap-5">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#4338ca] mb-2 block">
                  Let&apos;s Connect
                </span>
                <h2 className="font-heading text-3xl sm:text-4xl text-[#131b2e] font-bold tracking-tight mb-3">
                  Have an idea? Let&apos;s talk.
                </h2>
                <p className="text-sm text-[#464554] leading-relaxed mb-6">
                  Share a brief overview of your business, and I will prepare a complimentary homepage mockup within 24 hours.
                </p>
              </div>

              {/* 4 Contact Cards */}
              <div className="space-y-3">
                <a
                  href="mailto:bhawnawebstudio@gmail.com"
                  className="p-5 rounded-[16px] bg-white border border-[#e2e8f0] shadow-xs hover:border-[#cbd5e1] hover:-translate-y-0.5 transition-all flex items-center gap-4"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#f2f3ff] text-[#4338ca] flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#64748b] block">
                      Email Directly
                    </span>
                    <span className="font-semibold text-sm text-[#131b2e]">
                      bhawnawebstudio@gmail.com
                    </span>
                  </div>
                </a>

                <a
                  href="https://wa.me/919205272400"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-5 rounded-[16px] bg-white border border-[#e2e8f0] shadow-xs hover:border-[#cbd5e1] hover:-translate-y-0.5 transition-all flex items-center gap-4"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#64748b] block">
                      Phone &amp; WhatsApp
                    </span>
                    <span className="font-semibold text-sm text-[#131b2e]">
                      +91 9205272400
                    </span>
                  </div>
                </a>

                <a
                  href="https://calendly.com/bhawnawebstudio/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-5 rounded-[16px] bg-white border border-[#e2e8f0] shadow-xs hover:border-[#cbd5e1] hover:-translate-y-0.5 transition-all flex items-center gap-4"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#f2f3ff] text-[#4338ca] flex items-center justify-center shrink-0">
                    <Video className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#64748b] block">
                      Zoom Consultation
                    </span>
                    <span className="font-semibold text-sm text-[#131b2e]">
                      Book a Free 30-min Zoom Call
                    </span>
                  </div>
                </a>

                <a
                  href="https://www.linkedin.com/in/bhawna-punia-9559b8416/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-5 rounded-[16px] bg-white border border-[#e2e8f0] shadow-xs hover:border-[#cbd5e1] hover:-translate-y-0.5 transition-all flex items-center gap-4"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#f2f3ff] text-[#4338ca] flex items-center justify-center shrink-0">
                    <Linkedin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#64748b] block">
                      LinkedIn Profile
                    </span>
                    <span className="font-semibold text-sm text-[#131b2e]">
                      linkedin.com/in/bhawna-punia-9559b8416
                    </span>
                  </div>
                </a>
              </div>

              <div className="p-4 rounded-xl bg-[#f2f3ff] border border-[#e2e8f0] text-xs text-[#464554] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#4338ca] shrink-0" />
                <span>Replies personally within 24 hours. No automated spam.</span>
              </div>
            </div>

            {/* Right Column: Functional Formspree Form */}
            <div className="lg:col-span-7 p-8 rounded-[20px] bg-white border border-[#e2e8f0] shadow-[0_10px_30px_-10px_rgba(67,56,202,0.05)]">
              {isSuccess ? (
                /* Success Thank-You Card */
                <div
                  className="p-8 rounded-[16px] bg-[#f2f3ff] border border-[#e2e8f0] space-y-6 text-center animate-fadeIn"
                  aria-live="polite"
                >
                  <div className="w-14 h-14 rounded-full bg-[#4338ca]/10 text-[#4338ca] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8 text-[#4338ca]" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-heading text-2xl font-bold text-[#131b2e]">
                      Thank you, {submittedName}!
                    </h3>
                    <p className="text-sm text-[#464554] leading-relaxed max-w-md mx-auto">
                      I&apos;ve received your enquiry and will reply within 24 hours with a thoughtful evaluation and initial homepage concept.
                    </p>
                  </div>

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
                      href="https://wa.me/919205272400"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto h-[44px] px-6 rounded-[10px] bg-white border border-[#e2e8f0] hover:bg-[#faf8ff] text-[#131b2e] text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-xs"
                    >
                      <MessageSquare className="w-4 h-4 text-emerald-600" />
                      <span>Chat on WhatsApp</span>
                    </a>
                  </div>

                  <div className="pt-4 border-t border-[#e2e8f0]/80">
                    <button
                      type="button"
                      onClick={handleResetForm}
                      className="text-xs text-[#4338ca] font-semibold hover:underline"
                    >
                      Send another message
                    </button>
                  </div>
                </div>
              ) : (
                /* The Functional Form */
                <form
                  onSubmit={handleSubmit}
                  action={FORMSPREE_ENDPOINT}
                  method="POST"
                  noValidate
                  className="space-y-4"
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

                  {/* Formspree Email Subject line */}
                  <input
                    type="hidden"
                    name="_subject"
                    value="New project enquiry from Bhawna Web Studio website"
                  />

                  {/* Server error alert if any */}
                  {errorMessage && (
                    <div
                      className="p-4 rounded-[8px] bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2.5 animate-fadeIn"
                      aria-live="polite"
                    >
                      <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Name & Email Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="form-name"
                        className="block text-xs font-medium text-[#131b2e] mb-1.5"
                      >
                        Full name *
                      </label>
                      <input
                        id="form-name"
                        name="name"
                        type="text"
                        required
                        placeholder="e.g. Jane Doe"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                        }}
                        aria-invalid={Boolean(errors.name)}
                        aria-describedby={errors.name ? 'error-name' : undefined}
                        className={`w-full h-[44px] px-3.5 rounded-[8px] bg-white border text-sm text-[#131b2e] placeholder-[#64748b] transition-all focus:outline-none focus:ring-2 ${
                          errors.name
                            ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-200'
                            : 'border-[#e2e8f0] focus:border-[#4338ca] focus:ring-[#4338ca]/20'
                        }`}
                      />
                      {errors.name && (
                        <p id="error-name" className="text-rose-600 text-xs mt-1" aria-live="polite">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="form-email"
                        className="block text-xs font-medium text-[#131b2e] mb-1.5"
                      >
                        Email address *
                      </label>
                      <input
                        id="form-email"
                        name="email"
                        type="email"
                        required
                        placeholder="jane@company.com"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                        }}
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={errors.email ? 'error-email' : undefined}
                        className={`w-full h-[44px] px-3.5 rounded-[8px] bg-white border text-sm text-[#131b2e] placeholder-[#64748b] transition-all focus:outline-none focus:ring-2 ${
                          errors.email
                            ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-200'
                            : 'border-[#e2e8f0] focus:border-[#4338ca] focus:ring-[#4338ca]/20'
                        }`}
                      />
                      {errors.email && (
                        <p id="error-email" className="text-rose-600 text-xs mt-1" aria-live="polite">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Business Name (Optional) */}
                  <div>
                    <label
                      htmlFor="form-business"
                      className="block text-xs font-medium text-[#131b2e] mb-1.5"
                    >
                      Business name <span className="text-[#64748b] font-normal">(optional)</span>
                    </label>
                    <input
                      id="form-business"
                      name="business_name"
                      type="text"
                      placeholder="e.g. Apex Legal Studio"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      className="w-full h-[44px] px-3.5 rounded-[8px] bg-white border border-[#e2e8f0] text-sm text-[#131b2e] placeholder-[#64748b] transition-all focus:outline-none focus:border-[#4338ca] focus:ring-2 focus:ring-[#4338ca]/20"
                    />
                  </div>

                  {/* Service & Budget Dropdowns */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="form-service"
                        className="block text-xs font-medium text-[#131b2e] mb-1.5"
                      >
                        Service needed
                      </label>
                      <select
                        id="form-service"
                        name="service"
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                        className="w-full h-[44px] px-3.5 rounded-[8px] bg-white border border-[#e2e8f0] text-sm text-[#131b2e] transition-all focus:outline-none focus:border-[#4338ca] focus:ring-2 focus:ring-[#4338ca]/20 cursor-pointer"
                      >
                        <option value="Business Website">Business Website</option>
                        <option value="Landing Page">Landing Page</option>
                        <option value="AI-Enhanced Website">AI-Enhanced Website</option>
                        <option value="Website Redesign">Website Redesign</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="form-budget"
                        className="block text-xs font-medium text-[#131b2e] mb-1.5"
                      >
                        Estimated budget
                      </label>
                      <select
                        id="form-budget"
                        name="budget"
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        className="w-full h-[44px] px-3.5 rounded-[8px] bg-white border border-[#e2e8f0] text-sm text-[#131b2e] transition-all focus:outline-none focus:border-[#4338ca] focus:ring-2 focus:ring-[#4338ca]/20 cursor-pointer"
                      >
                        <option value="Under $300">Under $300</option>
                        <option value="$300-$600">$300-$600</option>
                        <option value="$600-$1,200">$600-$1,200</option>
                        <option value="$1,200+">$1,200+</option>
                        <option value="Not sure yet">Not sure yet</option>
                      </select>
                    </div>
                  </div>

                  {/* Message / Project Details Textarea */}
                  <div>
                    <label
                      htmlFor="form-message"
                      className="block text-xs font-medium text-[#131b2e] mb-1.5"
                    >
                      Business requirements / project details *{' '}
                      <span className="text-[#64748b] font-normal">(min 20 characters)</span>
                    </label>
                    <textarea
                      id="form-message"
                      name="message"
                      required
                      rows={4}
                      placeholder="Briefly describe what your business does, your primary goals, or any timeline requirements..."
                      value={message}
                      onChange={(e) => {
                        setMessage(e.target.value);
                        if (errors.message && e.target.value.trim().length >= 20) {
                          setErrors((prev) => ({ ...prev, message: undefined }));
                        }
                      }}
                      aria-invalid={Boolean(errors.message)}
                      aria-describedby={errors.message ? 'error-message' : undefined}
                      className={`w-full p-3.5 rounded-[8px] bg-white border text-sm text-[#131b2e] placeholder-[#64748b] transition-all focus:outline-none focus:ring-2 resize-y ${
                        errors.message
                          ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-200'
                          : 'border-[#e2e8f0] focus:border-[#4338ca] focus:ring-[#4338ca]/20'
                      }`}
                    ></textarea>
                    {errors.message && (
                      <p id="error-message" className="text-rose-600 text-xs mt-1" aria-live="polite">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-[44px] rounded-[10px] bg-[#4338ca] hover:bg-[#4f46e5] disabled:bg-[#4338ca]/70 disabled:cursor-not-allowed text-white text-sm font-semibold tracking-wide flex items-center justify-center gap-2 transition-all shadow-[0_10px_20px_-8px_rgba(67,56,202,0.35)]"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Project Enquiry</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 13. FINAL CTA BANNER */}
      <section className="w-full py-20 lg:py-24 bg-[#faf8ff]" id="cta">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="p-10 lg:p-14 rounded-[20px] bg-white border border-[#e2e8f0] shadow-[0_15px_40px_-10px_rgba(67,56,202,0.06)] flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
            <div className="max-w-xl">
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#131b2e] mb-2">
                Ready to get a website that works for your business?
              </h2>
              <p className="text-sm text-[#464554] leading-relaxed">
                Let&apos;s build a fast, conversion-focused website that makes your business look as good as it is. Free homepage concept within 24 hours.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
              <a
                href="https://calendly.com/bhawnawebstudio/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center h-[44px] px-6 rounded-[10px] bg-[#4338ca] hover:bg-[#4f46e5] text-white text-sm font-semibold tracking-wide transition-all shadow-[0_10px_20px_-8px_rgba(67,56,202,0.35)]"
              >
                Book a Free Call
              </a>
              <a
                href="https://wa.me/919205272400"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center h-[44px] px-6 rounded-[10px] bg-white border border-[#e2e8f0] hover:bg-[#f2f3ff] text-[#131b2e] text-sm font-semibold transition-all shadow-xs"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 14. FOOTER */}
      <footer className="w-full bg-white border-t border-[#e2e8f0] pt-14 pb-10">
        <div className="max-w-[1280px] mx-auto px-6 flex flex-col gap-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {/* Wordmark and description */}
            <div className="md:col-span-5 flex flex-col items-start gap-3">
              <a href="#hero" className="font-heading text-xl font-bold text-[#131b2e]">
                Bhawna Punia
              </a>
              <p className="text-xs text-[#64748b] leading-relaxed max-w-sm">
                AI Web Developer &amp; Studio. Building modern, conversion-focused websites for small and independent businesses in the US, UK and Canada.
              </p>
            </div>

            {/* Link Columns */}
            <div className="md:col-span-4 grid grid-cols-2 gap-4 text-xs font-medium text-[#464554]">
              <div className="flex flex-col gap-2.5">
                <span className="font-semibold uppercase tracking-wider text-[#131b2e]">Navigation</span>
                <a href="#services" className="hover:text-[#4338ca] transition-colors">Services</a>
                <a href="#work" className="hover:text-[#4338ca] transition-colors">Selected Work</a>
                <a href="#pricing" className="hover:text-[#4338ca] transition-colors">Pricing</a>
                <a href="#process" className="hover:text-[#4338ca] transition-colors">Process</a>
              </div>
              <div className="flex flex-col gap-2.5">
                <span className="font-semibold uppercase tracking-wider text-[#131b2e]">Studio</span>
                <a href="#about" className="hover:text-[#4338ca] transition-colors">About</a>
                <a href="#faq" className="hover:text-[#4338ca] transition-colors">FAQ</a>
                <a href="#contact" className="hover:text-[#4338ca] transition-colors">Contact</a>
                <a href="https://calendly.com/bhawnawebstudio/30min" target="_blank" rel="noopener noreferrer" className="hover:text-[#4338ca] transition-colors">
                  Calendly
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="md:col-span-3 flex flex-col gap-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#131b2e]">Connect</span>

              {/* Social Icons: LinkedIn, GitHub, Email */}
              <div className="flex items-center gap-2">
                <a
                  href="https://www.linkedin.com/in/bhawna-punia-9559b8416/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  title="LinkedIn"
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-[#64748b] hover:text-[#4338ca] hover:bg-[#f2f3ff] transition-all duration-200"
                >
                  <Linkedin className="w-4 h-4" />
                </a>

                <a
                  href="https://github.com/bhawnapunia304-coder"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  title="GitHub"
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-[#64748b] hover:text-[#4338ca] hover:bg-[#f2f3ff] transition-all duration-200"
                >
                  <svg
                    className="w-4 h-4 fill-current"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    />
                  </svg>
                </a>

                <a
                  href="mailto:bhawnawebstudio@gmail.com"
                  aria-label="Email"
                  title="Email"
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-[#64748b] hover:text-[#4338ca] hover:bg-[#f2f3ff] transition-all duration-200"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>

              <div className="flex flex-col gap-1.5 text-xs text-[#64748b] mt-1">
                <a
                  href="mailto:bhawnawebstudio@gmail.com"
                  className="hover:text-[#4338ca] transition-colors"
                >
                  bhawnawebstudio@gmail.com
                </a>
                <a
                  href="https://wa.me/919205272400"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#4338ca] transition-colors flex items-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>+91 92052 72400 (WhatsApp)</span>
                </a>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-[#e2e8f0] text-xs text-[#64748b]">
            <div>© 2026 Bhawna Punia. All rights reserved.</div>
            <div className="flex items-center gap-6">
              <button
                onClick={() => setModalType('privacy')}
                className="hover:text-[#131b2e] transition-colors"
              >
                Privacy Policy
              </button>
              <button
                onClick={() => setModalType('terms')}
                className="hover:text-[#131b2e] transition-colors"
              >
                Terms of Service
              </button>
              <a href="#hero" className="hover:text-[#131b2e] transition-colors flex items-center gap-1">
                <span>Back to top</span>
                <ArrowUp className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </footer>

      <PrivacyTermsModal type={modalType} onClose={() => setModalType(null)} />
    </>
  );
};

