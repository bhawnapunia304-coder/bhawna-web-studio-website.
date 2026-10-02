import React, { useState } from 'react';
import { Terminal, Play, Check, Zap, ArrowRight, Copy } from 'lucide-react';

export const NovaAiPreview: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const [promptInput, setPromptInput] = useState('Analyze user sentiment for modern SaaS onboarding');
  const [isRunning, setIsRunning] = useState(false);
  const [outputResult, setOutputResult] = useState(
    '{"sentiment": "positive", "confidence": 0.96, "key_themes": ["intuitive_onboarding", "sub_second_latency", "clear_pricing"]}'
  );
  const [copiedCode, setCopiedCode] = useState(false);

  const handleRunInference = () => {
    setIsRunning(true);
    setOutputResult('Streaming response from edge cluster...');
    setTimeout(() => {
      setOutputResult(
        `{\n  "status": "completed",\n  "model": "nova-clarity-v2",\n  "tokens": 128,\n  "latency_ms": 32,\n  "result": "Structured analysis verified. High confidence intent mapped across 3 dimensions."\n}`
      );
      setIsRunning(false);
    }, 600);
  };

  const plans = [
    {
      name: 'Developer',
      monthlyPrice: '$29',
      annualPrice: '$24',
      tokens: '500,000 tokens / mo',
      desc: 'Ideal for independent developers and early prototype validation.',
      features: ['5 requests / sec', 'Edge routing in 24 regions', 'Standard community support'],
    },
    {
      name: 'Scale Pro',
      monthlyPrice: '$99',
      annualPrice: '$79',
      tokens: '3,000,000 tokens / mo',
      desc: 'For high-throughput production apps and multi-tenant systems.',
      features: ['50 requests / sec', 'Zero-cold-start inference', 'Dedicated SLA guarantee', 'Custom fine-tune checkpoints'],
      highlighted: true,
    },
    {
      name: 'Enterprise Cloud',
      monthlyPrice: '$349',
      annualPrice: '$289',
      tokens: 'Unlimited tokens',
      desc: 'Dedicated private VPC deployment with custom compliance controls.',
      features: ['Dedicated isolated GPU nodes', 'SOC-2 Type II audit logs', '24/7 incident engineer on call'],
    },
  ];

  return (
    <div className="w-full bg-[#0b0f19] text-[#e2e8f0] font-sans antialiased text-xs sm:text-sm">
      {/* Mini SaaS Header */}
      <header className="px-6 py-4 border-b border-stone-800 bg-[#0b0f19]/90 sticky top-0 z-10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-[#0ea5e9] flex items-center justify-center text-[#0b0f19] font-bold text-xs">
            N
          </div>
          <span className="font-heading font-bold text-base text-white tracking-tight">NOVA AI</span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-stone-800 text-stone-400 border border-stone-750">
            v2.4-edge
          </span>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="#pricing"
            className="px-3 py-1.5 rounded-lg bg-[#0ea5e9] hover:bg-[#38bdf8] text-[#0b0f19] font-semibold text-xs transition-colors"
          >
            Start Free Trial
          </a>
        </div>
      </header>

      {/* Hero Strip */}
      <div className="py-10 px-6 text-center border-b border-stone-800">
        <span className="text-[10px] font-mono uppercase tracking-widest text-[#0ea5e9] block mb-2 font-semibold">
          Edge Inference Engine · Sub-40ms Global Latency
        </span>
        <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-2 max-w-xl mx-auto">
          Ultra-low latency AI inference without GPU management.
        </h2>
        <p className="text-xs text-stone-400 max-w-md mx-auto mb-6">
          Deploy structured extraction, classification, and embeddings directly onto our global edge runtime.
        </p>

        {/* Live Interactive Prompt Sandbox */}
        <div className="max-w-2xl mx-auto p-4 rounded-2xl bg-stone-900 border border-stone-800 text-left shadow-xl">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-stone-800">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-[#0ea5e9]" />
              <span className="font-mono text-xs font-semibold text-white">Live Inference Sandbox</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span className="font-mono text-[10px] text-stone-400">Model: clarity-v2</span>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block font-mono text-[11px] text-stone-400 mb-1">Input Prompt Template</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={promptInput}
                  onChange={(e) => setPromptInput(e.target.value)}
                  className="flex-1 h-9 px-3 rounded-lg bg-stone-950 border border-stone-800 font-mono text-xs text-stone-200 focus:outline-none focus:border-[#0ea5e9]"
                />
                <button
                  onClick={handleRunInference}
                  disabled={isRunning}
                  className="px-4 py-2 rounded-lg bg-[#0ea5e9] hover:bg-[#38bdf8] text-[#0b0f19] font-mono text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  <Play className={`w-3.5 h-3.5 ${isRunning ? 'animate-spin' : ''}`} />
                  <span>{isRunning ? 'Running...' : 'Run'}</span>
                </button>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-[11px] font-mono text-stone-400 mb-1">
                <span>Output Stream</span>
                <span>Latency: 32ms · 128 tokens</span>
              </div>
              <pre className="p-3 rounded-lg bg-stone-950 border border-stone-800 font-mono text-[11px] text-emerald-400 overflow-x-auto whitespace-pre-wrap">
                {outputResult}
              </pre>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Section with Monthly/Annual Toggle */}
      <section className="p-6 sm:p-8 max-w-4xl mx-auto" id="pricing">
        <div className="text-center mb-8">
          <h3 className="font-heading text-xl font-bold text-white mb-2">Predictable Edge Pricing</h3>
          <p className="text-xs text-stone-400 mb-4">Pay only for verified inference tokens with zero idle cluster cost.</p>

          {/* Toggle */}
          <div className="inline-flex items-center gap-2 p-1 rounded-full bg-stone-900 border border-stone-800 text-xs">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-3 py-1 rounded-full font-medium transition-all ${
                billingCycle === 'monthly' ? 'bg-[#0ea5e9] text-[#0b0f19]' : 'text-stone-400'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-3 py-1 rounded-full font-medium transition-all ${
                billingCycle === 'annual' ? 'bg-[#0ea5e9] text-[#0b0f19]' : 'text-stone-400'
              }`}
            >
              Annual (Save 20%)
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {plans.map((p, idx) => (
            <div
              key={idx}
              className={`p-5 rounded-2xl bg-stone-900 border flex flex-col justify-between ${
                p.highlighted ? 'border-[#0ea5e9] shadow-lg shadow-[#0ea5e9]/10' : 'border-stone-800'
              }`}
            >
              <div>
                <h4 className="font-heading font-semibold text-sm text-white mb-1">{p.name}</h4>
                <div className="font-heading font-bold text-2xl text-white mb-1">
                  {billingCycle === 'monthly' ? p.monthlyPrice : p.annualPrice}
                  <span className="text-xs font-normal text-stone-400"> / mo</span>
                </div>
                <div className="text-xs font-mono text-[#0ea5e9] mb-3">{p.tokens}</div>
                <p className="text-xs text-stone-400 mb-4">{p.desc}</p>
                <ul className="space-y-2 text-xs text-stone-300 border-t border-stone-800 pt-3 mb-6">
                  {p.features.map((f, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#0ea5e9] shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <button
                className={`w-full py-2 rounded-xl text-xs font-semibold transition-all ${
                  p.highlighted
                    ? 'bg-[#0ea5e9] hover:bg-[#38bdf8] text-[#0b0f19]'
                    : 'bg-stone-800 hover:bg-stone-700 text-white'
                }`}
              >
                Choose {p.name}
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
